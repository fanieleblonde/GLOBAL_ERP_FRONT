import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NopageFoundComponent} from "./nopage-found/nopage-found.component";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {PagesRoutingModule} from "./pages/pages-routing.module";

const routes: Routes = [
  //{ path: '', component: AdashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NopageFoundComponent },
  //{ path: 'get/user/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  //{ path: 'meetings', component: MeetingComponent, loadChildren: () => import("./meeting/meeting.module").then(m => m.MeetingModule) },


];

@NgModule({
  imports: [RouterModule.forRoot(routes),
  AuthRoutingModule, PagesRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = []

