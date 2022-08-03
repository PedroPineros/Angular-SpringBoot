import { Injectable } from '@angular/core';
import {formatDate, DatePipe} from "@angular/common";
import { Cliente } from './cliente';
import { CLIENTES } from './clientes.json';
import { Observable } from 'rxjs';
import { of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, catchError, tap} from 'rxjs/operators';
import Swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient, private router : Router) { }

  getClientes(page : number): Observable<any[]>{
    return this.http.get<any[]>(this.urlEndPoint + '/pages/' + page).pipe(
      tap((response: any) =>{
        (response.content as Cliente[]).forEach(cliente =>{
          console.log("cliente service tap 1 " + cliente.nombre)
        })
      }),
      map((response : any) => {
        (response.content as Cliente[]).map(cliente =>{
        cliente.nombre = cliente.nombre.toUpperCase();
       // cliente.createAt = formatDate(cliente.createAt, 'dd-mm-yyyy', 'en-US')

        let datePipe = new DatePipe('es');
       // cliente.createAt = datePipe.transform(cliente.createAt, 'EEEE dd, MMMM yyyy')
        return cliente;
      });
        return response;
      }),
      tap(response =>{
        (response.content as Cliente[]).forEach(cliente =>{
          console.log("cliente service tap 2 " + cliente.nombre)
        })
      }),
    )
  }
  create(cliente: Cliente) : Observable<any>{
    return this.http.post<any>(`${this.urlEndPoint}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
            return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e)
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return  this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes'])
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error')
        return throwError(() => e)
      })
    )
  }
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(() => e)
      })
    )
  }
  delete(id): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.httpHeaders})
  }
}
