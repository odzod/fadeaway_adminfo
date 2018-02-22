import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
// import { InfosComponent} from "./infos/infos.component";
import {InfosListComponent} from './infos_list/infos_list.component';
import {InfosEditComponent} from "./infos_edit/infos_edit.component";

const routes: Routes = [
    {path: '', component: InfosListComponent},
     { path: 'edit/:id', component: InfosEditComponent },
    // { path: 'news/:id', component: InfosComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}