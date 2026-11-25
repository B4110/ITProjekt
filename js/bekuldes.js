const receptUrlap = document.querySelector("#recept-urlap");
const urlapVisszajelzes = document.querySelector("#urlap-visszajelzes");

function visszajelzes(szoveg) {
  urlapVisszajelzes.textContent = szoveg;
}

async function kuld(ujRecept) {
  visszajelzes("Küldés folyamatban...");

  try {
    const valasz = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(ujRecept)
    });

    if (!valasz.ok) {
      throw new Error(`HTTP hiba: ${valasz.status}`);
    }

    const adat = await valasz.json();
    visszajelzes(`Sikeres beküldés! A recept rögzítési azonosítója: #${adat.id} (${ujRecept.nev}).`);
    receptUrlap.reset();
  } catch (hiba) {
    console.error(hiba);
    visszajelzes(`Hiba történt a beküldés során: ${hiba.message}`);
  }
}

receptUrlap.addEventListener("submit", (esemeny) => {
  esemeny.preventDefault();

  const ujRecept = {
    nev: document.querySelector("#nev").value.trim(),
    email: document.querySelector("#email").value.trim(),
    ido: Number(document.querySelector("#ido").value),
    kategoria: document.querySelector("#kategoria").value,
    leiras: document.querySelector("#leiras").value.trim(),
    elfogad: document.querySelector("#elfogad").checked
  };

  kuld(ujRecept);
});
