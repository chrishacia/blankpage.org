const { test } = require("node:test");
const assert = require("node:assert/strict");
const { makeChannelsHandler } = require("./channels");

function mockRes() {
  return {
    statusCode: 200,
    body: undefined,
    status(code) {
      this.statusCode = code;
      return this;
    },
    send(body) {
      this.body = body;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
  };
}

function setup(getKey) {
  const rooms = { abc: [{}, {}], def: [{}] };
  const roomNames = { abc: "Room A", def: "Room B" };
  return makeChannelsHandler({ rooms, roomNames, getKey });
}

test("unset key -> 404", () => {
  const handler = setup(() => process.env.CHANNELS_KEY);
  delete process.env.CHANNELS_KEY;
  const res = mockRes();
  handler({ query: { key: "test-key" } }, res);
  assert.equal(res.statusCode, 404);
});

test("empty key -> 404", () => {
  const handler = setup(() => "");
  const res = mockRes();
  handler({ query: { key: "test-key" } }, res);
  assert.equal(res.statusCode, 404);
});

test("wrong key -> 403", () => {
  const handler = setup(() => "test-key");
  const res = mockRes();
  handler({ query: { key: "wrong-key" } }, res);
  assert.equal(res.statusCode, 403);
  assert.equal(res.body, "Access denied");
});

test("missing key -> 403", () => {
  const handler = setup(() => "test-key");
  const res = mockRes();
  handler({ query: {} }, res);
  assert.equal(res.statusCode, 403);
  assert.equal(res.body, "Access denied");
});

test("right key -> 200 JSON array", () => {
  const handler = setup(() => "test-key");
  const res = mockRes();
  handler({ query: { key: "test-key" } }, res);
  assert.equal(res.statusCode, 200);
  assert.deepEqual(res.body, [
    {
      roomId: "abc",
      roomName: "Room A",
      numMembers: 2,
      url: "https://blankpage.org/box/abc",
    },
    {
      roomId: "def",
      roomName: "Room B",
      numMembers: 1,
      url: "https://blankpage.org/box/def",
    },
  ]);
});
