package com.backend.model.activeTest;

import com.backend.model.student.Student;
import com.backend.model.test.Test;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class ActiveTest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    private Test test;
    @ManyToOne
    private Student student;

    public ActiveTest(Test test, Student student) {
        this.test = test;
        this.student = student;
    }
}
