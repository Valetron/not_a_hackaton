package com.backend.model.studentGroup;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentGroupRepository extends JpaRepository<StudentGroup, Long> {

    List<StudentGroup> findAllByUniversityId(Long universityId);
    Optional<StudentGroup> findByName(String name);
    Optional<StudentGroup> findByUniversityNameAndName(String universityName, String name);
}
