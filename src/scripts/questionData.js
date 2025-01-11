//questionData.js

export async function loadQuestionData() {
    // console.log('questionData.js: loadQuestionData called');
    const possiblePaths = [
        './questions/encryptedQuestions_claude_ver3.json',
        '/questions/encryptedQuestions_claude_ver3.json',
        '/jspsych_vue_test/questions/encryptedQuestions_claude_ver3.json'
    ];

    for (const path of possiblePaths) {
        try {
            // console.log(`questionData.js: Attempting to fetch from ${path}`);
            const response = await fetch(path);
            // console.log('questionData.js: Fetch response:', response);
            if (response.ok) {
                const encryptedData = await response.json();
                // console.log('questionData.js: Encrypted data loaded:', encryptedData);
                return decryptData(encryptedData);
            }
        } catch (error) {
            console.error(`questionData.js: Failed to load from ${path}:`, error);
        }
    }

    throw new Error("Failed to load question data from all possible paths");
}

function decryptData(encryptedData) {
    // デバッグ: encryptedDataの型と内容をログに出力
    // console.log("questionData.js: decryptData called");
    // console.log("questionData.js: encryptedDataの型:", typeof encryptedData);
    // console.log("questionData.js: encryptedDataの内容:", encryptedData);

    // 1. Split and Join の逆操作
    function unsplitAndJoin(text, chunkSize = 5) {
        const totalChunks = Math.ceil(text.length / chunkSize);
        const chunks = [];
        for (let i = 0; i < totalChunks; i++) {
            chunks.unshift(text.slice(i * chunkSize, (i + 1) * chunkSize));
        }
        return chunks.join('');
    }


    // 2. XOR 暗号の復号化
    function xorDecrypt(text, key) {
        return text.split('').map((char, index) =>
            String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(index % key.length))
        ).join('');
    }

    // 3. 置換暗号の復号化
    function substituteDecrypt(text, shift = 3) {
        return text.split('').map(char => {
            const code = char.charCodeAt(0);
            return String.fromCharCode((code - shift + 256) % 256);
        }).join('');
    }

    // 暗号化の逆順で復号化を実行
    // const unsplitted = unsplitAndJoin(encryptedData);
    // console.log("unsplitted: ", unsplitted);
    // const xorDecrypted = xorDecrypt(unsplitted, 'secretkey');
    // console.log("xorDecrypted: ", xorDecrypted);
    const substitutedDecrypted = substituteDecrypt(encryptedData);
    // console.log("substitutedDecrypted: ", substitutedDecrypted);

    // JSON 文字列をオブジェクトに変換
    try {
        // Base64デコードを行い、UTF-8文字列に戻す
        const decodedString = decodeURIComponent(escape(atob(substitutedDecrypted)));
        // console.log("questionData.js: decodedString:", decodedString);
        const parsedData = JSON.parse(decodedString);
        // console.log("questionData.js: Parsed data:", parsedData);
        return JSON.parse(decodedString);
    } catch (error) {
        console.error("Decryption error:", error);
        // console.log("Decrypted string:", unsplitted);
        throw error;
    }
}