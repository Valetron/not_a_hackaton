package com.backend.model.studentGroup;

import com.backend.convert.ConvertDtoToEntity;
import com.backend.convert.ConvertEntityToDto;
import com.backend.model.studentGroup.dto.StudentGroupInputDTO;
import com.backend.model.studentGroup.dto.StudentGroupOutputDTO;
import com.backend.model.university.University;
import com.backend.model.university.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class StudentGroupService {

    @Autowired
    private StudentGroupRepository studentGroupRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public StudentGroupOutputDTO createGroup(Long universityId, StudentGroupInputDTO studentGroupInput){
        University university = universityRepository.findById(universityId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "университет не найден"));
        StudentGroup studentGroup = convertDtoToEntity.studentGroupToEntity(studentGroupInput);
        studentGroup.setUniversity(university);
        studentGroupRepository.save(studentGroup);
        return convertEntityToDto.studentGroupToDto(studentGroup);
    }

    public List<StudentGroupOutputDTO> getAllGroups(Long universityId){
        List<StudentGroup> studentGroups = studentGroupRepository.findAllByUniversityId(universityId);
        return studentGroups.stream().map(convertEntityToDto::studentGroupToDto).toList();
    }

    public StudentGroupOutputDTO updateGroup(Long studentGroupId, StudentGroupInputDTO studentGroupInput){
        StudentGroup studentGroup = studentGroupRepository.findById(studentGroupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "группа студентов не найден "));

        studentGroup.update(studentGroupInput);
        studentGroupRepository.save(studentGroup);
        return convertEntityToDto.studentGroupToDto(studentGroup);
    }

    public StudentGroupOutputDTO deleteGroup(Long studentGroupId){
        StudentGroup studentGroup = studentGroupRepository.findById(studentGroupId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "группа студентов не найдена"));

        studentGroupRepository.delete(studentGroup);
        return convertEntityToDto.studentGroupToDto(studentGroup);
    }
}

