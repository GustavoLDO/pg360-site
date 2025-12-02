package br.com.pg360.api.model;

import jakarta.persistence.*;

import java.awt.*;
import java.util.List;

@Entity
@Table(name = "local")
public class Local {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cdLocal;

    @Column(nullable = false)
    private String nmLocal;


    private String dsLocal;
    private String endereco;
    private String latitude;
    private String longitude;
    private String hrFuncionamento;

    @ManyToOne
    @JoinColumn(name = "cd_categoria")
    private Categoria categoria;

    @ElementCollection
    @CollectionTable(name = "local_imagens", joinColumns = @JoinColumn(name = "cd_local"))
    @Column(name = "img_url")
    private List<String> imagens;


    public Local() {
    }

    public Local(Long cdLocal, String nmLocal, String dsLocal, String endereco, String latitude, String longitude, String hrFuncionamento, Categoria categoria, List<String> imagens) {
        this.cdLocal = cdLocal;
        this.nmLocal = nmLocal;
        this.dsLocal = dsLocal;
        this.endereco = endereco;
        this.latitude = latitude;
        this.longitude = longitude;
        this.hrFuncionamento = hrFuncionamento;
        this.categoria = categoria;
        this.imagens = imagens;
    }

    public Long getCdLocal() {
        return cdLocal;
    }

    public void setCdLocal(Long cdLocal) {
        this.cdLocal = cdLocal;
    }

    public String getNmLocal() {
        return nmLocal;
    }

    public void setNmLocal(String nmLocal) {
        this.nmLocal = nmLocal;
    }

    public String getDsLocal() {
        return dsLocal;
    }

    public void setDsLocal(String dsLocal) {
        this.dsLocal = dsLocal;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getLatitude() {
        return latitude;
    }

    public void setLatitude(String latitude) {
        this.latitude = latitude;
    }

    public String getLongitude() {
        return longitude;
    }

    public void setLongitude(String longitude) {
        this.longitude = longitude;
    }

    public String getHrFuncionamento() {
        return hrFuncionamento;
    }

    public void setHrFuncionamento(String hrFuncionamento) {
        this.hrFuncionamento = hrFuncionamento;
    }

    public Categoria getCategoria() {
        return categoria;
    }

    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }

    @Override
    public String toString() {
        return "Local{" +
                "cdLocal=" + cdLocal +
                ", nmLocal='" + nmLocal + '\'' +
                ", dsLocal='" + dsLocal + '\'' +
                ", endereco='" + endereco + '\'' +
                ", latitude='" + latitude + '\'' +
                ", longitude='" + longitude + '\'' +
                ", hrFuncionamento='" + hrFuncionamento + '\'' +
                ", categoria=" + categoria +
                ", imagens=" + imagens +
                '}';
    }
}
