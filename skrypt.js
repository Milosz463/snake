ruchD.style.display = "none";
ruchG.style.display = "none";
ruchL.style.display = "none";
ruchP.style.display = "none";
/*
ZROBIC POWIEKSZANIE WEZA PRZEZ DODAWANIE POZYCJI GLOWY DOD TABLICY I OSTATNIEGO ELEMETNU OGONA OD NIEGO KOLOROWAC DIVY
*/
function generujPlansze() {
  plansza.style.setProperty("--kolumny", kolumny);
  plansza.style.setProperty("--rozmiar", szerokosc + "px");

  for (let i = 0; i < wiersze; i++) {
    for (let j = 0; j < kolumny; j++) {
      let siatka = document.createElement("div");
      siatka.classList.add("box");
      siatka.id = "box" + (i*kolumny+j);

      if ((i + j) % 2 === 0) {
        siatka.classList.add("jasne");
      } else {
        siatka.classList.add("ciemne");
      }

      licznik++;
      plansza.appendChild(siatka);
    }
  }
}

function ruchWprawo() {
  dirX = 1;
  dirY = 0;
  czyZaczetoSieRuszac = true;
}

function ruchWlewo() {
  dirX = -1;
  dirY = 0;
  czyZaczetoSieRuszac = true;
}

function ruchWdol() {
  dirX = 0;
  dirY = 1;
  czyZaczetoSieRuszac = true;
}

function ruchWgore() {
  dirX = 0;
  dirY = -1;
  czyZaczetoSieRuszac = true;
}





function tick() {
  auto = setInterval(function () {
    if (!czyZaczetoSieRuszac) return;

    aktualnaPozycjaGlowy();

    //pozycja głowy węża
    let x = kolumna + dirX;
    let y = wiersz + dirY;
    let nowySegment = segmentyWeza[0] + dirX + dirY * kolumny;

    //kolizja ze sciana
    if (x < 0 || x >= kolumny || y < 0 || y >= wiersze) {
      oknoPrzegranej.style.display = "block";
      podsumowanieWynik.textContent = "WYNIK: " + wynik;
      return;
    }

    if(segmentyWeza.includes(nowySegment)){
      oknoPrzegranej.style.display = "block";
      podsumowanieWynik.textContent = "WYNIK: " + wynik;
      return;
    }
    
  //dodanie glowy do tablicy
    segmentyWeza.unshift(nowySegment)

  //pozycja jedzenia
  pozJedzX = losowa % kolumny;
  pozJedzY = Math.floor(losowa / kolumny);

  //sprawdzenie kolizxji z jedzeniem
  if (x == pozJedzX && y == pozJedzY) {
    wynik++;
    wynikText.textContent = "WYNIK: " + wynik;
    
    let blok = document.getElementById("box" + losowa);
if (blok) {
    blok.classList.remove("jedzenie");
    if (losowa % 2 === 0) {
        blok.classList.add("jasne");
    } else {
        blok.classList.add("ciemne");
    }
} else {
    console.error("Nie znaleziono elementu box" + losowa);
}
//ziwkeszenie predkosci weza po zjedzeniu
    while (predkoscWeza != 150) {
      if (wynik % 5 == 0) {
        predkoscWeza -= 20;
      } else {
        predkoscWeza -= 5;
      }
    }
    losujJedzenie();
  }else{
    let ogon=segmentyWeza.pop()
    let blokOgona=document.getElementById("box"+ogon)
    if(blokOgona){
      blokOgona.classList.remove("snake")
    }
  }

    
    let blok = document.getElementById("box" + nowySegment);
//poruszanie glowy weza
    if (blok) {
      blok.classList.add("snake");
      id = nowySegment;
    } else {
      clearInterval(auto);
      oknoPrzegranej.style.display = "block";
      podsumowanieWynik.textContent = "WYNIK: " + wynik;
      return;
    }
  }, predkoscWeza);
}



















function PokazWezaNaPoczatekGry() {
  if (czyZaczetoSieRuszac == false) {
    document.getElementById("box" + 43).classList.add("snake");
  } else {
    document.getElementById("box" + 43).classList.add("ciemne");
  }
}
function aktualnaPozycjaGlowy() {
  kolumna = id % kolumny;
  wiersz = Math.floor(id / kolumny);
}

function losujJedzenie() {
  losowa = Math.floor(Math.random() * licznik);
  document.getElementById("box" + losowa).classList.add("jedzenie");
}

function resetujJedzenie() {
  let wszystkiePola = document.querySelectorAll(".box");
  wszystkiePola.forEach((pole) => {
    pole.classList.remove("jedzenie");
  });
}

function GrajPonownie() {
  oknoPrzegranej.style.display = "none";
  if (auto) clearInterval(auto);

  dirX = 0;
  dirY = 0;
  czyZaczetoSieRuszac = false;
  id = 43;
  poprzedni = 43;
  wynik = 0;
  predkoscWeza = 400;
  segmentyWeza[43]
  segmentyWeza.forEach(seg => {
    let blok = document.getElementById("box" + seg);
    if (blok) blok.classList.remove("snake");
  });
  resetujJedzenie();
  PokazWezaNaPoczatekGry();
  tick();
  ruchD.style.display = "block";
  ruchG.style.display = "block";
  ruchL.style.display = "block";
  ruchP.style.display = "block";
  document.getElementById("przyciskGraj").style.display = "none";

  losujJedzenie();
}

function startGry() {
  if (auto) {
    clearInterval(auto);
  }

  id = 43;
  poprzedni = 43;
  PokazWezaNaPoczatekGry();
  tick();
  ruchD.style.display = "block";
  ruchG.style.display = "block";
  ruchL.style.display = "block";
  ruchP.style.display = "block";
  przyciskGraj.style.display = "none";
  losujJedzenie();
}
generujPlansze();
