package com.bolsadeideas.spring.boot.backend.apirest.models.services;

import java.util.List;

import com.bolsadeideas.spring.boot.backend.apirest.models.entity.Cliente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

public interface IClienteService {
	
 public  List<Cliente> findAll();
 public Page<Cliente> findAll(Pageable pageable);
 public Cliente findById(Long id);
 public Cliente save(Cliente cliente);
 public void delete (Long id);
}
