package com.bolsadeideas.spring.boot.backend.apirest.models.dao;

import com.bolsadeideas.spring.boot.backend.apirest.models.entity.Region;
import org.springframework.data.jpa.repository.JpaRepository;

import com.bolsadeideas.spring.boot.backend.apirest.models.entity.Cliente;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface IClienteDao extends JpaRepository<Cliente, Long> {

    @Query("from Region")
    public List<Region> findAllRegiones();
}
