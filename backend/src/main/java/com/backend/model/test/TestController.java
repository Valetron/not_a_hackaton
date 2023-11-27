package com.backend.model.test;

import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.test.dto.TestInputDTO;
import com.backend.model.test.dto.TestOutputDTO;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test")
public class TestController {

    @Autowired
    private TestServise testServise;

    @PostMapping("/{subjectId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = TestOutputDTO.class)))
    public TestOutputDTO createAnswer(@PathVariable Long subjectId, @RequestBody TestInputDTO testInputDTO){
            return testServise.createTest(subjectId, testInputDTO);
    }

    @GetMapping("/{subjectId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = TestOutputDTO.class))))
    public List<TestOutputDTO> getAllAnswers(@PathVariable Long subjectId){
        return testServise.getAllTests(subjectId);
    }

    @PutMapping("/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = TestOutputDTO.class)))
    public TestOutputDTO updateAnswer(@PathVariable Long testId,
                                        @RequestBody TestInputDTO testInputDTO){
        return testServise.updateTest(testId, testInputDTO);
    }

    @DeleteMapping("/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            schema = @Schema(implementation = TestOutputDTO.class)))
    public TestOutputDTO deleteAnswer(@PathVariable Long testId){
        return testServise.deleteTest(testId);
    }

    @PostMapping("/add-question/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = QuestionOutputDTO.class))))
    public List<QuestionOutputDTO> addQuestion(@PathVariable Long testId, @RequestBody Long[] questionIds){
        return testServise.addQuestions(testId, questionIds);
    }

    @DeleteMapping("/delete-question/{testId}")
    @ApiResponse(responseCode = "200", description = "Successful Operation",
            content = @Content(mediaType = "application/json",
            array = @ArraySchema(schema = @Schema(implementation = QuestionOutputDTO.class))))
    public List<QuestionOutputDTO> deleteQuestion(@PathVariable Long testId, @RequestBody Long[] questionIds){
        return testServise.deleteQuestion(testId, questionIds);
    }
}
