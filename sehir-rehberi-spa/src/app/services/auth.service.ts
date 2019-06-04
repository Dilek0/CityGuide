import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/LoginUser';
import {JwtHelper, tokenNotExpired} from 'angular2-jwt';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { RegisterUser } from '../models/RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

constructor(private httpClient:HttpClient, private router:Router, private alertifyService:AlertifyService) { }
path = "https://localhost:44335/api/auth/";
userToken:any;
decodedToken:any;
jwtHelper:JwtHelper=new JwtHelper();
TOKEN_KEY = "token"

login(loginUser:LoginUser){
  let headers=new HttpHeaders();
  headers =headers.append("Content-Type", "application/json")
  this.httpClient.post(this.path+"login",loginUser,{headers:headers}).subscribe(data=>{
    this.saveToken(data)
    this.userToken = data
    this.decodedToken = this.jwtHelper.decodeToken(data.toString())
    this.alertifyService.success("Login is successful")
    this.router.navigateByUrl('/city')
  })
}

register(registerUser:RegisterUser){
  let headers=new HttpHeaders();
  headers =headers.append("Content-Type", "application/json")
  this.httpClient.post(this.path+"register",registerUser,{headers:headers}).subscribe(data=>{

  });
}

saveToken(token){
  localStorage.setItem(this.TOKEN_KEY,token)
}

logOut(){
  localStorage.removeItem(this.TOKEN_KEY)
  this.alertifyService.success("Logout is successful")
}

loggedIn(){
  return tokenNotExpired(this.TOKEN_KEY)
}

get token(){
  return localStorage.getItem(this.TOKEN_KEY)
}

getCurrentUserId(){
  return this.jwtHelper.decodeToken(this.token).nameid
}
}
