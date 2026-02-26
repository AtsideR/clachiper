function enigmaCipher(text, rotorMaps, mode) {
    let res = "";
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    for (let i = 0; i < cleanText.length; i++) {
        let rotorIdx = i % rotorMaps.length; // Karakter ke-i pakai Ki [cite: 591]
        let map = rotorMaps[rotorIdx].toUpperCase();
        let alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".substring(0, map.length);
        if (mode === 'enkripsi') {
            let idx = alpha.indexOf(cleanText[i]);
            res += (idx !== -1) ? map[idx] : cleanText[i]; // Substitusi Ki [cite: 604]
        } else {
            let idx = map.indexOf(cleanText[i]);
            res += (idx !== -1) ? alpha[idx] : cleanText[i];
        }
    }
    return res;
}