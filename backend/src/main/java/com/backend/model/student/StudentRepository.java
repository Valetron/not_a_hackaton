package com.backend.model.student;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    Boolean existsByChatId(Long chatId);

    List<Student> findAllByStudentGroupId(Long studentGroup);

    Student findByChatId(Long chatId);

}
