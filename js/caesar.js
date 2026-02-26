function caesarCipher(text, keyStr, mode) {
    // Caesar Cipher menggunakan kunci berupa integer 1-25 
    let shift = parseInt(keyStr) % 26;
    if (isNaN(shift)) return "Kunci harus berupa angka!";
    
    let result = "";
    // Algoritma klasik bersifat case-insensitive dan tidak mengenal angka/tanda baca [cite: 70, 71, 72]
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');

    for (let char of cleanText) {
        let p = char.charCodeAt(0) - 65;
        let res;
        
        if (mode === 'enkripsi') {
            // Geser ke kanan 
            res = (p + shift) % 26;
        } else {
            // Geser kembali ke kiri untuk dekripsi [cite: 134]
            res = (p - shift + 26) % 26;
        }
        result += String.fromCharCode(res + 65);
    }
    return result;
}