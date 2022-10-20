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
        stateService: StateService,
    ) {
        stateService.asObservable().subscribe(state => {
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
            ['foglalkozas-background-color', '#353535'],
            ['foglalkozas-text-color', 'white'],
        ])
    ],
    [
        Theme.Light, new Map<string, string>([
            ['page-background-color', 'wheat'],
            ['page-text-color', 'black'],
            ['foglalkozas-background-color', '#A1A1A1'],
            ['foglalkozas-text-color', 'black'],
        ])
    ],
])
