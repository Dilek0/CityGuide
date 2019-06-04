import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../models/City';
import { Photo } from '../models/Photo';
import { AlertifyService } from './alertify.service';
import {Router} from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class CityService {
//api ye bağlanabilmek için httpclient kullandık
constructor(
              private httpClient:HttpClient,
              private alertifyService:AlertifyService,
              private router:Router) { }

//servisin adresidir
path = "https://localhost:44335/api/";

getCities():Observable<City[]>{
  return this.httpClient.get<City[]>(this.path+"cities"); //https://localhost:44335/api/cities
}

//şehirin detail bilgilerini getirmek için
getCityById(cityId):Observable<City>{
  return this.httpClient.get<City>(this.path+"cities/detail/?id="+cityId);
}

//şehrin fotolarını getirmek için
getPhotosByCity(cityId):Observable<Photo[]>{
  //gelen data yı photo[] arrayine döndür
  return this.httpClient.get<Photo[]>(this.path+"cities/photos/?cityId="+cityId);
}

add(city){
  this.httpClient.post(this.path+"cities/add",city).subscribe(data=>{
    this.alertifyService.success("City added with successfully.")
    this.router.navigateByUrl('/cityDetail/'+data["id"])
  });
}
}
