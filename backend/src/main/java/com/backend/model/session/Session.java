package com.backend.model.session;

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
