package com.backend.model.activeTest;

import com.backend.convert.ConvertDtoToEntity;
import com.backend.convert.ConvertEntityToDto;
import com.backend.model.student.Student;
import com.backend.model.student.StudentRepository;
import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.test.Test;
import com.backend.model.test.TestRepository;
import com.backend.model.test.dto.TestOutputDTO;
import org.apache.catalina.mbeans.SparseUserDatabaseMBean;
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
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public List<StudentOutputDTO> addTests(Long testId, Long[] studentIds){
        Test test = testRepository.findById(testId).orElseThrow(
                ()-> new ResponseStatusException(HttpStatus.NOT_FOUND, "тест не найден"));
        List<Student> students = studentRepository.findAllById(Arrays.stream(studentIds).toList());
        List<ActiveTest> activeTests = new ArrayList<>();

        students.forEach(student -> activeTests.add(new ActiveTest(test, student)));
        activeTestRepository.saveAll(activeTests);
        return students.stream().map(x -> convertEntityToDto.studentToDto(x)).toList();
    }

    public List<StudentOutputDTO> removeTests(Long testId, Long[] studentIds){
        activeTestRepository.deleteAllByTestIdAndStudentIdIn(testId, Arrays.stream(studentIds).toList());
        List<Student> students = studentRepository.findAllById(Arrays.stream(studentIds).toList());
        return students.stream().map(convertEntityToDto::studentToDto).toList();
    }

    public List<TestOutputDTO> getAllTests(Long studentId){
        List<Test> tests = activeTestRepository.findAllTestsByStudentId(studentId);
        return tests.stream().map(convertEntityToDto::testToDto).toList();
    }


}
