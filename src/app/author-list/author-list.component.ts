import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {GetAuthorService} from '../shared/get-author.service';
import { NgForm } from '@angular/forms';
import { GetBookService } from '../shared/get-book.service';
@Component({
  selector: 'app-author-list',
  templateUrl: './author-list.component.html',
  styleUrls: ['./author-list.component.css']
})
export class AuthorListComponent implements OnInit {
  authors;
  searchBooks
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private getInfo: GetAuthorService,
    private book:GetBookService
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('authors')==null || localStorage.getItem('authors').length===2){
      this.getInfo.addAuthors()
    }
    this.authors=JSON.parse(localStorage.getItem('authors'))
  }
  showBook(author){
    this.router.navigate([author.name,author.surname],{relativeTo:this.activatedRoute})
  }
  addAuthor(formAuthor: NgForm) {
    let newAuthor = {
      name: formAuthor.controls.name.value,
      surname: formAuthor.controls.surname.value,
      middleName: formAuthor.controls.middleName.value,
      date: new Date(formAuthor.controls.date.value).toLocaleDateString(),
    }
    this.authors.push(newAuthor)
    localStorage.setItem('authors',JSON.stringify(this.authors))
    formAuthor.reset()
  }
  redactAuthor(formRedacAuthor: NgForm){
    this.authors.forEach(element => {
      if(`${element.name} ${element.surname}`==formRedacAuthor.controls.idAuthor.value){
        element.name=formRedacAuthor.controls.name.value;
        element.middleName=formRedacAuthor.controls.middleName.value;
        element.surname=formRedacAuthor.controls.surname.value;
        element.date=new Date(formRedacAuthor.controls.date.value).toLocaleDateString();
      }
    });
    localStorage.setItem('authors',JSON.stringify(this.authors))
    formRedacAuthor.reset()
  }
  delAuthor(formDelAuthor: NgForm){
    this.authors.forEach(element => {
      if(`${element.name} ${element.surname}`== formDelAuthor.controls.idAuthor.value){
        this.authors.splice(this.authors.indexOf(element), 1)
        this.getInfo.authors=this.authors
      }
    })
    localStorage.setItem('authors',JSON.stringify(this.authors))
    formDelAuthor.reset()
  }

  searchBook(formSearchBooklAuthor: NgForm){
    this.searchBooks=this.book.books.filter(element=>element.name.indexOf(formSearchBooklAuthor.controls.name.value)!=-1)
    formSearchBooklAuthor.reset()
  }
  delSearchBook(formSearchBooklAuthor: NgForm){
    this.searchBooks=[]
  }
}
