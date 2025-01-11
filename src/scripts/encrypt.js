// encrypt.js

function encryptData(data) {
    // 1. 置換暗号の暗号化
    function substituteEncrypt(text, shift = 3) {
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            return String.fromCharCode((code + shift) % 256);
        }).join('');
    }

    // // 2. XOR 暗号の暗号化
    // function xorEncrypt(text, key) {
    //     return text.split('').map((char, index) =>
    //         String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length))
    //     ).join('');
    // }

    // // 3. Split and Join 操作
    // function splitAndJoin(text, chunkSize = 5) {
    //     const chunks = [];
    //     for (let i = 0; i < text.length; i += chunkSize) {
    //         chunks.push(text.slice(i, i + chunkSize));
    //     }
    //     return chunks.reverse().join('');
    // }

/////DEBUG用複合化関数（questionData.jsのdecrypt function内の関数と同じ）///////////
/////////////////////////////////////////////////////////////////////////////////////////////////
    // // 1. Split and Join の逆操作
    // function unsplitAndJoin(text, chunkSize = 5) {
    //     const totalChunks = Math.ceil(text.length / chunkSize);
    //     const chunks = [];
    //     for (let i = 0; i < totalChunks; i++) {
    //         chunks.unshift(text.slice(i * chunkSize, (i + 1) * chunkSize));
    //     }
    //     return chunks.join('');
    // }
    // // 2. XOR 暗号の復号化
    // function xorDecrypt(text, key) {
    //     return text.split('').map((char, index) =>
    //         String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length))
    //     ).join('');
    // }
    // 3. 置換暗号の復号化
    function substituteDecrypt(text, shift = 3) {
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            return String.fromCharCode((code - shift + 256) % 256);
        }).join('');
    }
/////////////////////////////////////////////////////////////////////////////////////////////////

    // JSON オブジェクトを文字列に変換
    const jsonString = JSON.stringify(data);
    // console.log(jsonString);

    // UTF-8エンコードをBase64に変換
    const base64 = btoa(unescape(jsonString));
    // console.log(base64);

    // 以下の暗号化ステップはそのまま
    const substituted = substituteEncrypt(base64);
    // console.log(substituted);
    // const xored = xorEncrypt(base64, 'secretkey');
    // console.log(xored);
    // const splitAndJoined = splitAndJoin(base64); //splitAndJoin(xored);
    // console.log(splitAndJoined);

////DEBUG用複合化部分///////
/////////////////////////////////////////////////////////////////////////////////////////////////
    // 暗号化の逆順で復号化を実行
    // const unsplitted = unsplitAndJoin(splitAndJoined);
    // console.log("unsplitted: ", unsplitted);
    // const xorDecrypted = xorDecrypt(xored, 'secretKey'); //xorDecrypt(unsplitted, 'secretkey');
    // console.log("xorDecrypted: ", xorDecrypted);
    // // const substitutedDecrypted = substituteDecrypt(splitAndJoined); //substituteDecrypt(xorDecrypted);
    // // console.log("substitutedDecrypted: ", substitutedDecrypted);

    // // JSON 文字列をオブジェクトに変換
    // try {
    //     // Base64デコードを行い、UTF-8文字列に戻す
    //     const decodedString = escape(atob(xorDecrypted)); //decodeURIComponent(escape(atob(substitutedDecrypted)));
    //     console.log("decodedString:", decodedString);
    // } catch (error) {
    //     console.error("Decryption error:", error);
    //     console.log("Decrypted string:", xorDecrypted);
    //     throw error;
    // }
//////////////////////////////////////////////////////////////////////////////////////////////////

    return substituted;
}


module.exports = { encryptData };