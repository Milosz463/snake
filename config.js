kolumny = 20;
wiersze = 15;
licznik = 0;
id = 0;
poprzedni = null;
auto = null;
szerokosc = 40;
czyZaczetoSieRuszac = false;
losowa = 0;
wynik = 0;
predkoscWeza = 400;
let segmentyWeza = [43];

let ruchG = document.getElementById("ruchGora");
let ruchD = document.getElementById("ruchDol");
let ruchL = document.getElementById("ruchLewo");
let ruchP = document.getElementById("ruchPrawo");
let oknoPrzegranej = document.getElementById("oknoPrzegranej");
let podsumowanieWynik = document.getElementById("podsumowanieWynik");
let podsumowaniePoziom = document.getElementById("podsumowaniePoziom");
let plansza = document.getElementById("gridPlansza");
let wynikText = document.getElementById("wynik");
let przyciskGraj = document.getElementById("przyciskGraj");

//autor:Milosz Dawiec
