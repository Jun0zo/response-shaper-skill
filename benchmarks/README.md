# Clarify First Benchmarks

This folder contains a lightweight evaluation pack for the skill.

## What it measures

- Mode selection: `explain`, `visualize`, `summarize_actions`, `compare`, `checklist`, `timeline`, `html`, `image`
- Comprehension-first formatting
- Multilingual behavior
- Brevity when the answer should stay compact
- Structure quality when a visual, table, or HTML layout is the better shape

## What it is not

- Not a full model leaderboard
- Not a substitute for human review on subjective outputs
- Not a direct image-quality benchmark for generated artwork

## Similar evaluation frameworks

- [MT-Bench](https://arxiv.org/abs/2306.05685)
- [AlpacaEval](https://github.com/tatsu-lab/alpaca_eval)
- [HELM](https://crfm.stanford.edu/helm/)
- [OpenAI Evals](https://developers.openai.com/api/docs/guides/evals)
- [Promptfoo](https://www.promptfoo.dev/docs/intro/)

## How to use it

1. Pick a set of candidate outputs for the cases in `cases.json`.
2. Save them as a JSON array with `{ "id": "...", "output": "..." }`.
3. Run the scorer script to get a pass/fail summary.

The scorer is intentionally heuristic. It is meant as a smoke test and regression check, not a proof that the skill is perfect.
