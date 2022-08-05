package com.bolsadeideas.spring.boot.backend.apirest.models.services;

import com.sun.org.apache.xerces.internal.impl.io.MalformedByteSequenceException;
import org.springframework.core.io.UrlResource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;

public interface IUploadsFileService {
    public UrlResource carga(String nombreFoto) throws MalformedByteSequenceException, MalformedURLException;
    public String copiar(MultipartFile archivo) throws IOException;
    public boolean eliminar(String nombreFoto);
    public Path getPath(String nombreFoto);
}
