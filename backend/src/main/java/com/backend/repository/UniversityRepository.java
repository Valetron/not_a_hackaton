package com.backend.repository;

import com.backend.model.University;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UniversityRepository extends JpaRepository<University, Integer> {
}
