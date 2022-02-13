
export class Cserkesz {

    constructor(
        public readonly name: string,
        public readonly startAge: number,
        public readonly endAge: number,
    ) {
    }
}

export class Proba {

    public readonly imageUri: string

    constructor(
        public readonly name: string,
        imageFileName: string,
    ) {
        this.imageUri = `assets/proba-jelvenyek/${imageFileName}.png`
    }
}

export class Tema {

    constructor(
        public readonly name: string,
        public readonly emoji: string,
    ) {
    }
}

export class Alproba {

    constructor(
        public readonly name: string,
        public readonly pontok: Pont[],
    ) {
    }
}

export class Pont {

    constructor(
        public readonly name: string,
    ) {
    }
}
