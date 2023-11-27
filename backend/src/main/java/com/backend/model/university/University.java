package com.backend.model.university;


import com.backend.model.university.dto.UniversityInputDTO;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity(name = "university")
@Data
public class University {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;

    public void update(UniversityInputDTO universityDTO){
        name = universityDTO.getName();
        description = universityDTO.getDescription();
    }
}
