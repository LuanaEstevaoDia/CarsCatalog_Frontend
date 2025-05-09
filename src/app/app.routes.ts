import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/layout/login/login.component';
import { PrimaryComponent } from './components/layout/primary/primary.component';
import { CarslistComponent } from './components/cars/carslist/carslist.component';
import { CarsdetailsComponent } from './components/cars/carsdetails/carsdetails.component';
import { MakelistComponent } from './components/make/makelist/makelist.component';
import { MakedetailsComponent } from './components/make/makedetails/makedetails.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {path: "", redirectTo: "login", pathMatch: 'full'},
    {path: "login", component:LoginComponent},
    
    {path: "admin", component:PrimaryComponent, children: [
       {path:"carros", component:CarslistComponent},
       {path:"carros/new", component:CarsdetailsComponent},
       {path:"carros/edit/:id", component:CarsdetailsComponent},

       {path:"marcas", component:MakelistComponent},
       {path:"marcas/new", component:MakedetailsComponent},
       {path:"marcas/edit/:id", component:MakedetailsComponent},
    ]},




];
