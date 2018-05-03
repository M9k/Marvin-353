const toBytes32 = text => (text !== null ? web3.fromAscii(text) : null);

const toText = hex =>
  (hex !== null ? web3.toAscii(hex).replace(/\u0000/g, '').replace(/\0/g, '') : null);

export { toBytes32, toText };
