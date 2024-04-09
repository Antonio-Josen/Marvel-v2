import { Routes } from '@angular/router';
import { MarvelListComponent } from './Comics/comics/comics.component';
import { HomeComponent } from './Components/home/home.component';

export const routes: Routes = [
    { path: 'comics', component: MarvelListComponent },
    { path: '**', component: HomeComponent }
];
