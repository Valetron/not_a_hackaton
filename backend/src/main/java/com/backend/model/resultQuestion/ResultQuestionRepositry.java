package com.backend.model.resultQuestion;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultQuestionRepositry extends JpaRepository<ResultQuestion, Long>{

    List<ResultQuestion> findAllByTestId(Long testId);
}
