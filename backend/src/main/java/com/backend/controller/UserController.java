package com.backend.controller;

import com.backend.dto.UserDTO;
import com.backend.model.User;
import com.backend.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
@Tag(name = "API юзеров", description = "API для работы с юзерами")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/info/{userId}")
    @Operation(summary = "информация о новом юзере")
    public User userInfo(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    @PostMapping
    @Operation(summary = "создание нового юзера")

}
