/**
 * enigma.js - Implementasi Rotor Cipher Sederhana (Slide 17)
 * Mendukung pemrosesan siklik/berulang untuk Enkripsi dan Dekripsi.
 */
function enigmaCipher(text, rotorMaps, mode) {
    let res = "";
    // Hanya memproses huruf A-Z [cite: 57]
    let cleanText = text.toUpperCase().replace(/[^A-Z]/g, '');
    
    for (let i = 0; i < cleanText.length; i++) {
        let char = cleanText[i];
        
        // Pilih rotor secara bergantian: K0, K1, K2, lalu kembali ke K0 
        let rotorIdx = i % rotorMaps.length; 
        let map = rotorMaps[rotorIdx].toUpperCase().replace(/[^A-Z]/g, '');
        
        // Jika rotor kosong, lewati karakter tersebut
        if (map.length === 0) {
            res += char;
            continue;
        }

        if (mode === 'enkripsi') {
            // ENKRIPSI: Ambil posisi alfabet asli (A=0, B=1, dst)
            let charPos = char.charCodeAt(0) - 65; 
            
            // Logika Berulang: Gunakan modulo jika posisi > panjang rotor
            let mappedIdx = charPos % map.length; 
            res += map[mappedIdx];
        } else {
            // DEKRIPSI: Cari posisi karakter cipherteks di dalam mapping rotor
            let foundIdx = map.indexOf(char);
            
            if (foundIdx !== -1) {
                /**
                 * Karena enkripsi menggunakan modulo, dekripsi mengembalikan 
                 * ke urutan alfabet dasar (0-25) yang pertama kali cocok.
                 * Contoh: Jika 'E' ada di indeks ke-2 mapping, maka hasilnya 'C' (indeks 2).
                 */
                res += String.fromCharCode(foundIdx + 65);
            } else {
                // Jika karakter tidak ditemukan di mapping, biarkan tetap
                res += char;
            }
        }
    }
    return res;
}