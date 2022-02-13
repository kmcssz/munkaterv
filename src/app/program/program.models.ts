import { Alprobak, Cserkeszek, Probak, Temak } from "../proba-rendszer/proba-rendszer"
import { Pont } from "../proba-rendszer/proba-rendszer.models"

export class Program {

    constructor(
        public age = 10,
        public cserkesz = Cserkeszek.Ujonc,
        public proba = Probak.MagyarCimer,
        public tema = Temak.Cserkeszismeretek,
        public alproba = Alprobak.AlapCserkesztudas,
        public pontSelection = new Map<Pont, boolean>([
            [new Pont("El tudod énekelni a cserkészinduló 1. versszakát."), false],
            [new Pont("Tudod a cserkész jelszót és tisztelgést."), false],
            [new Pont("Le tudod rajzolni a cserkészliliomot."), false],
        ]),
        public leiras = "",
    ) {

    }

    setPontok(pontok: Pont[]) {
        this.pontSelection.clear()
        pontok.forEach((pont) => this.pontSelection.set(pont, false))
    }

}
