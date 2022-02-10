
export class Proba {

    public readonly imageUri: string

    constructor(
        public readonly startAge: number,
        public readonly endAge: number,
        public readonly cserkesz: string,
        public readonly name: string,
        imageFileName: string,
    ) {
        this.imageUri = `assets/proba-jelvenyek/${imageFileName}.png`
    }
}

export class Tema {

    constructor(
        public readonly name: string,
        public readonly emoji: string,
    ) {
    }
}

export class Alproba {

    constructor(
        public readonly name: string,
        public readonly pontok: string[],
    ) {
    }
}

// function pascalCase(str: string): string {
//     return str.replace(
//         /(\w)(\w*)/g,
//         function(g0,g1,g2){
//             return g1.toUpperCase() + g2.toLowerCase();
//         }
//     )
// }
