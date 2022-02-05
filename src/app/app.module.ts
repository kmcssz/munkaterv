import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatCardModule } from '@angular/material/card'
import {MatIconModule} from '@angular/material/icon'
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MunkatervComponent } from './munkaterv/munkaterv.component';
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
