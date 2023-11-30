package com.backend.model.resultAnswer;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultAnswerRepository extends JpaRepository<ResultAnswer, Long> {

    List<ResultAnswer> findAllByQuestionId(Long questionId);

}
