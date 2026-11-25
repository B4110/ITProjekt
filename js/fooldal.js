let osszesItal = [];

const szuroUrlap = document.querySelector("#szuro-urlap");
const keresoMezo = document.querySelector("#kereso");
const alapanyagKereso = document.querySelector("#alapanyag-kereso");
const veletlenGomb = document.querySelector("#veletlen-gomb");
const torlesGomb = document.querySelector("#torles-gomb");

async function osszesKoktelBetoltese() {
  osszesItal = [];
  uzenet("Koktélok betöltése...");
  try {
    for (const betu of "0123456789abcdefghijklmnopqrstuvwxyz") {
      const valasz = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${betu}`);
      if (!valasz.ok) throw new Error(`HTTP hiba: ${valasz.status}`);
      const adat = await valasz.json();
      if (adat.drinks !== null) {
        for (const ital of adat.drinks) osszesItal.push(ital);
      }
    }
    alapanyagListakEpitese(osszesItal, szures);
    szures();
  } catch (hiba) {
    console.error(hiba);
    osszesItal = tartalekItalok.slice();
    alapanyagListakEpitese(osszesItal, szures);
    szures();
    uzenet("Offline tartalék adatok betöltve (3 db koktél)");
  }
}

function szures() {
  const keresettSzoveg = keresoMezo.value.toLowerCase().trim();
  const pipaltAlapanyagok = [];
  for (const jelolo of document.querySelectorAll(".otthoni-jelolo")) {
    if (jelolo.checked) pipaltAlapanyagok.push(jelolo.value);
  }
  const szurtLista = osszesItal.filter((ital) => {
    if (!ital.strDrink.toLowerCase().includes(keresettSzoveg)) return false;
    if (pipaltAlapanyagok.length > 0) {
      for (const tetel of hozzavalokKigyujtese(ital)) {
        if (!pipaltAlapanyagok.includes(alapanyagCsoport(tetel.nev).toLowerCase())) return false;
      }
    }
    return true;
  });
  uzenet(`Találatok száma: ${szurtLista.length} db koktél`);
  if (szurtLista.length > 0) {
    adatlapKirajzolasa(szurtLista[0]);
    tablazatKirajzolasa(szurtLista.slice(0, 30));
  } else {
    uresTalalat("Nincs a megadott feltételeknek megfelelő koktél.");
  }
}

async function kozvetlenKereses(keresettSzoveg) {
  uzenet("Keresés az API-ban...");
  try {
    const valasz = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(keresettSzoveg)}`);
    if (!valasz.ok) throw new Error(`HTTP hiba: ${valasz.status}`);
    const adat = await valasz.json();
    if (adat.drinks !== null) {
      adatlapKirajzolasa(adat.drinks[0]);
      tablazatKirajzolasa(adat.drinks);
      uzenet(`Közvetlen API találatok (${keresettSzoveg}): ${adat.drinks.length} db koktél`);
    } else {
      uresTalalat("Nincs ilyen nevű koktél az adatbázisban.");
      uzenet(`Nincs találat erre a névre: ${keresettSzoveg}`);
    }
  } catch (hiba) {
    console.error(hiba);
    uzenet(`Hiba történt a közvetlen keresés során: ${hiba.message}`);
  }
}

async function veletlenKoktel() {
  try {
    const valasz = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    if (!valasz.ok) throw new Error(`HTTP hiba: ${valasz.status}`);
    const adat = await valasz.json();
    const ital = adat.drinks[0];
    adatlapKirajzolasa(ital);
    tablazatKirajzolasa([ital]);
    uzenet(`Véletlen koktél: ${ital.strDrink}`);
  } catch (hiba) {
    console.error(hiba);
    uzenet(`Nem sikerült véletlen koktélt betölteni: ${hiba.message}`);
  }
}

szuroUrlap.addEventListener("submit", (esemeny) => {
  esemeny.preventDefault();
  const keresettSzoveg = keresoMezo.value.trim();
  if (keresettSzoveg !== "") kozvetlenKereses(keresettSzoveg);
  else szures();
});
keresoMezo.addEventListener("input", () => { szures(); });
alapanyagKereso.addEventListener("input", () => {
  const keresett = alapanyagKereso.value.toLowerCase().trim();
  for (const cimke of document.querySelectorAll(".jelolo-lista label")) {
    if (cimke.textContent.toLowerCase().includes(keresett)) cimke.classList.remove("rejtett");
    else cimke.classList.add("rejtett");
  }
});
veletlenGomb.addEventListener("click", () => { veletlenKoktel(); });
torlesGomb.addEventListener("click", () => {
  szuroUrlap.reset();
  alapanyagKereso.value = "";
  for (const cimke of document.querySelectorAll(".jelolo-lista label")) cimke.classList.remove("rejtett");
  szures();
});

osszesKoktelBetoltese();
