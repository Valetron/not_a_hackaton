package com.backend.model.resultTest;

import com.backend.model.student.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResultTestRepository extends JpaRepository<ResultTest, Long> {

    List<ResultTest> findAllByStudent(Student student);
}
