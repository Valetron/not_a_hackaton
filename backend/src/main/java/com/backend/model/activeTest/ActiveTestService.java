package com.backend.model.activeTest;

import com.backend.bot.TestingBot;
import com.backend.convert.ConvertEntityToDto;
import com.backend.model.student.Student;
import com.backend.model.student.StudentRepository;
import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.test.Test;
import com.backend.model.test.TestRepository;
import com.backend.model.test.dto.TestOutputDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class ActiveTestService {

    @Autowired
    private TestRepository testRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private ActiveTestRepository activeTestRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    @Autowired
    private TestingBot testingBot;

    public List<StudentOutputDTO> addTests(Long testId, Long[] studentIds){
        Test test = testRepository.findById(testId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "тест не найден"));
        List<Student> students = studentRepository.findAllById(Arrays.stream(studentIds).toList());
        List<ActiveTest> activeTests = new ArrayList<>();

        for(Student student:students){
            activeTests.add(new ActiveTest(test, student));
            testingBot.sendTest(student.getChatId(), testId);
        }
        activeTestRepository.saveAll(activeTests);
        return students.stream().map(x -> convertEntityToDto.studentToDto(x)).toList();
    }

    public List<StudentOutputDTO> removeTests(Long testId, Long[] studentIds){
        activeTestRepository.deleteAllByTestIdAndStudentIdIn(testId, Arrays.stream(studentIds).toList());
        List<Student> students = studentRepository.findAllById(Arrays.stream(studentIds).toList());
        return students.stream().map(convertEntityToDto::studentToDto).toList();
    }

    public List<TestOutputDTO> getAllTestsByStudentId(Long studentId){
        List<Test> tests = activeTestRepository.findAllTestsByStudentId(studentId);
        return tests.stream().map(convertEntityToDto::testToDto).toList();
    }

}
