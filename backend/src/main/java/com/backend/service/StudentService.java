package com.backend.service;

import com.backend.domain.Student;
import com.backend.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public void addStudent(Student student){

        studentRepository.save(student);
    }

}
