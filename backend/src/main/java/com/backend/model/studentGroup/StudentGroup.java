package com.backend.model.studentGroup;

import com.backend.model.student.Student;
import com.backend.model.studentGroup.dto.StudentGroupInputDTO;
import com.backend.model.studentGroup.dto.StudentGroupOutputDTO;
import com.backend.model.subject.Subject;
import com.backend.model.university.University;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class StudentGroup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private University university;
    @OneToMany(mappedBy = "studentGroup", cascade = CascadeType.ALL)
    private List<Student> students;

    public void update(StudentGroupInputDTO studentGroupInput) {
        name = studentGroupInput.getName();
    }
}