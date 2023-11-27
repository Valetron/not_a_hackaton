package com.backend.model.subject;

import com.backend.model.subject.dto.SubjectInputDTO;
import com.backend.model.subject.dto.SubjectOutputDTO;
import com.backend.model.subject.SubjectService;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    private SubjectService subjectService;

    @PostMapping("/{universityId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(
            mediaType = "application/json", schema = @Schema(implementation = SubjectOutputDTO.class)))
    public SubjectOutputDTO createSubject(@PathVariable Long universityId, @RequestBody SubjectInputDTO subjectDTO){
        return subjectService.createSubject(universityId, subjectDTO);
    }

    @GetMapping("/get-all/{universityId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = SubjectOutputDTO.class))))
    public List<SubjectOutputDTO> getAllSubjects(@PathVariable Long universityId) {
        return subjectService.getAllSubjects(universityId);
    }

    @GetMapping("/get-one/{subjectId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = SubjectOutputDTO.class)))
    public SubjectOutputDTO getSubject(@PathVariable Long subjectId){
        return subjectService.getSubject(subjectId);
    }

    @PutMapping("/{subjectId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(
            mediaType = "application/json", schema = @Schema(implementation = SubjectOutputDTO.class)))
    public SubjectOutputDTO updateSubject(@PathVariable Long subjectId,
                                          @RequestBody SubjectInputDTO subjectDTO){
        return subjectService.updateSubject(subjectId, subjectDTO);
    }

    @DeleteMapping("/{subjectId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(
            mediaType = "application/json", schema = @Schema(implementation = SubjectOutputDTO.class)))
    public SubjectOutputDTO deleteSubject(@PathVariable Long subjectId){
        return subjectService.deleteSubject(subjectId);
    }
}
