package com.backend.model.resultTest;

import com.backend.model.questionGroup.dto.QuestionGroupOutputDTO;
import com.backend.model.resultTest.dto.ResultTestOutputDTO;
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
@RequestMapping("/result-test")
public class ResultTestController {

    @Autowired
    private ResultTestService resultTestService;

    @GetMapping("/{studentId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ResultTestOutputDTO.class))))
    public List<ResultTestOutputDTO> getAllResultTests(@PathVariable Long studentId){
        return resultTestService.getAllResultTests(studentId);
    }
}
