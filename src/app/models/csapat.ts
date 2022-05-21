
export enum Rang {
    CserkeszTiszt,
    SegedTiszt,
    OrsVezeto,
}

export class Szemszog {

    constructor(
        public readonly csoport: Csoport,
    ) {
    }
}


export enum Korosztaj {
    AproCserkesz = "#add8e6",
    KisCserkesz = "#0000ff",
    Cserkesz = "#008900",
    Rover = "#9a9a9a",
    Felnot = "#571616",
}

export enum CsoportType {
    Csapat,
    Raj,
    Ors,
}

export class Csoport {

    constructor(
        public readonly type: CsoportType,
        public readonly name: string,
        public readonly emoji: string,
    ) {
    }
}

export class Csapat extends Csoport {

    readonly logoUri: string

    constructor(
        name: string,
        emoji: string = "🧑‍🤝‍🧑",
        public readonly rajok: Raj[] = [],
    ) {
        super(CsoportType.Csapat, name, emoji)
        this.logoUri = `assets/csapatok/${name}.png`
    }
}

export class Raj extends Csoport {

    constructor(
        name: string,
        emoji: string,
        public readonly korosztaj: Korosztaj,
        public readonly orsok: Ors[] = [],
    ) {
        super(CsoportType.Raj, name, emoji)
    }
}

export class Ors extends Csoport {

    constructor(
        name: string,
        emoji: string,
    ) {
        super(CsoportType.Ors, name, emoji)
    }
}
