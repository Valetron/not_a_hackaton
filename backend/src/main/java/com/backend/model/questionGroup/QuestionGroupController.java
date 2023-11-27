package com.backend.model.questionGroup;

import com.backend.model.questionGroup.dto.QuestionGroupInputDTO;
import com.backend.model.questionGroup.dto.QuestionGroupOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question-group")
public class QuestionGroupController {

    @Autowired
    private QuestionGroupService questionGroupService;

    @PostMapping("/{questionBaseId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = QuestionGroupOutputDTO.class)))
    public QuestionGroupOutputDTO craeteQuestionGroup(@PathVariable Long questionBaseId, @RequestBody QuestionGroupInputDTO questionGroupDTO){
        return questionGroupService.createQuestionGroup(questionBaseId, questionGroupDTO);
    }

    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = QuestionGroupOutputDTO.class))))
    @GetMapping("/get-all/{questionBaseId}")
    public List<QuestionGroupOutputDTO> getAllQuestionGroups(@PathVariable Long questionBaseId){
        return questionGroupService.getAllQuestionGroups(questionBaseId);
    }

    @GetMapping("/get-one/{questionGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = QuestionGroupOutputDTO.class)))
    public QuestionGroupOutputDTO getQuestionGroup(@PathVariable Long questionGroupId){
        return questionGroupService.getQuestionGroup(questionGroupId);
    }

    @PutMapping("/{questionGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = QuestionGroupOutputDTO.class)))
    public QuestionGroupOutputDTO updateQuestionGroup(@PathVariable Long questionGroupId,
                                                      @RequestBody QuestionGroupInputDTO questionGroupDTO){
        return questionGroupService.updateQuestionGroup(questionGroupId, questionGroupDTO);
    }

    @DeleteMapping("/{questionGroupId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = QuestionGroupOutputDTO.class)))
    public QuestionGroupOutputDTO deleteSQuestionGroup(@PathVariable Long questionGroupId){
        return questionGroupService.deleteQuestionGroup(questionGroupId);
    }
}
