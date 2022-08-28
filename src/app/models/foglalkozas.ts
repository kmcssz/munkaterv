import { v4 as uuidv4 } from 'uuid'

export interface Munkaterv {
    start: number,
    csapatTervUuid: string,
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
    uuid: string,
    type: string,
    csoport: string,
    duration: number,
    program?: string,
}

export interface Terv extends Foglalkozas {
    foglalkozasok: string[],
}

export interface OrsiFoglalkozas extends Foglalkozas {
    age: number,
    cserkeszUid: string,
    probaUid: string,
    temaUid: string,
    alprobaUid: string,
    pontok: string[],
}

export function createFoglalkozas(
    type: FoglalkozasType,
    csoport: string,
    duration: number = 15,
): Foglalkozas {
    return {
        uuid: uuidv4(),
        type,
        duration,
        csoport,
    }
}

export function createTerv(
    type: FoglalkozasType,
    csoport: string,
    duration: number,
): Terv {
    return {
        uuid: uuidv4(),
        type,
        csoport,
        duration,
        foglalkozasok: [],
    }
}
