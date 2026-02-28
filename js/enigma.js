/**
 * enigma.js - Implementasi Rotor Cipher Sederhana
 * Memperbaiki masalah pengulangan hasil enkripsi untuk input karakter yang panjang.
 */
function enigmaCipher(text, rotorMaps, mode) {
    let res = "";
    // Membersihkan teks: hanya mengambil huruf A-Z
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < cleanText.length; i++) {
        let char = cleanText[i];
        
        // Memilih rotor (K0, K1, K2...) secara siklik berdasarkan urutan karakter ke-i
        let rotorIdx = i % rotorMaps.length; 
        let map = rotorMaps[rotorIdx].toUpperCase().replace(/[^A-Z]/g, '');
        
        if (map.length === 0) {
            res += char;
            continue;
        }

        // Mendapatkan posisi alfabet asli (A=0, B=1, C=2, ..., Z=25)
        let charPos = char.charCodeAt(0) - 65; 
        
        if (mode === 'enkripsi') {
            /** * LOGIKA BERULANG: 
             * Jika posisi huruf (misal R=17) lebih besar dari panjang rotor (misal 5),
             * gunakan operasi modulo untuk menentukan indeks mapping yang digunakan.
             * Contoh: 17 mod 5 = 2. Maka huruf 'R' dipetakan ke karakter indeks ke-2 di mapping.
             */
            let mappedIdx = charPos % map.length; 
            res += map[mappedIdx];
        } else {
            /** * DEKRIPSI:
             * Mencari karakter cipherteks di dalam mapping. 
             * Karena satu karakter mapping bisa mewakili banyak huruf alfabet (akibat modulo),
             * kita mengembalikan representasi alfabet pertama yang cocok (indeks terkecil).
             */
            let foundIdx = map.indexOf(char);
            if (foundIdx !== -1) {
                res += String.fromCharCode(foundIdx + 65);
            } else {
                res += char;
            }
        }
    }
    return res;
}