package br.com.pg360.api.repository;

import br.com.pg360.api.model.AvaliacaoEvento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AvaliacaoEventoRepository  extends JpaRepository<AvaliacaoEvento, Long> {
}
