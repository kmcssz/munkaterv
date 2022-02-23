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
import { AngularEditorModule } from '@kolkov/angular-editor'
import { AppComponent } from './app.component'
import { MunkatervComponent } from './munkaterv/munkaterv.component'
import { OrsiProgramComponent } from './orsi-program/orsi-program.component';
import { RajProgramComponent } from './raj-program/raj-program.component';
import { CsapatProgramComponent } from './csapat-program/csapat-program.component'

@NgModule({
    declarations: [
        AppComponent,
        MunkatervComponent,
        OrsiProgramComponent,
        RajProgramComponent,
        CsapatProgramComponent
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
        OverlayModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
