import { Injectable } from '@angular/core';
declare let alertify:any;
@Injectable({
  providedIn: 'root'
})
export class AlertifyService{

constructor() { }

success(message:String){
  alertify.success(message)
}

warning(message:String){
  alertify.warning(message)
}

error(message:String){
  alertify.error(message)
}
}
