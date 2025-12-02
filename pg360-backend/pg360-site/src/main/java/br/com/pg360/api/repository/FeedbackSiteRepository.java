package br.com.pg360.api.repository;

import br.com.pg360.api.model.FeedbackSite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FeedbackSiteRepository extends JpaRepository<FeedbackSite, Long> {
}
