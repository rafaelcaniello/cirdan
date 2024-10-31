import { Routes } from '@angular/router';
import { TicketsListComponent } from './pages/tickets-list/tickets-list.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tickets-list',
        pathMatch: 'full'
    },
    {
        path: 'tickets-list',
        component: TicketsListComponent
    }
];
