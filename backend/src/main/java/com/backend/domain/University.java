package com.backend.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name = "university")
public class University {

    @Id
    private Long id;
    private String title;
}
