document.getElementById('algo').addEventListener('change', function() {
    const algo = this.value;
    const hints = {
        caesar: "Kunci: Angka (0-25)",
        vigenere: "Kunci: Kata kunci (Contoh: SONY)",
        affine: "a harus relatif prima dengan 26 ",
        playfair: "Kunci: Kata kunci alfabet",
        hill: "Matriks kunci 3x3",
        enigma: "Kunci substitusi Ki berurutan"
    };
    document.getElementById('keyHint').innerText = hints[algo];

    document.getElementById('standardKey').style.display = 'none';
    document.getElementById('affineKey').style.display = 'none';
    document.getElementById('hillKey').style.display = 'none';
    document.getElementById('enigmaKey').style.display = 'none';

    if (algo === 'affine') document.getElementById('affineKey').style.display = 'block';
    else if (algo === 'hill') document.getElementById('hillKey').style.display = 'block';
    else if (algo === 'enigma') document.getElementById('enigmaKey').style.display = 'block';
    else document.getElementById('standardKey').style.display = 'block';
});

function tambahRotor() {
    const container = document.getElementById('rotorContainer');
    const jumlah = container.querySelectorAll('.rotor-item').length;
    const div = document.createElement('div');
    div.className = 'rotor-item';
    div.style.display = "flex"; div.style.gap = "10px"; div.style.marginTop = "5px"; div.style.alignItems = "center";
    div.innerHTML = `<span class="rotor-label" style="font-weight:bold; min-width:30px;">K${jumlah}:</span>
                     <input type="text" class="rotor-map" placeholder="Mapping Alfabet" style="flex-grow:1; padding:5px;">
                     <button onclick="this.parentElement.remove(); updateLabels();" style="background:red; color:white; border:none; border-radius:4px; cursor:pointer; width:25px;">x</button>`;
    container.appendChild(div);
}

function updateLabels() {
    document.querySelectorAll('.rotor-label').forEach((el, i) => el.innerText = `K${i}:`);
}

function proses(mode) {
    const algo = document.getElementById('algo').value;
    const text = document.getElementById('inputText').value;
    let res = "";

    try {
        if (algo === 'affine') {
            const a = document.getElementById('affineA').value;
            const b = document.getElementById('affineB').value;
            res = affineCipher(text, `${a},${b}`, mode);
        } else if (algo === 'hill') {
            let k = [];
            for(let i=1; i<=9; i++) k.push(document.getElementById('h'+i).value);
            res = hillCipher(text, k.join(','), mode);
        } else if (algo === 'enigma') {
            let maps = [];
            document.querySelectorAll('.rotor-map').forEach(el => maps.push(el.value));
            res = enigmaCipher(text, maps, mode);
        } else {
            const k = document.getElementById('key').value;
            if (algo === 'caesar') res = caesarCipher(text, k, mode);
            else if (algo === 'vigenere') res = vigenereCipher(text, k, mode);
            else if (algo === 'playfair') res = playfairCipher(text, k, mode);
        }
        document.getElementById('outputText').innerText = res;
    } catch (e) { alert("Kesalahan: " + e.message); }
}