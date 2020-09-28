import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAuthorService {
  authors=[
    {
      "surname": "Пушкин",
      "name": "Александр",
      "middleName": "Сергеевич",
      "date": new Date(1799 ,4 ,26).toLocaleDateString(),
    },
    {
      "surname": "Лермонтов",
      "name": "Михаил",
      "middleName": "Юрьевич",
      "date": new Date (1814 ,10 ,15).toLocaleDateString(),
    }
  ];
  
  constructor() { }
  addAuthors(){
    localStorage.setItem("authors",JSON.stringify(this.authors))
  }
}
