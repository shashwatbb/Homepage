import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..", "design-system");

describe("New Bricks design system files", () => {
  it("meta.json points at the correct Figma file and channel", () => {
    const meta = JSON.parse(readFileSync(join(ROOT, "new-bricks.meta.json"), "utf8"));
    expect(meta.figmaFileKey).toBe("ZGl9LhEtqlE9JiMKBuYrdT");
    expect(meta.talkToFigmaChannel).toBe("omsn9jta");
    expect(meta.figmaEntryNodeId).toBe("123:3");
    expect(meta.figmaFileUrl).toContain("figma.com/design/");
  });

  it("tokens.json is valid and matches meta file key", () => {
    const meta = JSON.parse(readFileSync(join(ROOT, "new-bricks.meta.json"), "utf8"));
    const tokens = JSON.parse(readFileSync(join(ROOT, "new-bricks.tokens.json"), "utf8"));
    expect(tokens.meta.figmaFileKey).toBe(meta.figmaFileKey);
    expect(tokens.meta.talkToFigmaChannel).toBe(meta.talkToFigmaChannel);
    expect(tokens.styles).toBeDefined();
    expect(tokens.tokens).toBeDefined();
    expect(tokens.styles.text?.length).toBeGreaterThan(0);
    expect(tokens.figma?.getStyles?.texts?.length).toBe(tokens.styles.text.length);
  });
});
