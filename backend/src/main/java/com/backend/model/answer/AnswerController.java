package com.backend.model.answer;

import com.backend.model.answer.dto.AnswerInputDTO;
import com.backend.model.answer.dto.AnswerOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerController {

    @Autowired
    private AnswerService answerService;
    @PostMapping("/{questionIds}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = AnswerOutputDTO.class))))
    public List<AnswerOutputDTO> createAnswer(@PathVariable Long questionIds, @RequestBody AnswerInputDTO[] answerDTOs){
        return answerService.createAnswer(questionIds, answerDTOs);
    }

    @GetMapping("/{questionId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = AnswerOutputDTO.class))))
    public List<AnswerOutputDTO> getAllAnswers(@PathVariable Long questionId){
        return answerService.getAllAnswers(questionId);
    }

    @PutMapping("/{answerId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = AnswerOutputDTO.class)))
    public AnswerOutputDTO updateAnswer(@PathVariable Long answerId,
                                        @RequestBody AnswerInputDTO answerInputDTO){
        return answerService.updateAnswer(answerId, answerInputDTO);
    }

    @DeleteMapping("/{answerId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = AnswerOutputDTO.class)))
    public AnswerOutputDTO deleteAnswer(@PathVariable Long answerId){
        return answerService.deleteAnswer(answerId);
    }
}
