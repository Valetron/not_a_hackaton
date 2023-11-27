package com.backend.model.studentGroup;

import com.backend.model.studentGroup.dto.StudentGroupInputDTO;
import com.backend.model.studentGroup.dto.StudentGroupOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student-group")
public class StudentGroupController {

    @Autowired
    private StudentGroupService studentGroupService;

    @PostMapping("/{universityId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = StudentGroupOutputDTO.class)))
    public StudentGroupOutputDTO createStudentGroup(@PathVariable Long universityId,
                                                    @RequestBody StudentGroupInputDTO studentGroupInput){
        return studentGroupService.createGroup(universityId, studentGroupInput);
    }

    @GetMapping("/{universityId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = StudentGroupOutputDTO.class))))
    public List<StudentGroupOutputDTO> getAllStudentGroup(@PathVariable Long universityId){
        return studentGroupService.getAllGroups(universityId);
    }

    @DeleteMapping("/{studentGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = StudentGroupOutputDTO.class)))
    public StudentGroupOutputDTO deleteStudentGroup(@PathVariable Long studentGroupId){
        return studentGroupService.deleteGroup(studentGroupId);
    }

    @PutMapping("/{studentGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = StudentGroupOutputDTO.class)))
    public StudentGroupOutputDTO updateStudentGroup(@PathVariable Long studentGroupId,
                                                    StudentGroupInputDTO studentGroupInput){
        return studentGroupService.updateGroup(studentGroupId, studentGroupInput);
    }
}
