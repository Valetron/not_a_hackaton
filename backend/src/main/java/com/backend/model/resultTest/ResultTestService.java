package com.backend.model.resultTest;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.answer.Answer;
import com.backend.model.resultQuestion.ResultQuestion;
import com.backend.model.resultQuestion.ResultQuestionRepositry;
import com.backend.model.resultTest.dto.ResultTestOutputDTO;
import com.backend.model.selectedStudAnswer.dto.SelectedAnswerOutputDTO;
import com.backend.model.student.Student;
import com.backend.model.student.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

@Service
public class ResultTestService {

    @Autowired
    private ResultTestRepository resultTestRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ResultQuestionRepositry resultQuestionRepositry;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public Long saveResultTest(List<Long> resultQuestionIds, Long studentChatId, String testName){

            Student student = studentRepository.findByChatId(studentChatId);
            List<ResultQuestion> resultQuestions = resultQuestionRepositry.findAllById(resultQuestionIds);
//            @TODO
//            private Duration duration;
//            private LocalDateTime beginningTest;
//            private LocalDateTime endingTest;


            Double mark = (double) 0;
            int countCorrects = 0;
            for (ResultQuestion answer : resultQuestions){
                i++;
                mark += answer.getMark();
                if (answer.getMark() > 0){
                    countCorrects += 1;
                }
            }
            Double percent = (countCorrects > 0) ? ((double) countCorrects / resultQuestions.size() * 100) : 0.0;

            ResultTest resultTest = new ResultTest();
            resultTest.setStudent(student);
            resultTest.setMark(mark);
            resultTest.setCorrectCount(countCorrects);
            resultTest.setPercent(percent);
            resultTest.setTestName(testName);

            resultTestRepository.save(resultTest);

            resultQuestions.forEach(x -> x.setTest(resultTest));
            resultQuestionRepositry.saveAll(resultQuestions);
            return resultTest.getId();


    }

    public List<ResultTestOutputDTO> getAllResultTests(Long studentId){
        List<ResultTest> resultTests = new LinkedList<>();
        Student student = studentRepository.findById(studentId).get();
        if (student == null){
            return new ArrayList<>();
        }
        resultTests = resultTestRepository.findAllByStudent(student);
        List<ResultTestOutputDTO> resultTestListDTO = resultTests.stream().map(
                convertEntityToDto::resultTestToDto).toList();
        return resultTestListDTO;
    }
}
