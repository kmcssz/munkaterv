import { Alprobak, Cserkeszek, Probak, Temak } from "./rendszer"
import { Pont } from "./proba"
import { dayInMillis } from "../date-adaptor"
import { Csoport, CsoportType } from "./csapat"

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
    CsapatTerv = 'CsapatTerv',
    RajTerv = 'RajTerv',
    OrsiTerv = 'OrsiTerv',
    CsapatFoglalkozas = 'CsapatFoglalkozas',
    RajFoglalkozas = 'RajFoglalkozas',
    OrsiFoglalkozas = 'OrsiFoglalkozas',
    ConcurrentTervek = 'ConcurrentTervek',
}

export abstract class Foglalkozas {

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

export class ConcurrentTervek extends Foglalkozas {

    constructor(
        duration: number,
        public tervek: Map<Csoport, Terv>
    ) {
        super(FoglalkozasType.ConcurrentTervek, duration)

        // Propagate the duration to all tervek
        tervek.forEach(terv => terv.duration = duration)
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
        duration = dayInMillis,
        foglalkozasok: Foglalkozas[] = [],
    ) {
        super(FoglalkozasType.CsapatTerv, duration, foglalkozasok)
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
