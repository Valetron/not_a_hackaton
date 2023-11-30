package com.backend.model.question;

import com.backend.model.questionInTest.QuestionInTest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuestionGroupId(Long questionGroupId);

    @Query("select qit.question from QuestionInTest qit where qit in :tests")
    List<Question> findAllByTests(List<QuestionInTest> tests);
}
