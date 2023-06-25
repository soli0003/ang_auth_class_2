import { NgModule } from '@angular/core';
import { RouterModule, Routes,  } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { ShowComponent } from './show/show.component';
import { LeftComponent } from './left/left.component';
import { RightComponent } from './right/right.component';
import { MidComponent } from './mid/mid.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { OrderHistoryComponent } from './order-history/order-history.component';


const routes: Routes = [
  {path:"navbar", component:NavbarComponent},
  {path:"show", component:ShowComponent},
  {path:"left", component:LeftComponent},
  {path:"right", component:RightComponent},
  {path:"home", component:MidComponent},
  {path:"footer", component:FooterComponent},
  {path:"login", component:LoginComponent},
  {path:"register", component:RegisterComponent},
  {path:"ordrHistory", component:OrderHistoryComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
