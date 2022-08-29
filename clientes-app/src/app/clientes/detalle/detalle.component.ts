import {Component, Input, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ModalService} from "./modal.service";
import Swal from "sweetalert2";
import {HttpEventType} from "@angular/common/http";
import {AuthService} from "../../usuarios/auth.service";

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  @Input() cliente: Cliente;
  titulo:String = "Detalle del cliente";
  fotoSeleccionada: File;
  progreso :number = 0;

  constructor(private clienteService: ClienteService,
              public modalService: ModalService,
              public authService: AuthService
  ) { }


  ngOnInit(): void {

  }

  seleccionarFoto(event){
      this.fotoSeleccionada = event.target.files[0];
      this.progreso= 0;
      console.log(this.progreso)
    if(this.fotoSeleccionada.type.indexOf('image') < 0){
        Swal.fire('Error seleccionar imagen', 'El archivo debe ser del tipo imagen', 'error')
      this.fotoSeleccionada = null;
    }
  }

  subirFoto(){
    if(!this.fotoSeleccionada){
      Swal.fire('Error Upload', 'Debe seleccionar una imagen', 'error')
    }else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe(event =>{
          if(event.type ===HttpEventType.UploadProgress){
            this.progreso = Math.round((event.loaded/event.total)*100);
            console.log(this.progreso)
          }else if(event.type ===HttpEventType.Response){
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            this.modalService.notificaUpload.emit(this.cliente);
            Swal.fire('Imagen', response.mensaje, 'success')
          }
        })
    }

  }
cerrarModal(){
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
}
}
