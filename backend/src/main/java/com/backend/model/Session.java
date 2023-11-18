package com.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Session {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String refreshToken;
}
