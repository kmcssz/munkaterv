
export enum Rang {
    CserkeszTiszt,
    SegedTiszt,
    OrsVezeto,
}

export enum Layout {
    Desktop,
    Mobile,
    Print,
}

export class Szemszog {

    constructor(
        public readonly csapat: Csapat,
        public readonly csoport: Csoport,
        public layout: Layout,
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
    Ors = 'Őrs',
}

export abstract class Csoport {

    constructor(
        public readonly type: CsoportType,
        public readonly name: string,
        public readonly icon: string,
    ) {
    }

    contains(csoport: Csoport): boolean {
        return this === csoport
    }

    getIconUri(): string {
        return `assets/csoportok/${this.icon}.png`
    }
}

export class Csapat extends Csoport {

    constructor(
        name: string,
        icon: string,
        public readonly rajok: Raj[] = [],
    ) {
        super(CsoportType.Csapat, name, icon)
    }

    override contains(csoport: Csoport): boolean {
        return super.contains(csoport) || this.rajok.some(raj => raj.contains(csoport))
    }
}

export class Raj extends Csoport {

    constructor(
        name: string,
        icon: string,
        public readonly korosztaj: Korosztaj,
        public readonly orsok: Ors[] = [],
    ) {
        super(CsoportType.Raj, name, icon)
    }

    override contains(csoport: Csoport): boolean {
        return super.contains(csoport) || this.orsok.some(ors => ors.contains(csoport))
    }
}

export class Ors extends Csoport {

    constructor(
        name: string,
        icon: string,
    ) {
        super(CsoportType.Ors, name, icon)
    }
}
