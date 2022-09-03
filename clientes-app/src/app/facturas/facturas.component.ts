import {Component, OnInit} from '@angular/core';
import {Factura} from "./models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Observable, flatMap} from "rxjs";
import {map, startWith} from 'rxjs/operators';
import {FacturaService} from "./services/factura.service";
import {Producto} from "./models/producto";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {ItemFactura} from "./models/item-factura";
import Swal from "sweetalert2";

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo: string = "Nueva Factura";
  factura: Factura = new Factura();
  autoCompleteControl = new FormControl('');
  productosFiltrados: Observable<Producto[]>;

  constructor(private clienteService: ClienteService,
              private activateRouter: ActivatedRoute,
              private router : Router,
              private facturaService: FacturaService) {
  }

  ngOnInit(): void {
    this.activateRouter.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
    this.productosFiltrados = this.autoCompleteControl.valueChanges.pipe(
      // @ts-ignore
      map(value => typeof value === 'string' ? value : value.nombre),
      flatMap(value => value ? this._filter(value) : [])
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.getFiltrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent) {
    let producto = event.option.value as Producto;
    console.log(producto)
    if (this.existeItem(producto.id)) {
      this.incrementarCantidad(producto.id)
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem)
    }

    this.autoCompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(itemId: number, event: any): void {
    let cantidad: number = event.target.value as number;
    if (cantidad == 0) {
      return this.eliminarItemFactura(itemId);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (itemId === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementarCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }


  eliminarItemFactura(itemId: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => itemId !== item.producto.id);
  }

  createFactura(facturaForm):void{
    if(this.factura.items.length == 0 ){
      this.autoCompleteControl.setErrors({'ivalid':true})
    }
    if(facturaForm.form.valid && this.factura.items.length > 0){
        this.facturaService.crearFactura(this.factura).subscribe(factura => {
          this.router.navigate(['/facturas', factura.id])
          return Swal.fire(this.titulo, `Factura ${factura.descripcion} creada con exito`, "success");
        })
    }

  }
}
