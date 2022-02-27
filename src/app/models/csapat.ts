
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
    APRO_CSERKESZ = "#add8e6",
    KIS_CSERKESZ = "#0000ff",
    CSERKESZ = "#008900",
    ROVER = "#9a9a9a",
    FELNOT = "#571616",
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
