// encryptQuestions.js

const fs = require('fs');
const path = require('path');
const { encryptData } = require('./encrypt.js');

// questions.jsonを読み込む
const questionDataRaw = fs.readFileSync(path.join(path.resolve(__dirname, '../assets/'), 'questions', 'questions_claude_ver3.json'), 'utf8');
const questionData = JSON.parse(questionDataRaw);

// データを暗号化
const encryptedData = encryptData(questionData);

// 暗号化されたデータを新しいファイルに書き込む
fs.writeFileSync(path.join(path.resolve(__dirname, '../assets/'), 'questions', 'encryptedQuestions_claude_ver3.json'), JSON.stringify(encryptedData));

console.log("Encryption completed. Encrypted data saved to encryptedQuestions_claude_ver3.json");