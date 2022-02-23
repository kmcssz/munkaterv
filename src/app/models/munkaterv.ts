import { Time } from "@angular/common"
import { Alprobak, Cserkeszek, Probak, Temak } from "./rendszer"
import { Pont } from "./proba"

class Munkaterv {

    constructor(
        public startTime: Time,
    ){
    }
}

export enum ProgramType {
    CSAPAT,
    RAJ,
    ORS,
}

export class Program {

    constructor(
        public readonly type: ProgramType,
        public duration = 15,
    ){
    }
}

export class CsapatProgram extends Program {

    constructor(
        public leiras = "",
    ) {
        super(ProgramType.CSAPAT)
    }
}

export class RajProgram extends Program {

    constructor(
        public leiras = "",
    ) {
        super(ProgramType.RAJ)
    }
}

export class OrsiProgram extends Program {

    constructor(
        public age = 10,
        public cserkesz = Cserkeszek.Ujonc,
        public proba = Probak.MagyarCimer,
        public tema = Temak.Cserkeszismeretek,
        public alproba = Alprobak.AlapCserkesztudas,
        public pontSelection = new Map<Pont, boolean>(),
        public leiras = "",
    ) {
        super(ProgramType.ORS)
        this.setPontok(Alprobak.AlapCserkesztudas.pontok)
    }

    setPontok(pontok: Pont[]) {
        this.pontSelection.clear()
        pontok.forEach((pont) => this.pontSelection.set(pont, false))
    }
}
