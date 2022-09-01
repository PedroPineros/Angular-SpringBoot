package com.bolsadeideas.spring.boot.backend.apirest.models.entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="clientes")
public class Cliente implements Serializable {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@NotEmpty(message = "no puede ser vacio")
	@Size(min = 4, max = 12, message = "El tamaño debe ser entre 4 y 12")
	@Column(nullable = false)
	private String nombre;

	@NotEmpty (message = "no puede ser vacio")
	@Size(min = 4, max = 12,  message = "El tamaño debe ser entre 4 y 12")
	private String apellido;

	@NotEmpty (message = "no puede ser vacio")
	@Email(message = "formato invalido para email")
	@Column(nullable = false, unique = false)
	private String email;

	@NotNull(message = "no puede estar vacio")
	@Column(name="create_at")
	@Temporal(TemporalType.DATE)
	private Date createAt;

	private String foto;

	@NotNull(message = "La region no puede ser vacia")
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name="region_id")
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
	private Region region;


	@JsonIgnoreProperties({"cliente", "hibernateLazyInitializer", "handler"})
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "cliente", cascade = CascadeType.ALL)
	private List<Factura> facturas;

	public Cliente() {
		this.facturas = new ArrayList<>();
	}

//@PrePersist
	//public void prePersist(){
		//createAt = new Date();
	//}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellido() {
		return apellido;
	}

	public void setApellido(String apellido) {
		this.apellido = apellido;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Date getCreateAt() {
		return createAt;
	}

	public void setCreateAt(Date createAt) {
		this.createAt = createAt;
	}

	public String getFoto() {return foto;}

	public void setFoto(String foto) {this.foto = foto;	}

	public Region getRegion() {
		return region;
	}

	public void setRegion(Region region) {
		this.region = region;
	}

	public List<Factura> getFacturas() {
		return facturas;
	}

	public void setFacturas(List<Factura> facturas) {
		this.facturas = facturas;
	}

	private static final long serialVersionUID = 1L;
}
