import { Routes } from '@angular/router';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { HelpCenterComponent } from '../help/help-center.component';

export const INFO_ROUTES: Routes = [
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'help', component: HelpCenterComponent },
]; 