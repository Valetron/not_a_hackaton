package com.backend.model.questionBase;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionBaseRepository extends JpaRepository<QuestionBase, Long> {
    List<QuestionBase> findBySubjectId(Long subjectId);
}
