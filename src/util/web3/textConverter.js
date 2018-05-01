const toBytes32 = text =>
  (text !== null ? web3.fromAscii(text).replace(/\u0000/g, '').replace(/\0/g, '') : null);

const toText = hex => web3.toAscii(hex);

export { toBytes32, toText };
