package br.com.pg360.api.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "avaliacao")
public class Avaliacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cdAvaliacao;

    @Column(nullable = false, length = 150)
    private String nmPessoa;

    @Column(nullable = false, length = 150)
    private String emailPessoa;

    @Column(nullable = false, length = 600)
    private String dsAvaliacao;


    private LocalDate dtAvaliacao = LocalDate.now();

    public Avaliacao() {
    }

    public Avaliacao(Long cdAvaliacao, String nmPessoa, String emailPessoa, String dsAvaliacao, LocalDate dtAvaliacao) {
        this.cdAvaliacao = cdAvaliacao;
        this.nmPessoa = nmPessoa;
        this.emailPessoa = emailPessoa;
        this.dsAvaliacao = dsAvaliacao;
        this.dtAvaliacao = dtAvaliacao;
    }

    public Long getCdAvaliacao() {
        return cdAvaliacao;
    }

    public void setCdAvaliacao(Long cdAvaliacao) {
        this.cdAvaliacao = cdAvaliacao;
    }

    public String getNmPessoa() {
        return nmPessoa;
    }

    public void setNmPessoa(String nmPessoa) {
        this.nmPessoa = nmPessoa;
    }

    public String getEmailPessoa() {
        return emailPessoa;
    }

    public void setEmailPessoa(String emailPessoa) {
        this.emailPessoa = emailPessoa;
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

    @Override
    public String toString() {
        return "Avaliacao{" +
                "cdAvaliacao=" + cdAvaliacao +
                ", nmPessoa='" + nmPessoa + '\'' +
                ", emailPessoa='" + emailPessoa + '\'' +
                ", dsAvaliacao='" + dsAvaliacao + '\'' +
                ", dtAvaliacao=" + dtAvaliacao +
                '}';
    }
}
