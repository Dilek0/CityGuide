import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router'; //route değerini çekmek için
import { CityService } from 'src/app/services/city.service';
import { City } from 'src/app/models/City';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Photo } from 'src/app/models/Photo';
@Component({
  selector: 'app-city-detail',
  templateUrl: './city-detail.component.html',
  styleUrls: ['./city-detail.component.css'],
  providers:[CityService] //city servisini kullanacağımız için 
})
export class CityDetailComponent implements OnInit {
 
  constructor(private aktivatedRoute:ActivatedRoute, private cityService:CityService) { }

  city:City;
  photos : Photo[]=[];
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  ngOnInit() {
    //getCityById ve getPhotosByCity fonk. city id gönderilmesi lazım
    this.aktivatedRoute.params.subscribe(params=>{
      this.getCityById(params["cityId"])
    })
  }

  getCityById(cityId){
    this.cityService.getCityById(cityId).subscribe(data=>{
      this.city =data;
    })
  }

  getPhotosByCity(cityId){
    this.cityService.getPhotosByCity(cityId).subscribe(data=>{
      this.photos=data;
      this.setGallery();
    })
  }

  //this.galleryImages için
  getImages(){
    const imageUrl=[]
    //tüm fotoların her birini gez
    for(let i=0 ; i<this.city.photos.length;i++){
      imageUrl.push({
        small:this.city.photos[i].url,
        medium:this.city.photos[i].url,
        big:this.city.photos[i].url
      })
    }
    return imageUrl
  }
  setGallery(){
    this.galleryOptions = [
      {
          width: '100%',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];

  this.galleryImages = this.getImages()
  // [
  //     {
  //         small: 'assets/1-small.jpg',
  //         medium: 'assets/1-medium.jpg',
  //         big: 'assets/1-big.jpg'
  //     },
  //     {
  //         small: 'assets/2-small.jpg',
  //         medium: 'assets/2-medium.jpg',
  //         big: 'assets/2-big.jpg'
  //     },
  //     {
  //         small: 'assets/3-small.jpg',
  //         medium: 'assets/3-medium.jpg',
  //         big: 'assets/3-big.jpg'
  //     }
  // ];
  }
}
