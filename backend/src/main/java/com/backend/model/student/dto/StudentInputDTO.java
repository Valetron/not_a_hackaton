package com.backend.model.student.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentInputDTO {

    private Long chatId;
    private String username;
    private String name;
    private String patronymic;
    private String surname;
    private String university;
    private String studentGroup;
}
