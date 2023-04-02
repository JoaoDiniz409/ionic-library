import { Component } from '@angular/core';
import { HomeService } from './home.service';
import { Livros } from '../model/livros'; 
import { Observable, subscribeOn } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  serv: HomeService;
  livros = new Array<Livros>();
  id = -1;
  titulo = '';
  imagem = '';
  paginas = 0;
  data = new Date().toISOString();
  constructor(service: HomeService) {

    this.serv = service;

    service.getLivros().subscribe(response => this.livros = response);

  }

  getTitulo(titulo: Event) {
    let tValue = (titulo.target as HTMLInputElement)?.value ?? '' 
    this.titulo = tValue;
    
  }

  getImagem(imagem: Event) {
    let iValue = (imagem.target as HTMLInputElement)?.value ?? '' 
    this.imagem = iValue;
    
  }

  getPaginas(paginas: Event) {
    let pValue = (paginas.target as HTMLInputElement)?.value ?? 0 
    this.paginas = Number(pValue);
    
  }

  getData(data: Event) {
    let dValue = (data.target as HTMLInputElement)?.value ?? null 
    this.data = new Date(dValue).toISOString();
    
  }

  onClickSalvar() {

  let l = new Livros(this.id, this.titulo, this.imagem, this.paginas, this.data);

  if(this.id == -1){
    let proximoId = this.livros.length > 0 ? this.livros[this.livros.length-1].id +1 : 1;
    l.id = proximoId;
  
    this.serv.addLivro(l).subscribe(response =>{
      l=response;
      this.serv.getLivros().subscribe(response => (this.livros = response));
    });
  } else {
    this.serv.updadeLivro(this.id, l).subscribe(response => {
      l=response;
      this.serv.getLivros().subscribe(response => (this.livros = response));
    })
  }
  this.resetForm() 
  }

  onClickEditar(id: number) {
    let observableLivro = this.serv.getById(id)
    observableLivro.subscribe(response => {
      let livro = response;
      this.id = livro.id
      this.data = livro.data
      this.titulo = livro.titulo
      this.imagem = livro.imagem
      this.paginas = livro.paginas
    })
  }
   
  

  onClickDelete(id: number) {

    this.serv.deleteLivro(id).subscribe(response=>{
      this.serv.getLivros().subscribe(response => (this.livros = response));
    });
    
  }

  resetForm() {
    this.id = -1;
    this.titulo = '';
    this.imagem = '';
    this.paginas = 0;
    this.data = new Date().toISOString();
  }

  

}
