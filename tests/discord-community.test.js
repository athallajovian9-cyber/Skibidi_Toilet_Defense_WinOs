const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { test } = require("node:test");
const { join } = require("node:path");

const html = readFileSync(join(__dirname, "..", "index.html"), "utf8");

test("Discord links, live count, and widget target the same community", () => {
  const inviteCodes = [
    ...html.matchAll(/https:\/\/discord\.gg\/([A-Za-z0-9]+)/g),
  ].map((match) => match[1]);
  const apiInviteCode = html.match(
    /discord\.com\/api\/v10\/invites\/([A-Za-z0-9]+)\?with_counts=true/,
  )?.[1];
  const widgetGuildId = html.match(
    /discord\.com\/widget\?id=(\d+)&theme=dark/,
  )?.[1];
  const displayedGuildId = html.match(/SERVER ID:\s*(\d+)/)?.[1];

  assert.ok(inviteCodes.length > 0, "homepage should link to its Discord invite");
  assert.deepEqual(new Set(inviteCodes), new Set(["QtyBucygQ6"]));
  assert.equal(apiInviteCode, "QtyBucygQ6");
  assert.equal(widgetGuildId, "1555065999819280424");
  assert.equal(displayedGuildId, widgetGuildId);
});
