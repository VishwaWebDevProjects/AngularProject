import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisplayTableComponent } from './display-table/display-table.component';
import { AddPigFormComponent } from './add-pig-form/add-pig-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PigComponent } from './pig/pig.component';
import { PigMapComponent } from './pig-map/pig-map.component';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MoreInfoDialogComponent } from './more-info-dialog/more-info-dialog.component'

@NgModule({
  declarations: [
    AppComponent,
    DisplayTableComponent,
    AddPigFormComponent,
    PigComponent,
    PigMapComponent,
    DialogComponent,
    MoreInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
  ],
  providers: [DisplayTableComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
