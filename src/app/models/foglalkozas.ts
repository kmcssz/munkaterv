import { Time } from "@angular/common"
import { Alprobak, Cserkeszek, Probak, Temak } from "./rendszer"
import { Pont } from "./proba"

export class Munkaterv {

    constructor(
        public start: Date,
        // public startTime: Time = {hours: 13, minutes: 0},
        public foglalkozasok: Foglalkozas[] = [],
    ){
    }
}

export enum FoglalkozasType {
    CSAPAT,
    RAJ,
    ORS,
}

export class Foglalkozas {

    constructor(
        public readonly type: FoglalkozasType,
        public duration = 15,
    ){
    }
}

export class CsapatFoglalkozas extends Foglalkozas {

    constructor(
        public leiras = "",
    ) {
        super(FoglalkozasType.CSAPAT)
    }
}

export class RajFoglalkozas extends Foglalkozas {

    constructor(
        public leiras = "",
    ) {
        super(FoglalkozasType.RAJ)
    }
}

export class OrsiFoglalkozas extends Foglalkozas {

    constructor(
        public age = 10,
        public cserkesz = Cserkeszek.Ujonc,
        public proba = Probak.MagyarCimer,
        public tema = Temak.Cserkeszismeretek,
        public alproba = Alprobak.AlapCserkesztudas,
        public pontSelection = new Map<Pont, boolean>(),
        public leiras = "",
    ) {
        super(FoglalkozasType.ORS)
        this.setPontok(Alprobak.AlapCserkesztudas.pontok)
    }

    setPontok(pontok: Pont[]) {
        this.pontSelection.clear()
        pontok.forEach((pont) => this.pontSelection.set(pont, false))
    }
}
