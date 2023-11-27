package com.backend.model.university;

import com.backend.convert.ConvertEntityToDto;
import com.backend.convert.ConvertDtoToEntity;
import com.backend.model.university.dto.UniversityInputDTO;
import com.backend.model.university.dto.UniversityOutputDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UniversityService {

    @Autowired
    private UniversityRepository universityRepository;
    @Autowired
    private ConvertDtoToEntity convertDtoToEntity;
    @Autowired
    private ConvertEntityToDto convertEntityToDto;

    public UniversityOutputDTO createUniversity(UniversityInputDTO universityDTO){
        University university = convertDtoToEntity.universityToEntity(universityDTO);
        universityRepository.save(university);
        return convertEntityToDto.universityToDto(university);
    }

    public List<UniversityOutputDTO> getAllUniversities() {
        return universityRepository.findAll().stream().
                map(x -> convertEntityToDto.universityToDto(x))
                .toList();
    }

    public UniversityOutputDTO updateUniversity(Long universityId, UniversityInputDTO universityDTO){
        University university = universityRepository.findById(universityId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "университет не найден "));
        university.update(universityDTO);
        universityRepository.save(university);
        return convertEntityToDto.universityToDto(university);
    }

    public UniversityOutputDTO deleteUniversity(Long universityId) {
        University university = universityRepository.findById(universityId).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "университет не найден"));
        universityRepository.delete(university);
        return convertEntityToDto.universityToDto(university);
    }

    public UniversityOutputDTO getUniversity(Long universityId) {
        University university = universityRepository.findById(universityId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "университет не найден"));
        return convertEntityToDto.universityToDto(university);
    }
}
