import { Injectable } from '@angular/core'
import { Alproba, Cserkesz, filterUid, Proba, Tema } from '../models/proba'
import { first } from '../utils'
import { Alprobak, Cserkeszek, Probak, Temak } from './rendszer'

@Injectable({
    providedIn: 'root'
})
export class ProbaRendszerService {

    getCserkesz(uid: string): Cserkesz {
        return filterUid(Cserkeszek, uid)
    }

    getCserkeszek(): Cserkesz[] {
        return Cserkeszek
    }

    getCserkeszByAge(age: number): Cserkesz {
        return first(Cserkeszek.filter(cs => cs.startAge <= age && age <= cs.endAge))
    }

    getProba(uid: string): Proba {
        return filterUid(Probak, uid)
    }

    getProbakForCserkesz(cserkeszUid: string): Proba[] {
        return Probak.filter(proba => proba.cserkeszUid === cserkeszUid)
    }

    getTema(uid: string): Tema {
        return filterUid(Temak, uid)
    }

    getTemak(): Tema[] {
        return Temak
    }

    getAlproba(uid: string): Alproba {
        return filterUid(Alprobak, uid)
    }

    getAlprobak(probaUid: string, temaUid: string): Alproba[] {
        return Alprobak
            .filter(alproba => alproba.probaUid === probaUid)
            .filter(alproba => alproba.temaUid === temaUid)
    }
}
