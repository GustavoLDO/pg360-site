package br.com.pg360.api.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cdUsuario;

    @Column(nullable = false)
    private String nmUsuario;

    @Column(nullable = false, unique = true)
    private String emailUsuario;

    @Column(nullable = false)
    private String senhaUsuario;


    private String dsUsuario;
    private LocalDate dtCadastroUsuario = LocalDate.now();

    public Usuario() {
    }

    public Usuario(Long cdUsuario, String nmUsuario, String emailUsuario, String senhaUsuario, String dsUsuario, LocalDate dtCadastroUsuario) {
        this.cdUsuario = cdUsuario;
        this.nmUsuario = nmUsuario;
        this.emailUsuario = emailUsuario;
        this.senhaUsuario = senhaUsuario;
        this.dsUsuario = dsUsuario;
        this.dtCadastroUsuario = dtCadastroUsuario;
    }

    public Long getCdUsuario() {
        return cdUsuario;
    }

    public void setCdUsuario(Long cdUsuario) {
        this.cdUsuario = cdUsuario;
    }

    public String getNmUsuario() {
        return nmUsuario;
    }

    public void setNmUsuario(String nmUsuario) {
        this.nmUsuario = nmUsuario;
    }

    public String getEmailUsuario() {
        return emailUsuario;
    }

    public void setEmailUsuario(String emailUsuario) {
        this.emailUsuario = emailUsuario;
    }

    public String getSenhaUsuario() {
        return senhaUsuario;
    }

    public void setSenhaUsuario(String senhaUsuario) {
        this.senhaUsuario = senhaUsuario;
    }

    public String getDsUsuario() {
        return dsUsuario;
    }

    public void setDsUsuario(String dsUsuario) {
        this.dsUsuario = dsUsuario;
    }

    public LocalDate getDtCadastroUsuario() {
        return dtCadastroUsuario;
    }

    public void setDtCadastroUsuario(LocalDate dtCadastroUsuario) {
        this.dtCadastroUsuario = dtCadastroUsuario;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "cdUsuario=" + cdUsuario +
                ", nmUsuario='" + nmUsuario + '\'' +
                ", emailUsuario='" + emailUsuario + '\'' +
                ", senhaUsuario='" + senhaUsuario + '\'' +
                ", dsUsuario='" + dsUsuario + '\'' +
                ", dtCadastroUsuario=" + dtCadastroUsuario +
                '}';
    }
}
