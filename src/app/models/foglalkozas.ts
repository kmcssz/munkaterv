import { Alprobak, Cserkeszek, Probak, Temak } from "./rendszer"
import { Pont } from "./proba"
import { dayInMillis } from "../date-adaptor"
import { Csoport, CsoportType } from "./csapat"

export interface Munkaterv {
    start: number,
    csapatTerv: number,
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

export interface Foglalkozas {
    id: number,
    type: string,
    csoport: string,
    duration: number,
    program?: string,
}

export interface Terv extends Foglalkozas {
    foglalkozasok: number[],
}

export interface OrsiFoglalkozas extends Foglalkozas {
    age: number,
    cserkesz: string,
    proba: string,
    tema: string,
    alproba: string,
    pontok: string[],
}

export function createFoglalkozas(
    type: FoglalkozasType,
    csoport: string,
    duration: number = 15,
): Foglalkozas {
    return {
        id: Date.now(),
        type,
        duration,
        csoport,
    }
}

export function createTerv(
    type: FoglalkozasType,
    csoport: string,
    duration: number = 120,
): Terv {
    return {
        id: Date.now(),
        type,
        csoport,
        duration,
        foglalkozasok: [],
    }
}
