import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetGenreService {
  genreList=["Деловая литература","Детективы и Триллеры","Искусство","Компьютеры и Интернет"];
  constructor() { }
  addGenre(){
    localStorage.setItem("genre",JSON.stringify(this.genreList))
  }
}
