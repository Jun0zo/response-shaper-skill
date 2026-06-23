#!/usr/bin/env node

import fs from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';

function parseArgs(argv) {
  const args = { cases: 'benchmarks/cases.json', results: null };
  for (let i = 2; i < argv.length; i += 1) {
    const token = argv[i];
    if (token === '--cases') {
      args.cases = argv[++i];
    } else if (token === '--results') {
      args.results = argv[++i];
    } else if (token === '--help' || token === '-h') {
      args.help = true;
    } else {
      throw new Error(`Unknown argument: ${token}`);
    }
  }
  return args;
}

function wordCount(text) {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function hangulRatio(text) {
  const letters = (text.match(/[A-Za-z가-힣]/g) || []).length;
  if (letters === 0) return 0;
  const hangul = (text.match(/[가-힣]/g) || []).length;
  return hangul / letters;
}

function latinRatio(text) {
  const letters = (text.match(/[A-Za-z가-힣]/g) || []).length;
  if (letters === 0) return 0;
  const latin = (text.match(/[A-Za-z]/g) || []).length;
  return latin / letters;
}

function includesAny(text, needles = []) {
  const lower = text.toLowerCase();
  return needles.some((needle) => lower.includes(needle.toLowerCase()));
}

function includesAll(text, needles = []) {
  const lower = text.toLowerCase();
  return needles.every((needle) => lower.includes(needle.toLowerCase()));
}

function scoreCase(testCase, output) {
  const normalized = output ?? '';
  const signals = [];
  const failures = [];

  if (testCase.must_include_all && !includesAll(normalized, testCase.must_include_all)) {
    failures.push(`missing one or more required markers: ${testCase.must_include_all.join(', ')}`);
  } else if (testCase.must_include_all) {
    signals.push('required markers present');
  }

  if (testCase.must_include_any && !includesAny(normalized, testCase.must_include_any)) {
    failures.push(`missing any of: ${testCase.must_include_any.join(', ')}`);
  } else if (testCase.must_include_any) {
    signals.push('at least one mode marker present');
  }

  if (testCase.must_not_include_any && includesAny(normalized, testCase.must_not_include_any)) {
    failures.push(`contains a forbidden marker: ${testCase.must_not_include_any.join(', ')}`);
  } else if (testCase.must_not_include_any) {
    signals.push('forbidden markers avoided');
  }

  if (typeof testCase.max_words === 'number') {
    const count = wordCount(normalized);
    if (count > testCase.max_words) {
      failures.push(`too long: ${count} words > ${testCase.max_words}`);
    } else {
      signals.push(`length ok (${count} words)`);
    }
  }

  if (testCase.locale === 'ko') {
    const ratio = hangulRatio(normalized);
    if (ratio < 0.18) {
      failures.push(`too little Korean text for a Korean case (Hangul ratio ${ratio.toFixed(2)})`);
    } else {
      signals.push(`Korean ratio ok (${ratio.toFixed(2)})`);
    }
  }

  if (testCase.locale === 'en') {
    const ratio = latinRatio(normalized);
    if (ratio < 0.55) {
      failures.push(`too little English text for an English case (Latin ratio ${ratio.toFixed(2)})`);
    } else {
      signals.push(`English ratio ok (${ratio.toFixed(2)})`);
    }
  }

  return {
    pass: failures.length === 0,
    signals,
    failures,
  };
}

async function main() {
  const args = parseArgs(process.argv);
  if (args.help) {
    console.log('Usage: node benchmarks/run-benchmark.mjs --results results.json [--cases benchmarks/cases.json]');
    process.exit(0);
  }

  if (!args.results) {
    throw new Error('Missing required --results file');
  }

  const casesPath = path.resolve(args.cases);
  const resultsPath = path.resolve(args.results);
  const cases = JSON.parse(await fs.readFile(casesPath, 'utf8'));
  const results = JSON.parse(await fs.readFile(resultsPath, 'utf8'));

  const resultsById = new Map(results.map((result) => [result.id, result.output ?? '']));
  const rows = [];

  for (const testCase of cases) {
    const output = resultsById.get(testCase.id);
    if (typeof output !== 'string') {
      rows.push({
        id: testCase.id,
        mode: testCase.mode,
        pass: false,
        notes: 'missing output',
      });
      continue;
    }

    const scored = scoreCase(testCase, output);
    rows.push({
      id: testCase.id,
      mode: testCase.mode,
      pass: scored.pass,
      notes: [...scored.signals, ...scored.failures].join('; '),
    });
  }

  const passed = rows.filter((row) => row.pass).length;
  const total = rows.length;

  console.log(`Clarify First benchmark: ${passed}/${total} passed`);
  for (const row of rows) {
    const status = row.pass ? 'PASS' : 'FAIL';
    console.log(`${status}  ${row.id}  [${row.mode}]  ${row.notes}`);
  }

  process.exit(passed === total ? 0 : 1);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
