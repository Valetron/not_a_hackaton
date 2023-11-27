package com.backend.model.student;

import com.backend.convert.ConvertDtoToEntity;
import com.backend.convert.ConvertEntityToDto;
import com.backend.model.student.dto.StudentInputDTO;
import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.university.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;

    public StudentOutputDTO createStudent(StudentInputDTO studentInputDTO){

        Student student = convertDtoToEntity.studentToEntity(studentInputDTO);
        studentRepository.save(student);
        return convertEntityToDto.studentToDto(student);
    }


}
