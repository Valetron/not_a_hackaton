package com.backend.model.university;


import com.backend.model.studentGroup.StudentGroup;
import com.backend.model.subject.Subject;
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
    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL)
    private List<Subject> subjects;
    @OneToMany(mappedBy = "university", cascade = CascadeType.ALL)
    private List<StudentGroup> studentGroups;

    public void update(UniversityInputDTO universityDTO){
        name = universityDTO.getName();
        description = universityDTO.getDescription();
    }
}
