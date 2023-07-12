import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { OrderComponent } from './order/order.component';
import { FinalComponent } from './final/final.component';


const routes: Routes = [

  {path: '', component: MenuComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'order', component: OrderComponent},
  {path: 'final', component: FinalComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
