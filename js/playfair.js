function playfairCipher(text, key, mode) {
    // 1. Siapkan Matriks 5x5 (Gabungkan I/J) [cite: 318, 357]
    let alphabet = "ABCDEFGHIKLMNOPQRSTUVWXYZ"; 
    key = key.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    let keySet = new Set(key + alphabet);
    let matrix = Array.from(keySet).slice(0, 25);
    
    // 2. Olah Plaintext (Tambah Q jika ganjil) 
    text = text.toUpperCase().replace(/J/g, "I").replace(/[^A-Z]/g, "");
    if (text.length % 2 !== 0) text += "Q";

    let res = "";
    for (let i = 0; i < text.length; i += 2) {
        let a = text[i], b = text[i+1];
        let idxA = matrix.indexOf(a), idxB = matrix.indexOf(b);
        let r1 = Math.floor(idxA / 5), c1 = idxA % 5;
        let r2 = Math.floor(idxB / 5), c2 = idxB % 5;

        if (r1 === r2) { // Baris sama: geser kanan (enk) / kiri (dek) [cite: 301, 342]
            let shift = (mode === 'enkripsi') ? 1 : 4;
            res += matrix[r1 * 5 + (c1 + shift) % 5] + matrix[r2 * 5 + (c2 + shift) % 5];
        } else if (c1 === c2) { // Kolom sama: geser bawah (enk) / atas (dek) [cite: 302, 343]
            let shift = (mode === 'enkripsi') ? 1 : 4;
            res += matrix[((r1 + shift) % 5) * 5 + c1] + matrix[((r2 + shift) % 5) * 5 + c2];
        } else { // Persegi panjang: tukar kolom [cite: 303-305, 344-345]
            res += matrix[r1 * 5 + c2] + matrix[r2 * 5 + c1];
        }
    }
    return res;
}