export class Livros {
    id: number;
    titulo: string;
    imagem: string;
    paginas: number;
    data: string;
  
    constructor(id:number, titulo:string, imagem: string, paginas: number, data: string) {
        this.id = id;
        this.titulo = titulo;
        this.imagem = imagem;
        this.paginas = paginas;
        this.data = data;
    }
}