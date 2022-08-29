import { Component, OnInit , OnChanges} from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import {ModalService} from "./detalle/modal.service";
import Swal from "sweetalert2";
import {tap} from 'rxjs/operators';
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../usuarios/auth.service";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit{
  clientes: Cliente[];
  pagination: any;
  clienteSeleccionado:Cliente;


  constructor(private clienteService: ClienteService,
              private activatedRoute: ActivatedRoute,
              private modalService : ModalService,
              public authService: AuthService
              ) {}

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).pipe(
        tap((response: any) => {
          (response.content as Cliente[]).forEach(cliente => {
            console.log(cliente.nombre)
          })
        })
      ).subscribe((response: any) => {
        this.clientes = response.content as Cliente[];
      this.pagination = response;
      })
    })
    this.modalService.notificaUpload.subscribe(cliente =>{
      this.clientes = this.clientes.map(clienteOriginal => {
        if(cliente.id == clienteOriginal.id){
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal
      })
    })
  }

  deleteCliente(cliente: Cliente): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
      title: 'Esta seguro de eliminar el cliente?',
      text: "No podra revertir los cambios",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(
          response=>{
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swalWithBootstrapButtons.fire(
              'Eliminado!',
              `Eliminado cliente ${cliente.nombre} con exito`,
              'success'
            )
          }
        )

      }
    })
  }

  abrirModal(cliente:Cliente){
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
