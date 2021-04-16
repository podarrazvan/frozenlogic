import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
