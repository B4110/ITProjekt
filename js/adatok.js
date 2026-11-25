const tartalekItalok = [
  { idDrink: "11000", strDrink: "Mojito", strAlcoholic: "Alcoholic", strCategory: "Cocktail", strGlass: "Highball glass", strDrinkThumb: "img/alap-koktel.svg", strInstructions: "Törd össze a mentát a cukorral és a lime levével, töltsd fel jéggel, öntsd rá a rumot és a szódavizet.", strIngredient1: "Light rum", strMeasure1: "2 oz", strIngredient2: "Lime", strMeasure2: "Juice of 1", strIngredient3: "Sugar", strMeasure3: "2 tsp", strIngredient4: "Mint", strMeasure4: "2-4", strIngredient5: "Soda water", strMeasure5: "Top" },
  { idDrink: "11003", strDrink: "Negroni", strAlcoholic: "Alcoholic", strCategory: "Ordinary Drink", strGlass: "Old-fashioned glass", strDrinkThumb: "img/alap-koktel.svg", strInstructions: "Keverd el az összetevőket jégen egy Old Fashioned pohárban, majd díszítsd narancshéjjal.", strIngredient1: "Gin", strMeasure1: "1 oz", strIngredient2: "Campari", strMeasure2: "1 oz", strIngredient3: "Sweet Vermouth", strMeasure3: "1 oz" },
  { idDrink: "12560", strDrink: "Virgin Mojito", strAlcoholic: "Non alcoholic", strCategory: "Cocktail", strGlass: "Highball glass", strDrinkThumb: "img/alap-koktel.svg", strInstructions: "Finoman nyomkodd össze a lime-ot, a cukrot és a mentaleveleket, majd töltsd fel tört jéggel és szódavízzel.", strIngredient1: "Lime juice", strMeasure1: "1 oz", strIngredient2: "Sugar", strMeasure2: "2 tsp", strIngredient3: "Mint", strMeasure3: "4 leaves", strIngredient4: "Soda water", strMeasure4: "Top" }
];

const csoportSzabalyok = [
  { nev: "Vodka", kulcsszavak: ["vodka", "absolut"] },
  { nev: "Rum", kulcsszavak: ["rum", "bacardi", "malibu"] },
  { nev: "Gin", kulcsszavak: ["gin", "beefeater", "tanqueray"] },
  { nev: "Tequila", kulcsszavak: ["tequila"] },
  { nev: "Whiskey", kulcsszavak: ["whiskey", "whisky", "bourbon", "jack daniels", "scotch"] },
  { nev: "Brandy", kulcsszavak: ["brandy", "cognac"] },
  { nev: "Triple sec", kulcsszavak: ["triple sec", "cointreau"] },
  { nev: "Vermouth", kulcsszavak: ["vermouth", "martini"] },
  { nev: "Champagne", kulcsszavak: ["champagne", "prosecco"] },
  { nev: "Soda water", kulcsszavak: ["soda", "club soda"] },
  { nev: "Tonic water", kulcsszavak: ["tonic"] },
  { nev: "Coca-Cola", kulcsszavak: ["coca-cola", "coke"] },
  { nev: "Lime juice", kulcsszavak: ["lime juice"] },
  { nev: "Lemon juice", kulcsszavak: ["lemon juice"] },
  { nev: "Orange juice", kulcsszavak: ["orange juice"] }
];

const alkoholKulcsszavak = ["vodka", "rum", "gin", "tequila", "whiskey", "brandy", "triple sec", "vermouth", "champagne", "liqueur", "schnapps", "wine", "beer", "amaretto", "kahlua", "campari", "bitters", "ouzo", "absinthe", "irish", "applejack"];
const keveroKulcsszavak = ["juice", "soda", "water", "tonic", "coca-cola", "milk", "cream", "coffee", "tea", "syrup", "ale", "sprite", "7-up", "lemonade", "nectar"];

function hozzavalokKigyujtese(ital) {
  const hozzavalok = [];
  for (let sorszam = 1; sorszam <= 15; sorszam++) {
    const nyersNev = ital[`strIngredient${sorszam}`];
    const nyersMertek = ital[`strMeasure${sorszam}`];
    if (nyersNev && nyersNev.trim() !== "") {
      let mertek = "";
      if (nyersMertek && nyersMertek.trim() !== "") mertek = nyersMertek.trim();
      hozzavalok.push({ nev: nyersNev.trim(), mertek: mertek });
    }
  }
  return hozzavalok;
}

function tartalmazKulcsszot(szoveg, kulcsszavak) {
  for (const szo of kulcsszavak) {
    if (szoveg.includes(szo)) return true;
  }
  return false;
}

function alapanyagCsoport(nyersNev) {
  const tiszta = nyersNev.trim();
  const kisbetus = tiszta.toLowerCase();
  for (const szabaly of csoportSzabalyok) {
    if (tartalmazKulcsszot(kisbetus, szabaly.kulcsszavak)) return szabaly.nev;
  }
  return `${tiszta.charAt(0).toUpperCase()}${tiszta.slice(1).toLowerCase()}`;
}

function alapanyagKategoria(nev) {
  const kisbetus = nev.toLowerCase();
  if (tartalmazKulcsszot(kisbetus, alkoholKulcsszavak)) return "alkohol";
  if (tartalmazKulcsszot(kisbetus, keveroKulcsszavak)) return "kevero";
  return "gyumolcs";
}
