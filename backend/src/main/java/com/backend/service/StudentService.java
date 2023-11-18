package com.backend.service;

import com.backend.repository.StudentRepository;
import com.backend.repository.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UniversityRepository universityRepository;


}
