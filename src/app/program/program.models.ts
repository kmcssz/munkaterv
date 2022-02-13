import { Alprobak, Cserkeszek, Probak, Temak } from "../proba-rendszer/proba-rendszer"
import { Pont } from "../proba-rendszer/proba-rendszer.models"

export class Program {

    constructor(
        public age = 10,
        public cserkesz = Cserkeszek.Ujonc,
        public proba = Probak.MagyarCimer,
        public tema = Temak.Cserkeszismeretek,
        public alproba = Alprobak.AlapCserkesztudas,
        public pontok: Pont[] = [
            new Pont("El tudod énekelni a cserkészinduló 1. versszakát.", false),
            new Pont("Tudod a cserkész jelszót és tisztelgést.", true),
            new Pont("Le tudod rajzolni a cserkészliliomot.", false),
        ],
        public leiras = "",
    ) {

    }
}
