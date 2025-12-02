package br.com.pg360.api.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;

@Entity
@Table(name = "categoria")
public class Categoria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cdCategoria;

    @Column(nullable = false)
    @JsonProperty("nmCategoria")
    private String nmCategoria;

    @JsonProperty("dsCategoria")
    private String dsCategoria;

    public Categoria() {}

    public Categoria(Long cdCategoria, String nmCategoria, String dsCategoria) {
        this.cdCategoria = cdCategoria;
        this.nmCategoria = nmCategoria;
        this.dsCategoria = dsCategoria;
    }

    public Long getCdCategoria() {
        return cdCategoria;
    }

    public void setCdCategoria(Long cdCategoria) {
        this.cdCategoria = cdCategoria;
    }

    public String getNmCategoria() {
        return nmCategoria;
    }

    public void setNmCategoria(String nmCategoria) {
        this.nmCategoria = nmCategoria;
    }

    public String getDsCategoria() {
        return dsCategoria;
    }

    public void setDsCategoria(String dsCategoria) {
        this.dsCategoria = dsCategoria;
    }

    @Override
    public String toString() {
        return "Categoria{" +
                "cdCategoria=" + cdCategoria +
                ", nmCategoria='" + nmCategoria + '\'' +
                ", dsCategoria='" + dsCategoria + '\'' +
                '}';
    }
}
