package com.backend.model.student;

import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.studentGroup.dto.StudentGroupOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/{groupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = StudentOutputDTO.class))))
    public List<StudentOutputDTO> getAllStudents(@PathVariable Long groupId){
        return studentService.getAllStudents(groupId);
    }

    @GetMapping("info/{studentId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = StudentOutputDTO.class)))
    public StudentOutputDTO getInfoStudent(@PathVariable Long studentId){
        return studentService.geInfoStudent(studentId);
    }
}
