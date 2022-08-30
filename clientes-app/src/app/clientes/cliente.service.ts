import { Injectable } from '@angular/core';
import { DatePipe} from "@angular/common";
import { Cliente } from './cliente';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Router} from "@angular/router";
import {Region} from "./detalle/region";
import {catchError, tap} from 'rxjs/operators';
import { throwError} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  constructor(private http: HttpClient,
              private router : Router) { }



  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + "/regiones")
  }

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
    return this.http.post<any>(`${this.urlEndPoint}`, cliente).pipe(
      catchError(e => {
        if(e.status == 400){
            return throwError(e);
        }
        return throwError(() => e)
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return  this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        if(e.status != 401 && e.error.message){
          this.router.navigate(['/clientes'])
        }
        return throwError(() => e)
      })
    )
  }
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if(e.status == 400){
          return throwError(e);
        }
        return throwError(() => e)
      })
    )
  }
  delete(id): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
          return throwError(() => e)
      }
      ))
}


  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);

    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData,{
      reportProgress: true,
    });
    return this.http.request(req)
  }
}
