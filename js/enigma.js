function enigmaCipher(text, rotorMaps, mode) {
    let res = "";
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < cleanText.length; i++) {
        let char = cleanText[i];
        let rotorIdx = i % rotorMaps.length; // Menentukan K0, K1, dst [cite: 591, 602]
        let map = rotorMaps[rotorIdx].toUpperCase().replace(/[^A-Z]/g, '');
        
        if (map.length === 0) continue;

        let charPos = char.charCodeAt(0) - 65; // Posisi asli A=0, B=1, ... R=17
        
        if (mode === 'enkripsi') {
            // Jika posisi huruf (misal R=17) > panjang rotor (misal 5), gunakan modulo
            let mappedIdx = charPos % map.length; // 17 mod 5 = 2 
            res += map[mappedIdx];
        } else {
            // Dekripsi: Mencari karakter di mapping dan mengembalikan ke alfabet standar
            let found = false;
            // Mencari semua kemungkinan posisi karena adanya sistem pengulangan (modulo)
            for (let j = 0; j < map.length; j++) {
                if (map[j] === char) {
                    // Karena berulang, kita ambil representasi alfabet pertama yang cocok
                    res += String.fromCharCode(j + 65);
                    found = true;
                    break;
                }
            }
            if (!found) res += char;
        }
    }
    return res;
}