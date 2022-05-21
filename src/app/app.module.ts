import { DragDropModule } from '@angular/cdk/drag-drop'
import { OverlayModule } from '@angular/cdk/overlay'
import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MatButtonModule } from '@angular/material/button'
import { MatButtonToggleModule } from '@angular/material/button-toggle'
import { MatCardModule } from '@angular/material/card'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatListModule } from '@angular/material/list'
import { MatSelectModule } from '@angular/material/select'
import { MatSliderModule } from '@angular/material/slider'
import { MatTooltipModule } from '@angular/material/tooltip'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS } from '@angular/material/core';
import { AngularEditorModule } from '@kolkov/angular-editor'
import { MatDialogModule } from '@angular/material/dialog'

import { AppComponent } from './app.component'
import { CsapatTervComponent } from './tervek/csapat-terv/csapat-terv.component'
import { OrsiFoglalkozasComponent } from './foglalkozasok/orsi-foglalkozas/orsi-foglalkozas.component'
import { RajFoglalkozasComponent } from './foglalkozasok/raj-foglalkozas/raj-foglalkozas.component'
import { CsapatFoglalkozasComponent } from './foglalkozasok/csapat-foglalkozas/csapat-foglalkozas.component'
import { CsapatSelectionComponent } from './csapat-selection/csapat-selection.component'
import { AppRoutingModule } from './app-routing.module';
import { CsapatNaptarComponent, NewMunkatervDialog } from './csapat-naptar/csapat-naptar.component'
import { APP_DATE_FORMATS, MagyarDateAdapter } from './date-adaptor';
import { FoglalkozasComponent } from './foglalkozasok/foglalkozas/foglalkozas.component';
import { EditorWrapperComponent } from './editor-wrapper/editor-wrapper.component'
import { RajTervComponent } from './tervek/raj-terv/raj-terv.component'

@NgModule({
    declarations: [
        AppComponent,
        EditorWrapperComponent,
        CsapatTervComponent,
        OrsiFoglalkozasComponent,
        RajFoglalkozasComponent,
        CsapatFoglalkozasComponent,
        CsapatSelectionComponent,
        CsapatNaptarComponent,
        NewMunkatervDialog,
        FoglalkozasComponent,
        RajTervComponent,
    ],
    imports: [
        AngularEditorModule,
        BrowserAnimationsModule,
        BrowserModule,
        DragDropModule,
        FormsModule,
        HttpClientModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatCardModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatSelectModule,
        MatSliderModule,
        MatTooltipModule,
        MatDatepickerModule,
        MatNativeDateModule,
        OverlayModule,
        AppRoutingModule,
        MatDialogModule,
    ],
    providers: [
        { provide: DateAdapter, useClass: MagyarDateAdapter },
        { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
