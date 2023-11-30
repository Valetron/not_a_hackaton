package com.backend.model.activeTest;

import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.test.dto.TestOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/active-test")
public class ActiveTestController {

    @Autowired
    private ActiveTestService activeTestService;

    @PostMapping("/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = StudentOutputDTO.class))))
    public List<StudentOutputDTO> addTests(@PathVariable Long testId, @RequestBody Long[] studentIdList){
        return activeTestService.addTests(testId, studentIdList);
    }

    @GetMapping("/{studentId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = StudentOutputDTO.class))))
    public List<TestOutputDTO> getAllTests(@PathVariable Long studentId){
        return activeTestService.getAllTestsByStudentId(studentId);
    }

    @DeleteMapping("/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = StudentOutputDTO.class)))
    public List<StudentOutputDTO> removeTests(@PathVariable Long testId, @RequestBody Long[] studentIds){
        return activeTestService.removeTests(testId, studentIds);
    }
}
