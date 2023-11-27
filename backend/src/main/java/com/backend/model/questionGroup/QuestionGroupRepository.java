package com.backend.model.questionGroup;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionGroupRepository extends JpaRepository<QuestionGroup, Long> {

    List<QuestionGroup> findByQuestionBaseId(Long questionBaseId);
}
