package com.backend.model.selectedStudAnswer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SelectedAnswerRepository extends JpaRepository<SelectedAnswer, Long> {
}
