import { Probak, Temak } from "../proba-rendszer/proba-rendszer"
import { Alproba } from "../proba-rendszer/proba-rendszer.models"

export class Program {

    constructor(
        public age = 10,
        public proba = Probak.MagyarCimer,
        public tema = Temak.Cserkeszismeretek,
        public alproba = undefined
    ) {

    }
}
