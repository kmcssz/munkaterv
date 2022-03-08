
export enum Rang {
    CserkeszTiszt,
    SegedTiszt,
    OrsVezeto,
}

export class Csapat {

    logoUri: string

    constructor(
        public name: string,
        public rajok: Raj[] = [],
    ) {
        this.logoUri = `assets/csapatok/${name}.png`
    }
}

export enum Korosztaj {
    AproCserkesz = "#add8e6",
    KisCserkesz = "#0000ff",
    Cserkesz = "#008900",
    Rover = "#9a9a9a",
    Felnot = "#571616",
}

export class Raj {
    constructor(
        public name: string,
        public korosztaj: Korosztaj,
        public orsok: Ors[] = [],
    ) {
    }
}

export class Ors {
    constructor(
        public name: string,
        public emoji: string,
    ) {
    }
}
