package com.bolsadeideas.spring.boot.backend.apirest.controller;

import com.bolsadeideas.spring.boot.backend.apirest.models.entity.Factura;
import com.bolsadeideas.spring.boot.backend.apirest.models.services.IClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins={"http://localhost:4200"})
@RestController
@RequestMapping("/api")
public class FacturaRestController {

    @Autowired
    private IClienteService clienteService;


    @RequestMapping("/facturas/{id}")
    @ResponseStatus(code = HttpStatus.OK)
    public Factura show(@PathVariable Long id){
        return clienteService.findFacturaById(id);
    }




}
