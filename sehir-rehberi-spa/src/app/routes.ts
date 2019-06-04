import { CityComponent } from './city/city.component';
import { ValueComponent } from './value/value.component';
import {Routes} from "@angular/router";//
import { CityDetailComponent } from './city/city-detail/city-detail.component';
import { CityAddComponent } from './city/city-add/city-add.component';
import { RegisterComponent } from './register/register.component';

export const appRoutes:Routes =[
    {path:"city", component:CityComponent},
    {path:"cityadd", component:CityAddComponent},
    {path:"value", component:ValueComponent},
    {path:"register", component:RegisterComponent},
    {path:"cityDetail/:cityId", component:CityDetailComponent}, //route değeri göndermek için cityid örneğin
    {path:"**", redirectTo:"city",pathMatch:"full"}//general
];
