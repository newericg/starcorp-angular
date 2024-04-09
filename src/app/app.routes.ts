import { Routes } from '@angular/router';
import { HomePageComponent } from './features/pages/home-page/home-page.component';
import { SignupPageComponent } from './features/pages/signup-page/signup-page.component';
import { EditPageComponent } from './features/pages/edit-page/edit-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'novapessoa', component: SignupPageComponent },
    { path: 'editar/:id', component: EditPageComponent }
];
