package com.backend.model.student.dto;

import lombok.Data;

@Data
public class StudentInputDTO {

    private Long chatId;
    private String username;
    private String name;
    private String patronymic;
    private String surname;
}
