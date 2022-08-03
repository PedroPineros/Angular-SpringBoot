import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
  styleUrls: ['./directiva.component.css']
})
export class DirectivaComponent implements OnInit {
  listaCurso: string[] = ['typescript', 'javascript', 'javaSE']
  stateText:string = 'Desabilitar';
  state:boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

  stateClick(){
    this.state= !this.state;
   this.stateText = this.state? "Desabilitar": "Habilitar";
  }
}
