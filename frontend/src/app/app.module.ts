import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ItemsComponent } from './pages/items/items.component';
import { AddDataComponent } from './shared/components/add-data/add-data.component';
import { ItemComponent } from './shared/components/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemsComponent,
    AddDataComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
