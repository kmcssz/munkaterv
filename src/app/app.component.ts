import { Component, ViewEncapsulation } from '@angular/core'
import { Theme } from './models/state'
import { StateService } from './services/state.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
    title = 'munkaterv';

    constructor(
        state: StateService,
    ) {
        state.asObservable().subscribe(state => {
            themeColors.get(state.theme)
                ?.forEach((color, property) => {
                    document.documentElement.style.setProperty(
                        '--' + property,
                        color,
                    )
                })
        })
    }
}

const themeColors = new Map<Theme, Map<string, string>>([
    [
        Theme.Dark, new Map<string, string>([
            ['page-background-color', '#202020'],
            ['page-text-color', '#A1A1A1'],
            ['orsi-terv-background-color', '#4a4a4a'],
            ['orsi-foglalkozas-background-color', '#353535'],
            ['raj-foglalkozas-background-color', '#4a4a4a'],
            ['raj-terv-background-color', '#353535'],
            ['csapat-foglalkozas-background-color', '#353535'],
            ['all-foglalkozas-text-color', '#e0dfdf'],
            ['all-foglalkozas-time-color', '#A1A1A1'],
        ])
    ],
    [
        Theme.Light, new Map<string, string>([
            ['page-background-color', 'wheat'],
            ['page-text-color', 'grey'],
            ['orsi-terv-background-color', '#edcca1'],
            ['orsi-foglalkozas-background-color', 'tan'],
            ['raj-foglalkozas-background-color', '#edcca1'],
            ['raj-terv-background-color', 'tan'],
            ['csapat-foglalkozas-background-color', 'tan'],
            ['all-foglalkozas-text-color', '#313131'],
            ['all-foglalkozas-time-color', 'grey'],
        ])
    ],
    [
        Theme.Print, new Map<string, string>([
            ['page-background-color', 'white'],
            ['page-text-color', 'grey'],
            ['orsi-terv-background-color', '#edcca1'],
            ['orsi-foglalkozas-background-color', 'tan'],
            ['raj-foglalkozas-background-color', '#edcca1'],
            ['raj-terv-background-color', 'tan'],
            ['csapat-foglalkozas-background-color', 'tan'],
            ['all-foglalkozas-text-color', '#313131'],
            ['all-foglalkozas-time-color', 'grey'],
        ])
    ],
])
