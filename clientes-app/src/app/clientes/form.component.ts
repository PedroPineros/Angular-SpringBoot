import { Component, OnInit } from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from "./cliente.service";
import {Router, ActivatedRoute} from '@angular/router';
import Swal from 'sweetalert2';
import {Region} from "./detalle/region";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
public cliente: Cliente = new Cliente();
regiones: Region[];

public titulo: string = "Crear Cliente";
public errors: string[];

  constructor(
    private  clienteService : ClienteService,
    private router : Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
  this.cargarCliente();
  this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  cargarCliente(): void{
  this.activatedRoute.params.subscribe(params =>{
    let id= params['id']
    if(id){
      this.clienteService.getCliente(id).subscribe((cliente) =>this.cliente = cliente)
    }
  })
  }

  public create(): void{
  this.clienteService.create(this.cliente).subscribe(
    cliente => {
      this.router.navigate(['/clientes'])
      Swal.fire('Nuevo Cliente ', `Cliente ${cliente.cliente.nombre} creado con exito`, 'success')
    },
    err =>{
      this.errors = err.error.errors as string [];
      console.error(err.error.errors)
    }
  )
}

  public update(): void{
    this.clienteService.update(this.cliente).subscribe(cliente =>{
      this.router.navigate(['/clientes'])
      Swal.fire('Cliente actualizado', `Cliente: ${cliente.cliente.nombre} se actualizo`, 'success')
    },
      err =>{
        this.errors = err.error.errors as string [];
        console.error(err.error.errors)
      })
  }

  compararRegion(o1: Region, o2:Region){
    if(o1 === undefined && o2 === undefined){
      return true;
    }
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }
}
