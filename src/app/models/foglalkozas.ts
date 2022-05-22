import { Alprobak, Cserkeszek, Probak, Temak } from "./rendszer"
import { Pont } from "./proba"
import { dayInMillis } from "../date-adaptor"

export class Esemeny {

    constructor(
        public start: Date,
    ){
    }
}

export class Munkaterv extends Esemeny {

    constructor(
        start: Date,
        public csapatTerv: CsapatTerv,
    ){
        super(start)
    }
}

export enum FoglalkozasType {
    CsapatTerv,
    RajTerv,
    OrsiTerv,
    CsapatFoglalkozas,
    RajFoglalkozas,
    OrsiFoglalkozas,
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
        super(FoglalkozasType.CsapatFoglalkozas, duration)
    }
}

export abstract class Terv extends Foglalkozas {

    constructor(
        type: FoglalkozasType,
        duration: number,
        public foglalkozasok: Foglalkozas[],
    ) {
        super(type, duration)
    }

    computeRemainingDuration(): number {
        let totalDuration = 0
        this.foglalkozasok.forEach(foglalkozas => {
            totalDuration += foglalkozas.duration
        })
        return this.duration - totalDuration
    }
}

export class CsapatTerv extends Terv {

    constructor(
        foglalkozasok: Foglalkozas[] = [],
    ) {
        super(FoglalkozasType.CsapatTerv, dayInMillis, foglalkozasok)
    }
}

export class RajTerv extends Terv {

    constructor(
        duration = 90,
        foglalkozasok: Foglalkozas[] = [],
    ) {
        super(FoglalkozasType.RajTerv, duration, foglalkozasok)
    }
}

export class OrsiTerv extends Terv {

    constructor(
        duration = 90,
        foglalkozasok: Foglalkozas[] = [],
    ) {
        super(FoglalkozasType.OrsiTerv, duration, foglalkozasok)
    }
}

export class RajFoglalkozas extends Foglalkozas {

    constructor(
        public leiras = "",
        duration = 15,
    ) {
        super(FoglalkozasType.RajFoglalkozas, duration)
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
        super(FoglalkozasType.OrsiFoglalkozas, duration)
        this.setPontok(Alprobak.AlapCserkesztudas.pontok)
    }

    setPontok(pontok: Pont[]) {
        this.pontSelection.clear()
        pontok.forEach((pont) => this.pontSelection.set(pont, false))
    }
}
