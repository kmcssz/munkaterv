import { v4 as uuidv4 } from 'uuid'

export interface Esemeny {
    name: string,
    date: string,
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
    type: FoglalkozasType,
    csoport: string,
    duration: number,
    program?: string,
}

export interface Terv extends Foglalkozas {
    foglalkozasok: string[],
}

export interface CsapatTerv extends Terv {
    startTime: string
}

export interface ConcurrentTerv extends Terv {
    subtype: FoglalkozasType,
}

export interface OrsiFoglalkozas extends Foglalkozas {
    age: number,
    cserkeszUid: string,
    probaUid: string,
    temaUid: string,
    alprobaUid: string,
    pontok: ProbaPont[],
}

export interface ProbaPont {
    name: string,
    selected: boolean,
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

export function createConcurrentTervek(
    subtype: FoglalkozasType,
    csoport: string,
    duration: number,
): ConcurrentTerv {
    return {
        subtype,
        ...createTerv(FoglalkozasType.ConcurrentTervek, csoport, duration)
    }
}

export function createCsapatTerv(
    csoport: string,
    time: string,
): CsapatTerv {
    return {
        startTime: time,
        ...createTerv(FoglalkozasType.CsapatTerv, csoport, 0)
    }
}

export function buildDate(date: string, time?: string): Date {
    const [year, month, day] = date.split('-').map(part => parseInt(part))
    const [hour, minute] = (time ?? '13:00').split(':').map(part => parseInt(part))
    return new Date(year, month - 1, day, hour, minute)
}

export function getDatePart(date: Date): string {
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
}
