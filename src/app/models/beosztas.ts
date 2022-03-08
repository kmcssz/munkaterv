import { Csapat, Korosztaj, Ors, Raj } from "./csapat"

export const CSAPATOK = [
    new Csapat(
        "Montreal",
        [
            new Raj(
                "Katicabogár",
                Korosztaj.KisCserkesz,
                [
                    new Ors("Bagoly", "🦉"),
                    new Ors("Méhecske", "🐝"),
                ],
            ),
            new Raj(
                "Munkács",
                Korosztaj.Cserkesz,
                [
                    new Ors("Ibolya", "🌸"),
                    new Ors("Páva", "🦚"),
                ],
            ),
            new Raj(
                "Besztercebánya",
                Korosztaj.Cserkesz,
                [
                    new Ors("Róka", "🦊"),
                    new Ors("Kígyó", "🐍"),
                ],
            ),
        ],
    )
]
