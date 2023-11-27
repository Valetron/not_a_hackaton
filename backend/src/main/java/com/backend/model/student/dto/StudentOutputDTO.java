package com.backend.model.student.dto;

import lombok.Data;

@Data
public class StudentOutputDTO {

    private Long id;
    private String username;
    private String name;
    private String patronymic;
    private String surname;
}
