"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
function encodeRunLength(input) {
    if (!input) {
        return '';
    }
    let encoded = '';
    let count = 1;
    for (let i = 1; i < input.length; i++) {
        if (input[i] === input[i - 1]) {
            count++;
        }
        else {
            encoded += count + input[i - 1];
            count = 1;
        }
    }
    encoded += count + input[input.length - 1];
    return encoded;
}
function decodeRunLength(encoded) {
    if (!encoded) {
        return '';
    }
    let decoded = '';
    let countStr = '';
    for (let char of encoded) {
        if (isNaN(Number(char))) {
            if (countStr) {
                decoded += char.repeat(Number(countStr));
                countStr = '';
            }
            else {
                decoded += char;
            }
        }
        else {
            countStr += char;
        }
    }
    return decoded;
}
async function main() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.log('Usage: ts-node src/main.ts <file-name> <encode|decode>');
        return;
    }
    const fileName = args[0];
    const option = args[1];
    try {
        const fileContent = await fs.promises.readFile(`files/${fileName}`, 'utf-8');
        if (option === 'encode') {
            const encodedContent = encodeRunLength(fileContent);
            await fs.promises.writeFile(`files/${fileName}.encoded`, encodedContent);
            console.log('File encoded successfully.');
        }
        else if (option === 'decode') {
            const decodedContent = decodeRunLength(fileContent);
            await fs.promises.writeFile(`files/${fileName}.decoded`, decodedContent);
            console.log('File decoded successfully.');
        }
        else {
            console.log('Invalid option. Use "encode" or "decode".');
        }
    }
    catch (error) {
        if (error instanceof Error) {
            console.error('An error occurred:', error.message);
        }
        else {
            console.error('An unknown error occurred');
        }
    }
}
main();
