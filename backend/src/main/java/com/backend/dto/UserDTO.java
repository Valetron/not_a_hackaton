package com.backend.dto;

import com.backend.model.*;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

import java.util.List;

@Data
public class UserDTO {

    private Long id;
    private String name;
    private String surname;
    private String patronymic;
    private String description;
    private String email;
    private String telegram;
    private String phone;
    private String university;
    private String role;
    private List<String> studentGroups;

    public UserDTO(User user) {

    }
}
