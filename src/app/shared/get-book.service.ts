import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetBookService {
  books=[
    { name: "книга1", numberOfPages: 100, genre: "Деловая литература" , author:"Александр"},
    { name: "книга2", numberOfPages: 120, genre: "Детективы и Триллеры" , author:"Александр"},
    { name: "книга3", numberOfPages: 130, genre: "Искусство" , author:"Михаил"},
    { name: "книга4", numberOfPages: 140, genre: "Компьютеры и Интернет" , author:"Михаил"},
  ]
  constructor() { }

  createBook(){
    localStorage.setItem("books",JSON.stringify(this.books))
  }
  
  // findBook(author) {
  //    return  this.books.filter(elem=>{
  //      if(elem.author==author){
  //       //  console.log(elem)
  //        return elem
  //      }
  //    })
  //   }
  findBook(author) {
     return  JSON.parse(localStorage.getItem('books')).filter(elem=>{
       if(elem.author==author){
        //  console.log(elem)
         return elem
       }
     })
    }
}
   