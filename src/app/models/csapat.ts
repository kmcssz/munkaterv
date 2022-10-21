
export enum Rang {
    CserkeszTiszt,
    SegedTiszt,
    OrsVezeto,
}

export function isCsapatSzemszog(csoport: Csoport): boolean {
    return csoport.type === CsoportType.Csapat
}

export function isRajSzemszog(csoport: Csoport): boolean {
    return csoport.type === CsoportType.Raj
}

export function isOrsSzemszog(csoport: Csoport): boolean {
    return csoport.type === CsoportType.Ors
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

    find(name: string): Csoport | undefined {
        if (this.name === name) {
            return this
        }
        return undefined
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

    override find(name: string): Csoport | undefined {
        for (let raj of this.rajok) {
            const csoport = raj.find(name)
            if (csoport !== undefined) {
                return csoport
            }
        }
        return super.find(name)
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

    override find(name: string): Csoport | undefined {
        for (let ors of this.orsok) {
            const csoport = ors.find(name)
            if (csoport !== undefined) {
                return csoport
            }
        }
        return super.find(name)
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
