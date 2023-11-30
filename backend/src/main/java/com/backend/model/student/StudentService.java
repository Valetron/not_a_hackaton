package com.backend.model.student;

import com.backend.convert.ConvertDtoToEntity;
import com.backend.convert.ConvertEntityToDto;
import com.backend.model.student.dto.StudentInputDTO;
import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.studentGroup.StudentGroup;
import com.backend.model.studentGroup.StudentGroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private StudentGroupRepository studentGroupRepository;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;

    public StudentOutputDTO createStudent(StudentInputDTO studentInput){
        String universityName = studentInput.getUniversity();
        String groupName = studentInput.getStudentGroup();
        StudentGroup studentGroup = studentGroupRepository.findByUniversityNameAndName(universityName,groupName)
               .orElseThrow(() -> new NoSuchElementException(String.format(
                       "группа студентов %s в университете %s не найдена", groupName, universityName)));
        Student student = convertDtoToEntity.studentToEntity(studentInput);
        student.setStudentGroup(studentGroup);
        studentRepository.save(student);
        return convertEntityToDto.studentToDto(student);
    }

    public Boolean existsStudent(Long chatId){
        return studentRepository.existsByChatId(chatId);
    }

    public List<StudentOutputDTO> getAllStudents(Long groupId){
        List<Student> students = studentRepository.findAllByStudentGroupId(groupId);
        List<StudentOutputDTO> studentOutputDTOs = students.stream().map(convertEntityToDto::studentToDto).toList();
        return studentOutputDTOs;
    }

    public StudentOutputDTO geInfoStudent(Long studentId){
        Student students = studentRepository.findById(studentId).get();
        StudentOutputDTO studentOutputDTO = convertEntityToDto.studentToDto(students);
        return studentOutputDTO;
    }
}
