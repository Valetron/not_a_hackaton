package com.backend.model.resultQuestion;

import com.backend.model.resultQuestion.dto.ResultQuestionDTO;
import com.backend.model.resultTest.dto.ResultTestOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/result-question")
public class ResultQuestionController {

    @Autowired
    private ResultQuestionService resultQuestionService;

    @GetMapping("/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = ResultQuestionDTO.class))))
    public List<ResultQuestionDTO> getAllResultTests(@PathVariable Long testId){
        return resultQuestionService.getAllQuestions(testId);
    }
}
