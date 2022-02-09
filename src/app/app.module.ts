import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { BrowserModule } from '@angular/platform-browser'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatSliderModule } from '@angular/material/slider'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatTooltipModule } from '@angular/material/tooltip'
import { OverlayModule } from '@angular/cdk/overlay'

import { AppComponent } from './app.component'
import { MunkatervComponent } from './munkaterv/munkaterv.component'
import { ProgramComponent } from './program/program.component'

@NgModule({
    declarations: [
        AppComponent,
        MunkatervComponent,
        ProgramComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        DragDropModule,
        MatCardModule,
        MatIconModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatSliderModule,
        MatButtonToggleModule,
        MatTooltipModule,
        OverlayModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
