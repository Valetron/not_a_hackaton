package com.backend.model.subject;

import com.backend.convert.ConvertEntityToDto;
import com.backend.model.subject.dto.SubjectInputDTO;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.subject.dto.SubjectOutputDTO;
import com.backend.model.university.University;
import com.backend.model.university.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class SubjectService {

    @Autowired
    private SubjectRepository subjectRepository;
    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public SubjectOutputDTO createSubject(Long universityId, SubjectInputDTO subjectDTO){
        Subject subject = convertDtoToEntity.subjectToEntity(subjectDTO);
        University university = universityRepository.findById(universityId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "университет не найден "));
        subject.setUniversity(university);
        subjectRepository.save(subject);
        return convertEntityToDto.subjectToDto(subject);
    }

    public List<SubjectOutputDTO> getAllSubjects(Long universityId) {
        List<Subject> subjects = subjectRepository.findByUniversityId(universityId).orElseThrow(
                () -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "дисциплины не найдены "));

        University university = universityRepository.findById(universityId).get();

        return subjects.stream().map(x -> convertEntityToDto.subjectToDto(x)).toList();
    }

    public SubjectOutputDTO updateSubject(Long subjectId, SubjectInputDTO subjectDTO){
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "дисциплина не найден "));
        subject.update(subjectDTO);
        subjectRepository.save(subject);
        return convertEntityToDto.subjectToDto(subject);
    }

    public SubjectOutputDTO deleteSubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "дисциплина не найден "));
        subjectRepository.delete(subject);
        return convertEntityToDto.subjectToDto(subject);
    }

    public SubjectOutputDTO getSubject(Long subjectId) {
        Subject subject = subjectRepository.findById(subjectId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "дисциплина не найден "));
        return convertEntityToDto.subjectToDto(subject);
    }
}
