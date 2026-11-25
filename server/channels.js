const crypto = require("crypto");

function makeChannelsHandler({ rooms, roomNames, getKey }) {
  return (req, res) => {
    const expected = getKey();
    if (!expected) {
      res.status(404).send("Not found");
      return;
    }
    const key = req.query && req.query.key;
    if (typeof key !== "string") {
      res.status(403).send("Access denied");
      return;
    }
    const keyBuffer = Buffer.from(key);
    const expectedBuffer = Buffer.from(expected);
    if (
      keyBuffer.length !== expectedBuffer.length ||
      !crypto.timingSafeEqual(keyBuffer, expectedBuffer)
    ) {
      res.status(403).send("Access denied");
      return;
    }
    const channels = Object.keys(rooms).map((roomId) => ({
      roomId,
      roomName: roomNames[roomId],
      numMembers: rooms[roomId].length,
      url: `https://blankpage.org/box/${roomId}`,
    }));
    res.json(channels);
  };
}

module.exports = { makeChannelsHandler };
