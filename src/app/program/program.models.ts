import { Alprobak, Cserkeszek, Probak, Temak } from "../proba-rendszer/proba-rendszer"

export class Program {



    constructor(
        public age = 10,
        public cserkesz = Cserkeszek.Ujonc,
        public proba = Probak.MagyarCimer,
        public tema = Temak.Cserkeszismeretek,
        public alproba = Alprobak.AlapCserkesztudas,
        public leiras = "",
    ) {

    }
}
