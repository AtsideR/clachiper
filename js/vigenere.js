function vigenereCipher(text, key, mode) {
    let result = "";
    key = key.toUpperCase().replace(/[^A-Z]/g, '');
    let kIdx = 0;
    for (let char of text.toUpperCase()) {
        if (char < 'A' || char > 'Z') continue;
        let p = char.charCodeAt(0) - 65;
        let k = key.charCodeAt(kIdx % key.length) - 65;
        // Rumus: Enkripsi (p + k) mod 26, Dekripsi (p - k) mod 26 [cite: 232, 238]
        let res = (mode === 'enkripsi') ? (p + k) % 26 : (p - k + 26) % 26;
        result += String.fromCharCode(res + 65);
        kIdx++;
    }
    return result;
}