package com.backend.model.test;

import com.backend.convert.ConvertDtoToEntity;
import com.backend.convert.ConvertEntityToDto;
import com.backend.model.question.Question;
import com.backend.model.question.QuestionRepository;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.questionInTest.QuestionInTest;
import com.backend.model.questionInTest.QuestionInTestRepository;
import com.backend.model.subject.Subject;
import com.backend.model.subject.SubjectRepository;
import com.backend.model.test.dto.TestInputDTO;
import com.backend.model.test.dto.TestOutputDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class TestServise {


    @Autowired
    private TestRepository testRepository;
    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private QuestionInTestRepository questionInTestRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;

    public TestOutputDTO createTest(Long subjectId, TestInputDTO testInputDTO){
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "дисциплина не найден"));
        Test test = convertDtoToEntity.testToEntity(testInputDTO);
        test.setSubject(subject);
        testRepository.save(test);
        return convertEntityToDto.testToDto(test);
    }

    public TestOutputDTO updateTest(Long testId, TestInputDTO testInputDTO){
        Test test = testRepository.findById(testId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "тест не найден"));
        test.update(testInputDTO);
        testRepository.save(test);
        return convertEntityToDto.testToDto(test);
    }

    public TestOutputDTO deleteTest(Long testId){
        Test test = testRepository.findById(testId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "тест не найден"));
        testRepository.delete(test);
        return convertEntityToDto.testToDto(test);
    }

    public List<TestOutputDTO> getAllTests(Long subjectId){
        List<Test> tests = testRepository.findBySubjectId(subjectId);

        return tests.stream().map(convertEntityToDto::testToDto).toList();
    }

    public TestOutputDTO getTest(Long testId){
        Test test = testRepository.findById(testId).orElseThrow(
                RuntimeException::new);
        return convertEntityToDto.testToDto(test);
    }

    public List<QuestionOutputDTO> addQuestions(Long testId , Long[] questionIds){
        Test test = testRepository.findById(testId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "тест не найден"));
        List<QuestionInTest> questionInTestList = new ArrayList<>();
        List<QuestionOutputDTO> questionOutputDTOList = new ArrayList<>();
        for (Long questionId:questionIds) {
            Question question = questionRepository.findById(questionId).orElseThrow(
                    ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
            questionInTestList.add(new QuestionInTest(test, question));
            questionOutputDTOList.add(convertEntityToDto.questionToDto(question));
        }
        questionInTestRepository.saveAll(questionInTestList);

        return questionOutputDTOList;
    }

    public List<QuestionOutputDTO> deleteQuestion(Long testId ,Long[] questionIds){
        Test test = testRepository.findById(testId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "тест не найден"));
        List<QuestionInTest> questionInTestList = new ArrayList<>();
        List<QuestionOutputDTO> questionOutputDTOList = new ArrayList<>();
        for (Long questionId: questionIds) {
            Question question = questionRepository.findById(questionId).orElseThrow(
                    ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопрос не найден"));
            questionInTestList.add(
                    questionInTestRepository.findByTestAndQuestion(test, question).orElseThrow(
                        ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "вопроса в тесте не найдено"))
            );
            questionOutputDTOList.add(convertEntityToDto.questionToDto(question));
        }
        questionInTestRepository.deleteAll(questionInTestList);
        return questionOutputDTOList;
    }

}
