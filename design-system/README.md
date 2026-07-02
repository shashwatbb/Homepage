# New Bricks Design System (internal)

Figma: [New Bricks Design System](https://www.figma.com/design/ZGl9LhEtqlE9JiMKBuYrdT/New-Bricks-Design-System?node-id=123-3)

| File | Purpose |
|------|---------|
| `new-bricks.meta.json` | Stable IDs, URLs, file key, TalkToFigma channel (`omsn9jta`) |
| `new-bricks.tokens.json` | **Canonical dump** — includes `figma.getStyles` snapshot from MCP / REST |
| `new-bricks.generated.css` | `:root` bridge — text styles as `--nb-text-*` (from `get_styles` text) |
| `figma-pdp-topfold-reference.json` | PDP first-fold layout tokens from [Demand Component Kit](https://www.figma.com/design/xYC0W1LzOyf0ll2LF5iCZq/Demand%E2%80%A8Component-Kit?node-id=3677-12987) (`3677:12987`, channel `w8ufphpq`) |

## Sync from Figma (REST)

1. Create a [Personal access token](https://www.figma.com/developers/api#access-tokens) with read access to this file.
2. From repo root:

```bash
export FIGMA_ACCESS_TOKEN="your_token"
npm run design-system:sync
```

This merges variables into `new-bricks.tokens.json` and refreshes color-related CSS (MCP snapshots may overwrite typography; prefer one source per run).

## Sync via TalkToFigma (MCP)

Open **[New Bricks Design System](https://www.figma.com/design/ZGl9LhEtqlE9JiMKBuYrdT/New-Bricks-Design-System?node-id=123-3)** in **Figma desktop**, connect TalkToFigma to channel **`omsn9jta`**, then run `get_styles` / `get_document_info` and merge into `new-bricks.tokens.json`.

## Use in the site

Import the generated bridge from global styles if you want CSS variables driven by Figma:

```css
@import "../design-system/new-bricks.generated.css" layer(figma-tokens);
```

(Adjust path if you wire it into `src/styles/base.css`.)
