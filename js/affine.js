function affineCipher(text, keyStr, mode) {
    let [a, b] = keyStr.split(',').map(Number);
    let result = "";
    let n = 26; // Ukuran alfabet [cite: 385]

    if (mode === 'enkripsi') {
        for (let char of text.toUpperCase().replace(/[^A-Z]/g, '')) {
            let p = char.charCodeAt(0) - 65;
            // Rumus Enkripsi: C = (aP + b) mod 26 [cite: 381]
            let c = (a * p + b) % n;
            result += String.fromCharCode(c + 65);
        }
    } else {
        // 1. Cari Modular Inverse (a^-1 mod 26) [cite: 389]
        let aInv = -1;
        for (let x = 0; x < n; x++) {
            if ((a * x) % n === 1) {
                aInv = x;
                break;
            }
        }

        if (aInv === -1) return "Error: 'a' harus relatif prima dengan 26!";

        for (let char of text.toUpperCase().replace(/[^A-Z]/g, '')) {
            let c = char.charCodeAt(0) - 65;
            // 2. Rumus Dekripsi: P = a^-1 * (C - b) mod 26 
            // Kita tambahkan +26 sebelum modulo untuk menangani hasil negatif
            let p = (aInv * (c - b)) % n;
            if (p < 0) p += n; 
            
            result += String.fromCharCode(p + 65);
        }
    }
    return result;
}