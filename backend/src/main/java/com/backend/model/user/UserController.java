package com.backend.model.user;

import com.backend.model.user.dto.UserInputDTO;
import com.backend.model.user.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@Tag(name = "API юзеров", description = "API для работы с юзерами")
public class UserController {

    @Autowired
    private UserService userService;

//    @GetMapping("/info/{userId}")
//    @Operation(summary = "информация о новом юзере")
//    public UserDTO userInfo(@PathVariable Long userId) {
//
//        return userService.getUserById(userId);
//    }

    @PostMapping("/registeration")
    @Operation(summary = "регистрация")
    public UserInputDTO userRegistration(@RequestBody UserInputDTO userDTO){
        userService.createUser(userDTO);
        return userDTO;
    }

}
