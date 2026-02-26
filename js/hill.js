function hillCipher(text, keyStr, mode) {
    let k = keyStr.split(',').map(Number);
    if (k.length !== 9) return "Kunci Hill harus 9 angka (3x3)!";
    
    let n = 26;
    text = text.toUpperCase().replace(/[^A-Z]/g, "");
    while (text.length % 3 !== 0) text += "X"; 

    // Fungsi mencari Mod Inverse (untuk determinan)
    function modInverse(a, m) {
        a = ((a % m) + m) % m;
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) return x;
        }
        return null;
    }

    let matrixK;
    if (mode === 'enkripsi') {
        matrixK = k;
    } else {
        // PROSES DEKRIPSI: MENGHITUNG K^-1
        // 1. Hitung Determinan 3x3
        let det = k[0] * (k[4] * k[8] - k[5] * k[7]) -
                  k[1] * (k[3] * k[8] - k[5] * k[6]) +
                  k[2] * (k[3] * k[7] - k[4] * k[6]);
        
        let invDet = modInverse(det, n);
        if (invDet === null) return "Matriks tidak memiliki invers (Det dan 26 tidak relatif prima)!";

        // 2. Hitung Matriks Adjoin (Kofaktor Transpose)
        let adj = [
            (k[4]*k[8] - k[5]*k[7]), -(k[1]*k[8] - k[2]*k[7]), (k[1]*k[5] - k[2]*k[4]),
            -(k[3]*k[8] - k[5]*k[6]), (k[0]*k[8] - k[2]*k[6]), -(k[0]*k[5] - k[2]*k[3]),
            (k[3]*k[7] - k[4]*k[6]), -(k[0]*k[7] - k[1]*k[6]), (k[0]*k[4] - k[1]*k[3])
        ];

        // 3. Matriks K^-1 = invDet * Adjoin mod 26
        matrixK = adj.map(x => ((x % n) + n) % n * invDet % n);
    }

    let res = "";
    for (let i = 0; i < text.length; i += 3) {
        let p = [text.charCodeAt(i)-65, text.charCodeAt(i+1)-65, text.charCodeAt(i+2)-65];
        for (let r = 0; r < 3; r++) {
            let val = (matrixK[r*3]*p[0] + matrixK[r*3+1]*p[1] + matrixK[r*3+2]*p[2]) % n;
            res += String.fromCharCode(val + 65);
        }
    }
    return res;
}