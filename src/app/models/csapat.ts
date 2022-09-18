
export enum Rang {
    CserkeszTiszt,
    SegedTiszt,
    OrsVezeto,
}

export class Szemszog {

    constructor(
        public readonly csapat: Csapat,
        public readonly csoport: Csoport,
    ) {
    }
}

export function isCsapatSzemszog(szemszog: Szemszog): boolean {
    return szemszog.csoport.type === CsoportType.Csapat
}

export function isRajSzemszog(szemszog: Szemszog): boolean {
    return szemszog.csoport.type === CsoportType.Raj
}

export function isOrsSzemszog(szemszog: Szemszog): boolean {
    return szemszog.csoport.type === CsoportType.Ors
}


// export enum Korosztaj {
//     AproCserkesz = "#add8e6",
//     KisCserkesz = "#0000ff",
//     Cserkesz = "#008900",
//     Rover = "#9a9a9a",
//     Felnot = "#571616",
// }
export enum Korosztaj {
    AproCserkesz = 'AproCserkesz',
    KisCserkesz = 'KisCserkesz',
    Cserkesz = 'Cserkesz',
    Rover = 'Rover',
    Felnot = 'Felnot',
}

export enum CsoportType {
    Csapat = 'Csapat',
    Raj = 'Raj',
    Ors = 'Ors',
}

export abstract class Csoport {

    constructor(
        public readonly type: CsoportType,
        public readonly name: string,
        public readonly emoji: string,
    ) {
    }

    contains(csoport: Csoport): boolean {
        return this === csoport
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

    override contains(csoport: Csoport): boolean {
        return super.contains(csoport) || this.rajok.some(raj => raj.contains(csoport))
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

    override contains(csoport: Csoport): boolean {
        return super.contains(csoport) || this.orsok.some(ors => ors.contains(csoport))
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
