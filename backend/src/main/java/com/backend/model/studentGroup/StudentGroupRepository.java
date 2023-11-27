package com.backend.model.studentGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentGroupRepository extends JpaRepository<StudentGroup, Long> {

    List<StudentGroup> findAllByUniversityId(Long universityId);
}
