# Handoff — bp-channels-r1

- Goal/issue: Issue #4 — commit prod `/channels` route with env-read key (`CHANNELS_KEY`, fail-closed 404 unset, 403 wrong/missing via timingSafeEqual), README + `.env.example`, minimal node:test.
- Done: `server/channels.js` (`makeChannelsHandler({rooms, roomNames, getKey})`), wired in `server/server.js` after `/privacy.html`, README section, `.env.example` (empty), `.env` gitignored, `server/channels.test.js`, `test` script. Verified below.
- Left: commit only (wrapper pushes/opens draft PR).
- Next step: commit, then let wrapper push/open draft PR.
- Resume: branch `feat/4-channels-route`, worktree `/workspace/muse-work/bp-channels`, brief `/workspace/fleet/coder-hooks/briefs/bp-channels-r1.md`, run `/workspace/muse-runs/bp-channels-r1`.
