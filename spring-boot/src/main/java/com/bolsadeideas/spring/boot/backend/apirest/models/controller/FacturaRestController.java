package com.bolsadeideas.spring.boot.backend.apirest.models.controller;

import com.bolsadeideas.spring.boot.backend.apirest.models.entity.Factura;
import com.bolsadeideas.spring.boot.backend.apirest.models.entity.Producto;
import com.bolsadeideas.spring.boot.backend.apirest.models.services.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins={"http://localhost:4200", "*"})
@RestController
@RequestMapping("/api")
public class FacturaRestController {

    @Autowired
    private IClienteService clienteService;

    @Secured({"ROLE_USER", "ROLE_ADMIN"})
    @RequestMapping("/facturas/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public Factura show(@PathVariable Long id){
        return clienteService.findFacturaById(id);
    }

    @Secured({"ROLE_ADMIN"})
    @DeleteMapping("/facturas/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id){
        clienteService.deleteFacturaById(id);
    }

    @Secured({"ROLE_ADMIN"})
    @GetMapping("/facturas/filtrar-producto/{term}")
    @ResponseStatus(code=HttpStatus.OK)
    public List<Producto> filtrarProductos(@PathVariable String term){
        return clienteService.findProductoByNombre(term);
    }

    @Secured({"ROLE_ADMIN"})
    @PostMapping("/facturas")
    @ResponseStatus(code = HttpStatus.CREATED)
    public Factura crear(@RequestBody Factura factura){
        return clienteService.saveFactura(factura);
    }
}
