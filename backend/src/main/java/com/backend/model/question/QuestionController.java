package com.backend.model.question;

import com.backend.model.question.dto.QuestionInputDTO;
import com.backend.model.question.QuestionService;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.questionGroup.dto.QuestionGroupOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question")
public class QuestionController {

    @Autowired
    private QuestionService questionService;

    @PostMapping("/{questionGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionGroupOutputDTO.class)))
    public QuestionOutputDTO createQuestion(@PathVariable Long questionGroupId,
                                            @RequestBody QuestionInputDTO questionDTO){
        return questionService.createQuestion(questionGroupId, questionDTO);
    }

    @GetMapping("/get-all/{questionGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = QuestionOutputDTO.class))))
    public List<QuestionOutputDTO> getAllQuestion(@PathVariable Long questionGroupId){
        return questionService.getAllQuestions(questionGroupId);
    }

    @GetMapping("/get-one/{questionId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionOutputDTO.class)))
    public QuestionOutputDTO getQuestion(@PathVariable Long questionId){
        return questionService.getQuestion(questionId);
    }

    @PutMapping("/{questionId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionOutputDTO.class)))
    public QuestionOutputDTO updateQuestion(@PathVariable Long questionId,
                                            @RequestBody QuestionInputDTO questionInputDTO){
        return questionService.updateQuestion(questionId, questionInputDTO);
    }

    @DeleteMapping("/{questionId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionOutputDTO.class)))
    public QuestionOutputDTO deleteQuestion(@PathVariable Long questionId){
        return questionService.deletequestion(questionId);
    }

}
