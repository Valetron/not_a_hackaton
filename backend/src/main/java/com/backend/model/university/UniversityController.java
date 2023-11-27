package com.backend.model.university;

import com.backend.model.university.dto.UniversityInputDTO;
import com.backend.model.university.dto.UniversityOutputDTO;
import com.backend.model.university.UniversityService;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/university")
public class UniversityController {

    @Autowired
    private UniversityService universityServer;

    @PostMapping
    @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(
            mediaType = "application/json", schema = @Schema(implementation = UniversityOutputDTO.class)))
    public UniversityOutputDTO createUniversity(@RequestBody UniversityInputDTO universityDTO){
        return universityServer.createUniversity(universityDTO);
    }

    @GetMapping
    @ApiResponse(description = "Successful Operation", responseCode = "200",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = UniversityOutputDTO.class))))
    public List<UniversityOutputDTO> getAllUniversity() {
        return universityServer.getAllUniversities();
    }

    @GetMapping("/{universityId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = UniversityOutputDTO.class)))
    public UniversityOutputDTO getUniversity(@PathVariable Long universityId) {
        return universityServer.getUniversity(universityId);
    }

    @PutMapping("/{universityId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(
            mediaType = "application/json", schema = @Schema(implementation = UniversityOutputDTO.class)))
    public UniversityOutputDTO updateUniversity(@PathVariable Long universityId,
                                                @RequestBody UniversityInputDTO universityDTO){
        return universityServer.updateUniversity(universityId, universityDTO);
    }

    @DeleteMapping("/{universityId}")
    @ApiResponse(description = "Successful Operation", responseCode = "200", content = @Content(
            mediaType = "application/json", schema = @Schema(implementation = UniversityOutputDTO.class)))
    public UniversityOutputDTO deleteUniversity(@PathVariable Long universityId){
        return universityServer.deleteUniversity(universityId);
    }

}
