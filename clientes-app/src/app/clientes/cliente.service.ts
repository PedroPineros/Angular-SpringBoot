import { Injectable } from '@angular/core';
import {formatDate, DatePipe} from "@angular/common";
import { Cliente } from './cliente';
import { Observable } from 'rxjs';
import { of, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";
import {map, catchError, tap} from 'rxjs/operators';
import Swal from "sweetalert2";
import {Router} from "@angular/router";
import {Region} from "./detalle/region";
import {AuthService} from "../usuarios/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'})

  constructor(private http: HttpClient,
              private router : Router,
              private authService: AuthService) { }

  private agregarAuthorizationHeader(){
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer '+ token);
    }
    return this.httpHeaders;
  }

  private isNoAutorizado(e):boolean{
    if(e.status == 401){
      this.router.navigate(['/login']);
      return true;
    }
    if(e.status == 403){
      Swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username} no tienes acceso a este rescurso!`, 'warning');
      this.router.navigate(['/clientes']);
      return true;
    }
    return false;
  }

  getRegiones(): Observable<Region[]>{
    return this.http.get<Region[]>(this.urlEndPoint + "/regiones", {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>  {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    );
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
    return this.http.post<any>(`${this.urlEndPoint}`, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status == 400){
            return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(() => e)
      })
    )
  }

  getCliente(id): Observable<Cliente>{
    return  this.http.get<Cliente>(`${this.urlEndPoint}/${id}`, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        this.router.navigate(['/clientes'])
        console.log(e.error.mensaje);
        Swal.fire(e.error.mensaje, e.error.error,'error')
        return throwError(() => e)
      })
    )
  }
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e => {
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
        if(e.status == 400){
          return throwError(e);
        }
        Swal.fire(e.error.mensaje, e.error.error,'error');
        return throwError(() => e)
      })
    )
  }
  delete(id): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{headers: this.agregarAuthorizationHeader()}).pipe(
      catchError(e =>{
        if(this.isNoAutorizado(e)){
          return throwError(e);
        }
          Swal.fire(e.error.mensaje, e.error.error,'error')
          return throwError(() => e)
      }
      ))
}


  subirFoto(archivo: File, id): Observable<HttpEvent<{}>>{
    let formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("id", id);
    let httpHeaders = new HttpHeaders();
    let token = this.authService.token;
    if(token != null){
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + token );
    }
    const req = new HttpRequest('POST', `${this.urlEndPoint}/upload`, formData,{
      reportProgress: true,
      headers: httpHeaders
    });
    return this.http.request(req).pipe(
      catchError(e =>  {
        this.isNoAutorizado(e);
        return throwError(e);
      })
    )
  }
}
