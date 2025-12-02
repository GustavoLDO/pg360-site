package br.com.pg360.api.repository;

import br.com.pg360.api.model.Evento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface EventoRepository extends JpaRepository<Evento, Long> {

    @Query("SELECT e FROM Evento e " +
            "WHERE e.dtInicioEvento <=:fim " +
            "AND e.dtFimEvento >= :inicio")
    List<Evento> buscarEventosEntre(
            @Param("inicio")LocalDate inicio,
            @Param("fim") LocalDate fim
            );
}
