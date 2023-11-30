package com.backend.model.user;

import com.backend.model.test.dto.TestOutputDTO;
import com.backend.model.user.dto.UserAuthDTO;
import com.backend.model.user.dto.UserInputDTO;
import com.backend.model.user.UserService;
import com.backend.model.user.dto.UserOutputDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@Tag(name = "API юзеров", description = "API для работы с юзерами")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/get-teachers/{universityId}")
    @Operation(summary = "информация о учителях")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = UserOutputDTO.class))))
    public List<UserOutputDTO> getAllTeachers(@PathVariable Long universityId) {
        return userService.getAllTeacher(universityId);
    }

    @GetMapping("/info/{userId}")
    @Operation(summary = "информация юзере")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserOutputDTO.class)))
    public UserOutputDTO userInfo(@PathVariable Long userId) {
        return userService.getUserInfo(userId);
    }

    @PostMapping("/registration")
    @Operation(summary = "регистрация")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserOutputDTO.class)))
    public ResponseEntity<Void> userRegistration(@RequestBody UserInputDTO userDTO){
        return userService.createUser(userDTO);
    }

    @PostMapping("/auth")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UserOutputDTO.class)))
    public UserOutputDTO userAuth(@RequestBody UserAuthDTO userAuthDTO){
        return userService.authUser(userAuthDTO);
    }

}
