import { Alprobak, Cserkeszek, Probak, Temak } from "./rendszer"
import { Pont } from "./proba"

export class Munkaterv {

    constructor(
        public start: Date,
        public foglalkozasok: Foglalkozas[] = [],
    ){
    }
}

export enum FoglalkozasType {
    Csapat,
    RajTerv,
    Raj,
    Orsi,
}

export class Foglalkozas {

    constructor(
        public readonly type: FoglalkozasType,
        public duration = 15,
    ) {
    }
}

export class CsapatFoglalkozas extends Foglalkozas {

    constructor(
        public leiras = "",
        duration = 15,
    ) {
        super(FoglalkozasType.Csapat, duration)
    }
}


export class RajTerv extends Foglalkozas {

    constructor(
        public foglalkozasok: Foglalkozas[] = [],
        maxDuration = 15,
    ) {
        super(FoglalkozasType.RajTerv, maxDuration)
    }
}

export class RajFoglalkozas extends Foglalkozas {

    constructor(
        public leiras = "",
        duration = 15,
    ) {
        super(FoglalkozasType.Raj, duration)
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
        duration = 15,
    ) {
        super(FoglalkozasType.Orsi, duration)
        this.setPontok(Alprobak.AlapCserkesztudas.pontok)
    }

    setPontok(pontok: Pont[]) {
        this.pontSelection.clear()
        pontok.forEach((pont) => this.pontSelection.set(pont, false))
    }
}
