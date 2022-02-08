import { Alproba, Proba, Tema } from "./proba-rendszer.models"

export const Probak = {
    MagyarCimer: new Proba(10, 10, "Újonc", "Magyar címer próba", "MagyarCimerProba"),
    SzentKorona: new Proba(10, 10, "Újonc", "Szent Korona próba", "SzentKoronaProba"),
    PirosSzalag: new Proba(11, 12, "Táborverő", "Piros szalag próba", "PirosSzalagProba"),
    FeherSzalag: new Proba(11, 12, "Táborverő", "Fehér szalag próba", "FeherSzalagProba"),
    ZoldSzalag: new Proba(11, 12, "Táborverő", "Zöld szalag próba", "ZoldSzalagProba"),
    LegyResen: new Proba(11, 12, "Táborverő", "Légy résen próba", "LegyResenProba"),
    PirosLiliom: new Proba(13, 14, "Portyázó", "Piros liliom próba", "PirosLiliomProba"),
    FeherLiliom: new Proba(13, 14, "Portyázó", "Fehér liliom próba", "FeherLiliomProba"),
    ZoldLiliom: new Proba(13, 14, "Portyázó", "Zöld liliom próba", "ZoldLiliomProba"),
    Liliom: new Proba(13, 14, "Portyázó", "Liliom próba", "LiliomProba"),
    PirosKoszoru: new Proba(15, 16, "Honfoglaló", "Piros koszorú próba", "PirosKoszoruProba"),
    FeherKoszoru: new Proba(15, 16, "Honfoglaló", "Fehér koszorú próba", "FeherKoszoruProba"),
    ZoldKoszoru: new Proba(15, 16, "Honfoglaló", "Zöld koszorú próba", "ZoldKoszoruProba"),
    Koszoru: new Proba(15, 16, "Honfoglaló", "Koszorú próba", "KoszoruProba"),
}

export const Temak = {
    Cserkeszismeretek: new Tema("Cserkészismeretek", "⚜️"),
    Vallas: new Tema("Vallás", "✝️"),
    Jellemneveles: new Tema("Jellemnevelés", "🦸"),
    Magyarsagismeret: new Tema("Magyarságismeret", "🇭🇺"),
    Elsosegely: new Tema("Elsősegély", "🩹"),
    Termeszetismeret: new Tema("Természetismeret", "🌿"),
    Csomozas: new Tema("Csomózás", "🪢"),
    Jeladas: new Tema("Jeladás", "🎌"),
    Tajekozodas: new Tema("Tájékozódás", "🧭"),
    Becsles: new Tema("Becslés", "📐"),
    Taborozas: new Tema("Táborozás, szerszámok", "⛺"),
    Tuzrakas: new Tema("Tűzrakás, főzés és sütés", "🔥"),
    Testedzes: new Tema("Testedzés", "🤸"),
}

export const Alprobak = [
//    new Alproba("Alap cserkésztudás", ["El tudod énekelni a cserkészinduló 1. versszakát.", "Tudod a cserkész jelszót és tisztelgést.", "Le tudod rajzolni a cserkészliliomot."])
]
