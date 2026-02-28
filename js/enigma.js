/**
 * enigma.js - Implementasi Rotor Cipher Sederhana (Slide 17) [cite: 591, 597]
 * Diperbaiki untuk menangani karakter alfabet yang indeksnya melebihi panjang kunci rotor.
 */
function enigmaCipher(text, rotorMaps, mode) {
    let res = "";
    // Membersihkan teks: hanya memproses huruf alfabet A-Z [cite: 57, 70]
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < cleanText.length; i++) {
        let char = cleanText[i];
        
        /** * Pemilihan rotor (Ki) dilakukan secara berurutan (siklik) 
         * berdasarkan posisi karakter ke-i dalam teks[cite: 591, 592].
         */
        let rotorIdx = i % rotorMaps.length; 
        let map = rotorMaps[rotorIdx].toUpperCase().replace(/[^A-Z]/g, '');
        
        if (map.length === 0) {
            res += char;
            continue;
        }

        if (mode === 'enkripsi') {
            /**
             * ENKRIPSI:
             * Karakter alfabet (A=0, B=1, ... Z=25) dipetakan ke kunci rotor.
             * Jika posisi alfabet > panjang kunci, dilakukan operasi modulo[cite: 591].
             */
            let charPos = char.charCodeAt(0) - 65; 
            let mappedIdx = charPos % map.length; 
            res += map[mappedIdx];
        } else {
            /**
             * DEKRIPSI:
             * Mencari posisi karakter cipherteks di dalam kunci rotor.
             * Hasilnya dikembalikan ke urutan alfabet standar (A, B, C, dst).
             */
            let foundIdx = map.indexOf(char);
            
            if (foundIdx !== -1) {
                // Mengonversi indeks yang ditemukan kembali ke huruf alfabet
                res += String.fromCharCode(foundIdx + 65);
            } else {
                // Jika karakter tidak ada dalam mapping, karakter asli dipertahankan
                res += char;
            }
        }
    }
    return res;
}