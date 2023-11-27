package com.backend.model.studentAnswer;

import com.backend.model.selectedStudAnswer.SelectedStudAnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentAnswerService {

    @Autowired
    private StudentAnswerRepository studentAnswerRepository;
    @Autowired
    private SelectedStudAnswerRepository ssaRepository;

}
