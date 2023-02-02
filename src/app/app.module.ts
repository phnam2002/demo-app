import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CndvListComponent } from './cndv-list/cndv-list.component';
import { CreateCndvComponent } from './create-cndv/create-cndv.component';
import { FormsModule, NgSelectOption } from '@angular/forms';
import { UpdateCndvComponent } from './update-cndv/update-cndv.component';
import { NgSelectModule } from '@ng-select/ng-select';
@NgModule({
  declarations: [
    AppComponent,
    CndvListComponent,
    CreateCndvComponent,
    UpdateCndvComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
