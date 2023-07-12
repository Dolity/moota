import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';



import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';

import {SplitterModule} from 'primeng/splitter';
import {ImageModule} from 'primeng/image';

import {CardModule} from 'primeng/card';

import {TableModule} from 'primeng/table';

import { CommonModule } from '@angular/common';
import { TimeComponent } from './time/time.component';

import {PaginatorModule} from 'primeng/paginator';


import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {AccordionModule} from 'primeng/accordion';
import {ToastModule} from 'primeng/toast';
import {TabViewModule} from 'primeng/tabview';

import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';

import { FinalComponent } from './final/final.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    OrderComponent,
    TimeComponent,
    FinalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DataViewModule,
    HttpClientModule,
    ImageModule,
    PanelModule,
    BrowserAnimationsModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    FormsModule,

    PaginatorModule,
    CommonModule,
    TableModule,
    CardModule,
    SplitterModule,
    ConfirmDialogModule,
    AccordionModule,
    ToastModule,
    TabViewModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
