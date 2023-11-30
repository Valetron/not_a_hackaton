package com.backend.model.user.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
public class UserInputDTO {

    private String name;
    private String surname;
    private String patronymic;
    private String description;
    private String email;
    private String phone;
    private Long universityId;
    private String password;
    private String role;

}
