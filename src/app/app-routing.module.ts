import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CsapatSelectionComponent } from './csapat-selection/csapat-selection.component'
import { CsapatTervComponent } from './csapat-terv/csapat-terv.component'

const routes: Routes = [
    { path: 'csapat/:name', component: CsapatTervComponent },
    { path: '', component: CsapatSelectionComponent },
]

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
