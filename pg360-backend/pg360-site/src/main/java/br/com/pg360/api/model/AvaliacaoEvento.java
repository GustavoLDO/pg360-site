package br.com.pg360.api.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "avaliacao_evento")
public class AvaliacaoEvento {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cdAvaliacaoEvento;


    private Integer nota;

    @Column(length = 500)
    private String dsAvaliacao;


    private LocalDate dtAvaliacao = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "cd_usuario")
    private Usuario usuario;

    @ManyToOne
    @JoinColumn(name = "cd_local")
    private Local local;

    @ManyToOne
    @JoinColumn(name = "cd_evento")
    private Evento evento;


    public AvaliacaoEvento() {
    }

    public AvaliacaoEvento(Long cdAvaliacaoEvento, Integer nota, String dsAvaliacao, LocalDate dtAvaliacao, Usuario usuario, Local local, Evento evento) {
        this.cdAvaliacaoEvento = cdAvaliacaoEvento;
        this.nota = nota;
        this.dsAvaliacao = dsAvaliacao;
        this.dtAvaliacao = dtAvaliacao;
        this.usuario = usuario;
        this.local = local;
        this.evento = evento;
    }

    public Long getCdAvaliacaoEvento() {
        return cdAvaliacaoEvento;
    }

    public void setCdAvaliacaoEvento(Long cdAvaliacaoEvento) {
        this.cdAvaliacaoEvento = cdAvaliacaoEvento;
    }

    public Integer getNota() {
        return nota;
    }

    public void setNota(Integer nota) {
        this.nota = nota;
    }

    public String getDsAvaliacao() {
        return dsAvaliacao;
    }

    public void setDsAvaliacao(String dsAvaliacao) {
        this.dsAvaliacao = dsAvaliacao;
    }

    public LocalDate getDtAvaliacao() {
        return dtAvaliacao;
    }

    public void setDtAvaliacao(LocalDate dtAvaliacao) {
        this.dtAvaliacao = dtAvaliacao;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public Local getLocal() {
        return local;
    }

    public void setLocal(Local local) {
        this.local = local;
    }

    public Evento getEvento() {
        return evento;
    }

    public void setEvento(Evento evento) {
        this.evento = evento;
    }

    @Override
    public String toString() {
        return "AvaliacaoEvento{" +
                "cdAvaliacaoEvento=" + cdAvaliacaoEvento +
                ", nota=" + nota +
                ", dsAvaliacao='" + dsAvaliacao + '\'' +
                ", dtAvaliacao=" + dtAvaliacao +
                ", usuario=" + usuario +
                ", local=" + local +
                ", evento=" + evento +
                '}';
    }
}
