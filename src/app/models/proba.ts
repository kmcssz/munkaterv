import { uuidv4 } from "@firebase/util"
import { filterComparator } from "../utils"

export interface Cserkesz {
    uid: string,
    name: string,
    startAge: number,
    endAge: number,
}

export interface Proba {
    uid: string,
    name: string,
    cserkeszUid: string,
}

export interface Tema {
    uid: string,
    name: string,
}

export interface Alproba {
    uid: string,
    name: string,
    probaUid: string,
    temaUid: string,
    pontok: string[],
}

type Rendszer = Cserkesz | Proba | Tema | Alproba
export function filterUid<T extends Rendszer>(array: T[], uid: string): T {
    return filterComparator<T>(
        array,
        elem => elem.uid === uid,
        `Missing ${uid} from ${array}`,
    )
}
