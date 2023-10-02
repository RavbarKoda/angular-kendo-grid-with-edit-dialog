import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  HttpClient,
  HttpClientModule,
  HttpClientJsonpModule,
} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { DialogModule } from '@progress/kendo-angular-dialog';
import { GridModule } from '@progress/kendo-angular-grid';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LabelModule } from '@progress/kendo-angular-label';

import { AppComponent } from './app.component';
import { GridEditFormComponent } from './edit-form.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EmlPredalMapaEditComponent } from './eml-predal-mapa-edit/eml-predal-mapa-edit.component';
import { EmlPredalEditComponent } from './eml-predal-edit/eml-predal-edit.component';
import { EmlPredalListComponent } from './eml-predal-list/eml-predal-list.component';

@NgModule({
  declarations: [
    GridEditFormComponent,
    AppComponent,
    EmlPredalMapaEditComponent,
    EmlPredalEditComponent,
    EmlPredalListComponent,
  ],
  imports: [
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GridModule,
    DialogModule,
    InputsModule,
    LabelModule,
    ButtonsModule,
  ],
  providers: [],
  bootstrap: [EmlPredalListComponent],
})
export class AppModule {}
