---
name: clarify-first
description: Shape complex requests and answers into the clearest, easiest-to-understand format. Use when the user asks to explain, visualize, summarize what was done, compare options, turn dense text/Markdown/chat updates into a readable brief, or choose between HTML, image, checklist, timeline, table, or diagram outputs. Choose visual or HTML layouts proactively when they improve comprehension. Mirror the user's language by default.
---

# Clarify First

## Overview

Use this skill to turn a dense or ambiguous response into the format that helps the user understand it fastest. Prefer one primary presentation mode and keep the result easy to scan. The user does not need to say "make it visual" for the skill to pick a visual layout when that is clearer.

## Choose the mode

- `explain` when the user needs understanding, definitions, or cause/effect.
- `visualize` when relationships, flow, hierarchy, or state are easier to see than read.
- `summarize_actions` when the user asks what was done, changed, or decided.
- `compare` when the user wants trade-offs between options.
- `checklist` when the user needs next steps, tasks, or verification.
- `timeline` when order, phases, or chronology matter.
- `card` or `table` when the answer needs fast scanning and compact structure.
- `html` when the user asks for a shareable visual layout or mock page.
- `image` when the user wants a single generated visual or infographic.

## Decision Rules

1. Start with the user's explicit request. If they ask for a format, honor it.
2. If no format is named, infer the dominant intent from the content shape.
3. If a visual, table, card, or HTML layout would reduce cognitive load, choose it proactively even when the user did not ask for it explicitly.
4. Prefer one primary output mode; add a secondary mode only if it improves clarity.
5. When the input is messy or broad, default to a concise structured brief: takeaway, explanation, what changed or what to do, risks, open questions.
6. If the user asks what was done, include the transformation steps, not just the final output.
7. If the user wants a visual, translate the answer into a diagram or card hierarchy rather than long prose.

## Output Rules

- Front-load the answer.
- Use short labels, bullets, and sections.
- Keep labels concrete and avoid decorative filler.
- Optimize for comprehension, not length. Long prose is a fallback, not the default.
- Mirror the user's language by default. For mixed-language prompts, answer in the dominant language and keep technical terms when translation would reduce clarity.
- Prefer a visual, table, or HTML layout when the answer has many parts, branching logic, before/after structure, or is easier to grasp spatially than linearly.
- When describing work, cover input, transformation, output, and next step.
- If the answer is better in HTML or image form, switch to that medium instead of forcing Markdown.

## Reference

Read [classification.md](references/classification.md) for detailed mode selection rules and examples.
