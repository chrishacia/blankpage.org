# Handoff — bp-channels-r1

- Goal/issue: Issue #4 — commit prod `/channels` route with env-read key (`CHANNELS_KEY`), inserted after `/privacy.html`; fail closed 404 when unset/empty, 403 on wrong/missing key via `crypto.timingSafeEqual`.
- Done: extracted `server/channels.js` (`makeChannelsHandler({ rooms, roomNames, getKey })`, no pointless `await` on map); wired in `server/server.js` after `/privacy.html` with `getKey: () => process.env.CHANNELS_KEY`; added `server/channels.test.js` (node:test: unset→404, empty→404, wrong→403, missing→403, right dummy `test-key`→200 JSON array); documented `CHANNELS_KEY` in README; added `.env.example` with empty `CHANNELS_KEY=`; `.env` added to `.gitignore`; added `"test": "node --test"` to package.json. Verified: `npm ci` OK, `npm test` 5/5 pass, `node --check server/server.js` OK, grep shows no key literal besides test dummy `test-key`.
- Left: nothing in scope; wrapper pushes/opens draft PR (do not merge).
- Next step: wrapper push/open draft PR.
- Resume: branch `feat/4-channels-route`, worktree `/workspace/muse-work/bp-channels`, brief `/workspace/fleet/coder-hooks/briefs/bp-channels-r1.md`, run `/workspace/muse-runs/bp-channels-r1b`.
