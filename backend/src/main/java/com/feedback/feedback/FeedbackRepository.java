package com.feedback.feedback;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {

    @Query("SELECT f FROM Feedback f WHERE " +
            "(:status is null or f.status = :status) and " +
            "(:type is null or f.type = :type) and " +
            "(:q is null or lower(f.title) like lower(concat('%', :q, '%')) or " +
            " lower(f.description) like lower(concat('%', :q, '%')) or " +
            " lower(f.name) like lower(concat('%', :q, '%')))" )
    Page<Feedback> search(@Param("q") String q,
                          @Param("status") String status,
                          @Param("type") String type,
                          Pageable pageable);
}


