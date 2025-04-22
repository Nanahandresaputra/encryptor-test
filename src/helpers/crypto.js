// import CryptoJS from "crypto-js";

// export function encryptContent({ payload, clientKey, sharedKey }) {
//   let key = clientKey + "1001" + sharedKey;
//   key = CryptoJS.SHA512(key);

//   key = key.toString();
//   key = key.substring(32, 64);
//   let encrypted = CryptoJS.AES.encrypt(
//     JSON.stringify(payload),
//     CryptoJS.enc.Utf8.parse(key),
//     {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7,
//     }
//   );
//   return encrypted.toString();
// }

// export function decryptContent({ payload, clientKey, sharedKey }) {
//   let key = clientKey + "Y3BtLnN5c3RlbXM" + sharedKey;
//   key = CryptoJS.SHA512(key);

//   key = key.toString();
//   key = key.substring(32, 64);
//   let decrypted = CryptoJS.AES.decrypt(payload, CryptoJS.enc.Utf8.parse(key), {
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   });
//   return decrypted.toString(CryptoJS.enc.Utf8);
// }

import CryptoJS from "crypto-js";
export function encryptContent({ payload, clientKey, sharedKey, key }) {
  //   const { payload: r, clientKey: o, sharedKey: p } = t;
  let e = clientKey + key + sharedKey;
  return (
    (e = CryptoJS.SHA512(e)),
    (e = e.toString()),
    (e = e.substring(32, 64)),
    CryptoJS.AES.encrypt(JSON.stringify(payload), CryptoJS.enc.Utf8.parse(e), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString()
  );
}
export function decryptContent({ payload, clientKey, sharedKey, key }) {
  //   const { payload: r, clientKey: o, sharedKey: p } = t;
  let e = clientKey + key + sharedKey;
  return (
    (e = CryptoJS.SHA512(e)),
    (e = e.toString()),
    (e = e.substring(32, 64)),
    CryptoJS.AES.decrypt(payload, CryptoJS.enc.Utf8.parse(e), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8)
  );
}
