package com.backend.model.activeTest;

import com.backend.model.student.Student;
import com.backend.model.test.Test;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActiveTestRepository extends JpaRepository<ActiveTest, Long> {

    List<ActiveTest> findAllByTestIdAndStudentIdIn(Long testId, List<Long> studentIds);

    void deleteAllByTestIdAndStudentIdIn(Long testId, List<Long> studentIds);

    @Query("SELECT at.test FROM ActiveTest at WHERE at.student.id = :studentId")
    List<Test> findAllTestsByStudentId(@Param("studentId") Long studentId);

    @Query("SELECT at.test FROM ActiveTest at WHERE at.student.chatId = :studentChatId")
    List<Test> findAllTestsByStudentChatId(@Param("studentChatId") Long studentChatId);

}
