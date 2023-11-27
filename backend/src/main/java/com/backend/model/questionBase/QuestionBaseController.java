package com.backend.model.questionBase;

import com.backend.model.questionBase.dto.QuestionBaseInputDTO;
import com.backend.model.questionBase.dto.QuestionBaseOutputDTO;
import com.backend.model.questionBase.QuestionBaseServise;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question-base")
public class QuestionBaseController {

    @Autowired
    private QuestionBaseServise questionBaseServise;

    @PostMapping("/{subjectId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionBaseOutputDTO.class)))
    public QuestionBaseOutputDTO createQuestionBase(@PathVariable Long subjectId,
                                                    @RequestBody QuestionBaseInputDTO questionBaseDTO){
        return questionBaseServise.createQuestionBase(subjectId, questionBaseDTO);
    }

    @GetMapping("/get-all/{subjectId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionBaseOutputDTO.class)))
    public List<QuestionBaseOutputDTO> getAllQuestionBases(@PathVariable Long subjectId){
        return questionBaseServise.getAllQuestionBases(subjectId);
    }

    @GetMapping("/get-one/{questionBaseId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionBaseOutputDTO.class)))
    public QuestionBaseOutputDTO getQuestionBase(@PathVariable Long questionBaseId){
        return questionBaseServise.getQuestionBase(questionBaseId);
    }

    @PutMapping("/{questionBaseId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionBaseOutputDTO.class)))
    public QuestionBaseOutputDTO updateQuestionBase(@PathVariable Long questionBaseId,
                                                    @RequestBody QuestionBaseInputDTO questionBaseDTO){
        return questionBaseServise.updateQuestionBase(questionBaseId, questionBaseDTO);
    }

    @DeleteMapping("/{questionBaseId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionBaseOutputDTO.class)))
    public QuestionBaseOutputDTO deleteQuestionBase(@PathVariable Long questionBaseId){
        return questionBaseServise.deleteQuestionBase(questionBaseId);
    }
}
