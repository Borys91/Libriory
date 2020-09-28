import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetBookService } from '../shared/get-book.service';
import { GetGenreService } from '../shared/get-genre.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  authorBook
  authorName
  genreList
  constructor(
    private book:GetBookService,
    private genre:GetGenreService,
    private activatedRoute: ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('books')==null || localStorage.getItem('books').length===2){
      this.book.createBook();
    }
    
    this.book.books=JSON.parse(localStorage.getItem('books'));
    this.activatedRoute.params.forEach(element=>{
      this.authorBook=this.book.findBook(element.name);
      this.authorName=element.name;
    })
      
    if(localStorage.getItem('genre')==null || localStorage.getItem('genre').length===2){
      this.genre.addGenre()
    }
    this.genreList=JSON.parse(localStorage.getItem('genre'))
  }

  addBook(formBook:NgForm){
    let newBook={
      name:formBook.controls.name.value,
      numberOfPages:formBook.controls.numberOfPages.value,
      genre:formBook.controls.genre.value,
      author:this.authorName
    }
    this.authorBook.push(newBook)
    this.book.books.push(newBook)
    localStorage.setItem('books',JSON.stringify(this.book.books))
    formBook.reset()
  }
  redactBook(formRedactBook:NgForm){
    this.book.books.forEach(element => {
      if(`${element.name}`==formRedactBook.controls.idBook.value){
        element.name=formRedactBook.controls.name.value;
        element.numberOfPages=formRedactBook.controls.numberOfPages.value;
        element.genre=formRedactBook.controls.genre.value;
      }
    });
    this.authorBook.forEach(element => {
      if(`${element.name}`==formRedactBook.controls.idBook.value){
        element.name=formRedactBook.controls.name.value;
        element.numberOfPages=formRedactBook.controls.numberOfPages.value;
        element.genre=formRedactBook.controls.genre.value;
      }
    });
    localStorage.setItem('books',JSON.stringify(this.book.books));
    formRedactBook.reset();
  }

  delBook(formDelBook:NgForm){
    this.authorBook.forEach(element => {
      if(`${element.name}`== formDelBook.controls.idBook.value){
        this.book.books.filter(el=>{
          if(el.name==element.name){
              this.book.books.splice(this.book.books.indexOf(el),1);
              let index= this.authorBook.findIndex(item=>{
                return el.name==item.name
                })
                console.log(index)
                this.authorBook.splice(index,1)
                console.log(this.authorBook)
          }
        })
    }
  })
  localStorage.setItem('books',JSON.stringify(this.book.books))
  }

  redactGenre(formRedactGenre:NgForm){
    this.genreList.push(formRedactGenre.controls.name.value)
    localStorage.setItem('genre',JSON.stringify(this.genreList))
    formRedactGenre.reset()
  }

  goBack(){
    this.router.navigate(["../.."],{relativeTo:this.activatedRoute})
  }
}


