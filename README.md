<div align="center">
  <img src="skill/assets/response-shaper-icon.png" alt="Response Shaper mark" width="112" />

  <h1>Response Shaper</h1>

  <p><strong>One request. Many ways to answer.</strong></p>

  <p>Installable Codex skill package for turning dense answers into the clearest presentation mode.</p>

  <p><strong>Multilingual-ready.</strong> Mirrors the user's language by default, including Korean, English, and mixed-language prompts.</p>

  <p><strong>Smart by default.</strong> It can choose visual, table, or HTML output on its own when that is the clearest shape.</p>

  <p>
    <a href="#how-it-chooses">How it chooses</a> ·
    <a href="#example-prompts">Example prompts</a> ·
    <a href="#install">Install</a> ·
    <a href="#package-contents">Package contents</a>
  </p>
</div>

<hr />

<p align="center">
  <img src="skill/assets/response-shaper-hero.png" alt="Response Shaper overview" />
</p>

## How it chooses

When a reply is too dense for plain Markdown, the skill picks the shape that makes it easiest to use. It does not just paraphrase text.

| User intent | Mode | Typical output |
| --- | --- | --- |
| "Explain this" | `explain` | concise explanation with key points |
| "Show me the structure" | `visualize` | flow, diagram, or hierarchy |
| "What did you do?" | `summarize_actions` | transformation summary |
| "Which is better?" | `compare` | trade-off view |
| "What should I do next?" | `checklist` | actionable checklist |
| "How did this happen?" | `timeline` | ordered sequence |
| "Make it a page" | `html` | readable HTML brief |
| "Make it visual" | `image` | single infographic or visual summary |

When nothing is explicit, it falls back to a concise structured brief:

1. Takeaway
2. Why it matters
3. Key points
4. Next step
5. Risks or open questions

## Example prompts

Use the skill when the raw answer would be hard to scan in plain Markdown:

```text
Use $response-shaper to turn this dense update into a clean visual brief.
Use $response-shaper to explain this concept as a checklist.
Use $response-shaper to summarize what changed and what happens next.
```

## Install

### From git

```bash
git clone https://github.com/Jun0zo/response-shaper-skill.git
cd response-shaper-skill
npm install
npm run install:skill
```

### From a git URL with npm

```bash
npm install git+https://github.com/Jun0zo/response-shaper-skill.git
npx response-shaper-install
```

### From npm

```bash
npm install response-shaper-skill
npx response-shaper-install
```

## Publish to npm

You need an authenticated npm session before publishing.

```bash
npm login
npm publish --access public
```

The package is already published as `response-shaper-skill@0.1.1`, so `npm install response-shaper-skill` should work now.

## Where it installs

By default, the installer copies the skill into:

`$CODEX_HOME/skills/response-shaper`

If `CODEX_HOME` is unset, it falls back to `~/.codex/skills/response-shaper`.

## Package contents

- `README.md`
- `package.json`
- `scripts/install-skill.js`
- `skill/SKILL.md`
- `skill/agents/openai.yaml`
- `skill/references/classification.md`
- `skill/assets/response-shaper-icon.png`
- `skill/assets/response-shaper-hero.png`
