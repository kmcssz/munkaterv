import { Injectable } from '@angular/core'
import { Csapat, Csoport, Korosztaj, Ors, Raj } from '../models/csapat'

@Injectable({
    providedIn: 'root'
})
export class CsoportService {

    csapat = new Csapat(
        "Montreal",
        "⚜️",
        [
            new Raj(
                "Katicabogár",
                "🐞",
                Korosztaj.KisCserkesz,
                [
                    new Ors("Bagoly", "🦉"),
                    new Ors("Méhecske", "🐝"),
                ],
            ),
            new Raj(
                "Munkács",
                "🏰",
                Korosztaj.Cserkesz,
                [
                    new Ors("Ibolya", "🌸"),
                    new Ors("Páva", "🦚"),
                ],
            ),
            new Raj(
                "Besztercebánya",
                "⚒️",
                Korosztaj.Cserkesz,
                [
                    new Ors("Róka", "🦊"),
                    new Ors("Kígyó", "🐍"),
                ],
            ),
        ],
    )

    constructor() { }

    getCsoport(name: string): Csoport {
        if (this.csapat.name === name) {
            return this.csapat
        }

        const foundRaj = this.csapat.rajok.filter(raj => raj.name === name)
        if (foundRaj.length !== 0) {
            return foundRaj[0]
        }

        const foundOrs = this.csapat.rajok.flatMap(raj => raj.orsok).filter(ors => ors.name === name)
        if (foundOrs.length !== 0) {
            return foundOrs[0]
        }
        throw Error(`Unable to find csoport ${name}`)
    }

    getCsapat(): Csapat {
        //const name = this.route.snapshot.paramMap.get('name')!
        return this.csapat
    }
}
