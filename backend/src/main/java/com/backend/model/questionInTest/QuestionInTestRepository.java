package com.backend.model.questionInTest;

import com.backend.model.question.Question;
import com.backend.model.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuestionInTestRepository extends JpaRepository<QuestionInTest, Long> {
    Optional<QuestionInTest> findByTestAndQuestion(Test test, Question question);

    List<QuestionInTest> findQuestionInTestByTestId(Long testId);

}
