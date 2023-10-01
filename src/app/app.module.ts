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
import { EditService } from './edit.service';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { EmlPredalMapaEditComponent } from './eml-predal-mapa-edit/eml-predal-mapa-edit.component';

@NgModule({
  declarations: [
    GridEditFormComponent,
    AppComponent,
    EmlPredalMapaEditComponent,
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
  providers: [
    {
      deps: [HttpClient],
      provide: EditService,
      useFactory: (jsonp: HttpClient) => () => new EditService(jsonp),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
