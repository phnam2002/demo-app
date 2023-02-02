import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CndvListComponent } from './cndv-list/cndv-list.component';
import { CreateCndvComponent } from './create-cndv/create-cndv.component';
import { UpdateCndvComponent } from './update-cndv/update-cndv.component';

const routes: Routes = [
  { path: 'cndvs', component: CndvListComponent },
  { path: 'create-cndvs', component: CreateCndvComponent },
  { path: 'update-cndvs', component: UpdateCndvComponent },
  { path: '', redirectTo: '/cndvs', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
