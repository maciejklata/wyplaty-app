const hoursInput = document.getElementById('hours');
const krzychuPiecInput = document.getElementById('krzychuPiec');
const kacperPiecInput = document.getElementById('kacperPiec');
const opuszczanieInput = document.getElementById('opuszczanie');
const summaryText = document.getElementById('summaryText');
const saveBtn = document.getElementById('saveBtn');
const resetBtn = document.getElementById('resetBtn');

// Stałe stawki
const STAWKA_GODZINA = 24;
const STAWKA_PIEC = 200;
const STAWKA_OPUSZCZANIE = 450;

// Oblicz zaległości
function updateSummary() {
  const godziny = parseFloat(hoursInput.value) || 0;
  const krzychuPiec = parseInt(krzychuPiecInput.value) || 0;
  const kacperPiec = parseInt(kacperPiecInput.value) || 0;
  const opuszczanie = parseInt(opuszczanieInput.value) || 0;

  const sumaGodzin = godziny * STAWKA_GODZINA;
  const sumaOpuszczanie = opuszczanie * STAWKA_OPUSZCZANIE;
  const sumaKrzychu = krzychuPiec * STAWKA_PIEC + sumaGodzin + sumaOpuszczanie;
  const sumaKacper = kacperPiec * STAWKA_PIEC + sumaGodzin + sumaOpuszczanie;

  summaryText.innerText = 
    `Godzin: ${godziny}
Piece Krzychu: ${krzychuPiec}
Piece Kacper: ${kacperPiec}
Opuszczanie: ${opuszczanie}

Zaległości: ${sumaKrzychu} zł u Krzycha i ${sumaKacper} zł u Kacpra.`;
}

// Zapisz dane do localStorage
function saveData() {
  const data = {
    godziny: hoursInput.value,
    krzychuPiec: krzychuPiecInput.value,
    kacperPiec: kacperPiecInput.value,
    opuszczanie: opuszczanieInput.value
  };
  localStorage.setItem('wplatyData', JSON.stringify(data));
  updateSummary();
}

// Załaduj dane z localStorage
function loadData() {
  const data = JSON.parse(localStorage.getItem('wplatyData'));
  if (data) {
    hoursInput.value = data.godziny;
    krzychuPiecInput.value = data.krzychuPiec;
    kacperPiecInput.value = data.kacperPiec;
    opuszczanieInput.value = data.opuszczanie;
  }
  updateSummary();
}

// Resetuj dane
function resetData() {
  hoursInput.value = '';
  krzychuPiecInput.value = '';
  kacperPiecInput.value = '';
  opuszczanieInput.value = '';
  localStorage.removeItem('wplatyData');
  updateSummary();
}

// Obsługa przycisków
saveBtn.addEventListener('click', saveData);
resetBtn.addEventListener('click', resetData);

// Aktualizacja na zmianę pól
[hoursInput, krzychuPiecInput, kacperPiecInput, opuszczanieInput].forEach(input => {
  input.addEventListener('input', updateSummary);
});

// Załaduj dane przy starcie
loadData();
