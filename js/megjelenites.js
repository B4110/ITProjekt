const allapotMezo = document.querySelector("#allapot");
const alkoholLista = document.querySelector("#alkohol-lista");
const keveroLista = document.querySelector("#kevero-lista");
const gyumolcsLista = document.querySelector("#gyumolcs-lista");
const italNev = document.querySelector("#ital-nev");
const italKep = document.querySelector("#ital-kep");
const italTipus = document.querySelector("#ital-tipus");
const italKategoria = document.querySelector("#ital-kategoria");
const italPohar = document.querySelector("#ital-pohar");
const hozzavalokLista = document.querySelector("#hozzavalok-lista");
const italLeiras = document.querySelector("#ital-leiras");
const tablazatTorzs = document.querySelector("#tablazat-torzs");

function uzenet(szoveg) {
  allapotMezo.textContent = szoveg;
}

function kisKepKeszitese(alapanyagNev) {
  const kep = document.createElement("img");
  kep.classList.add("osszetevok-kep");
  kep.src = `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(alapanyagNev)}-Small.png`;
  kep.alt = alapanyagNev;
  kep.addEventListener("error", () => { kep.classList.add("rejtett"); });
  return kep;
}

function alapanyagListakEpitese(italok, szuresFuggveny) {
  const gyakorisag = {};
  const egyediLista = [];
  for (const ital of italok) {
    const adottItalban = [];
    for (const tetel of hozzavalokKigyujtese(ital)) {
      const nev = alapanyagCsoport(tetel.nev);
      if (!adottItalban.includes(nev)) {
        adottItalban.push(nev);
        if (typeof gyakorisag[nev] === "number") gyakorisag[nev]++;
        else { gyakorisag[nev] = 1; egyediLista.push(nev); }
      }
    }
  }
  egyediLista.sort((elsonek, masodiknak) => {
    if (gyakorisag[masodiknak] !== gyakorisag[elsonek]) return gyakorisag[masodiknak] - gyakorisag[elsonek];
    return elsonek.localeCompare(masodiknak);
  });
  alkoholLista.textContent = "";
  keveroLista.textContent = "";
  gyumolcsLista.textContent = "";
  egyediLista.forEach((nev) => {
    const kategoria = alapanyagKategoria(nev);
    let celLista = gyumolcsLista;
    if (kategoria === "alkohol") celLista = alkoholLista;
    else if (kategoria === "kevero") celLista = keveroLista;
    const cimke = document.createElement("label");
    cimke.classList.add("jelolo-elem");
    const jelolo = document.createElement("input");
    jelolo.type = "checkbox";
    jelolo.classList.add("otthoni-jelolo");
    jelolo.value = nev.toLowerCase();
    jelolo.addEventListener("change", () => { szuresFuggveny(); });
    cimke.append(jelolo, kisKepKeszitese(nev), `${nev} (${gyakorisag[nev]})`);
    celLista.append(cimke);
  });
}

function adatlapKirajzolasa(ital) {
  italNev.textContent = ital.strDrink;
  italKep.src = ital.strDrinkThumb;
  italKep.alt = `${ital.strDrink} koktél fotója`;
  italTipus.textContent = ital.strAlcoholic;
  italKategoria.textContent = ital.strCategory;
  italPohar.textContent = ital.strGlass;
  italLeiras.textContent = ital.strInstructions;
  hozzavalokLista.textContent = "";
  hozzavalokKigyujtese(ital).forEach((tetel) => {
    const elem = document.createElement("li");
    let szoveg = tetel.nev;
    if (tetel.mertek !== "") szoveg = `${tetel.mertek} ${tetel.nev}`;
    elem.append(kisKepKeszitese(tetel.nev), szoveg);
    hozzavalokLista.append(elem);
  });
}

function uresTalalat(leiras) {
  tablazatTorzs.textContent = "";
  adatlapKirajzolasa({ strDrink: "Nincs találat", strDrinkThumb: "img/alap-koktel.svg", strAlcoholic: "-", strCategory: "-", strGlass: "-", strInstructions: leiras });
}

function tablazatKirajzolasa(lista) {
  tablazatTorzs.textContent = "";
  lista.forEach((ital) => {
    const sor = document.createElement("tr");
    const cellaNev = document.createElement("td");
    const cellaTipus = document.createElement("td");
    const cellaPohar = document.createElement("td");
    const cellaDarab = document.createElement("td");
    const cellaMuvelet = document.createElement("td");
    cellaNev.textContent = ital.strDrink;
    cellaTipus.textContent = ital.strAlcoholic;
    cellaPohar.textContent = ital.strGlass;
    cellaDarab.textContent = `${hozzavalokKigyujtese(ital).length} db`;
    const gomb = document.createElement("button");
    gomb.type = "button";
    gomb.classList.add("gomb", "gomb-masodlagos");
    gomb.textContent = "Megnyitás";
    gomb.addEventListener("click", () => { adatlapKirajzolasa(ital); });
    cellaMuvelet.append(gomb);
    sor.append(cellaNev, cellaTipus, cellaPohar, cellaDarab, cellaMuvelet);
    tablazatTorzs.append(sor);
  });
}
