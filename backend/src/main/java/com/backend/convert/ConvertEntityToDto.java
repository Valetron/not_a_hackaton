package com.backend.convert;

import com.backend.model.answer.Answer;
import com.backend.model.answer.dto.AnswerOutputDTO;
import com.backend.model.question.Question;
import com.backend.model.question.dto.QuestionOutputDTO;
import com.backend.model.question.dto.QuestionOutputDtoForBot;
import com.backend.model.questionBase.QuestionBase;
import com.backend.model.questionBase.dto.QuestionBaseOutputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.questionGroup.dto.QuestionGroupOutputDTO;
import com.backend.model.resultAnswer.ResultAnswer;
import com.backend.model.resultAnswer.dto.ResultAnswerDTO;
import com.backend.model.resultQuestion.ResultQuestion;
import com.backend.model.resultQuestion.dto.ResultQuestionDTO;
import com.backend.model.resultTest.ResultTest;
import com.backend.model.resultTest.dto.ResultTestOutputDTO;
import com.backend.model.selectedStudAnswer.SelectedAnswer;
import com.backend.model.selectedStudAnswer.dto.SelectedAnswerOutputDTO;
import com.backend.model.student.Student;
import com.backend.model.student.dto.StudentOutputDTO;
import com.backend.model.studentGroup.StudentGroup;
import com.backend.model.studentGroup.dto.StudentGroupOutputDTO;
import com.backend.model.subject.Subject;
import com.backend.model.subject.dto.SubjectOutputDTO;
import com.backend.model.test.Test;
import com.backend.model.test.dto.TestOutputDTO;
import com.backend.model.university.University;
import com.backend.model.university.dto.UniversityOutputDTO;
import com.backend.model.user.User;
import com.backend.model.user.dto.UserOutputDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConvertEntityToDto {

    @Autowired
    private ModelMapper modelMapper;

    public ResultTestOutputDTO resultTestToDto(ResultTest resultTest){
        return modelMapper.map(resultTest, ResultTestOutputDTO.class);
    }

    public ResultQuestionDTO resultQuestionToDto(ResultQuestion resultQuestion){
        return modelMapper.map(resultQuestion, ResultQuestionDTO.class);
    }

    public ResultAnswerDTO resultAnswerToDto(ResultAnswer resultAnswer){
        return modelMapper.map(resultAnswer, ResultAnswerDTO.class);
    }

    public SelectedAnswerOutputDTO selectedAnswerToDto(SelectedAnswer selectedAnswer){
        return modelMapper.map(selectedAnswer, SelectedAnswerOutputDTO.class);
    }



    public QuestionOutputDtoForBot questionInTestToDtoForBot(Question question){
        return modelMapper.map(question, QuestionOutputDtoForBot.class);
    }

    public UserOutputDTO userToDto(User user){
        return modelMapper.map(user, UserOutputDTO.class);
    }

    public AnswerOutputDTO answerToDto(Answer answer){
        return modelMapper.map(answer, AnswerOutputDTO.class);
    }
    public QuestionOutputDTO questionToDto(Question question){
        return modelMapper.map(question, QuestionOutputDTO.class);
    }

    public QuestionBaseOutputDTO questionBaseToDto(QuestionBase questionBase){
        return modelMapper.map(questionBase, QuestionBaseOutputDTO.class);
    }

    public QuestionGroupOutputDTO questionGroupToDto(QuestionGroup questionGroup){
        return modelMapper.map(questionGroup, QuestionGroupOutputDTO.class);
    }

    public SubjectOutputDTO subjectToDto(Subject subject){
        return modelMapper.map(subject, SubjectOutputDTO.class);
    }

    public UniversityOutputDTO universityToDto(University university){
        return modelMapper.map(university, UniversityOutputDTO.class);
    }

    public TestOutputDTO testToDto(Test test){
        return  modelMapper.map(test, TestOutputDTO.class);
    }

    public StudentOutputDTO studentToDto(Student student){
        return modelMapper.map(student, StudentOutputDTO.class);
    }

    public StudentGroupOutputDTO studentGroupToDto(StudentGroup studentGroup){
        return modelMapper.map(studentGroup, StudentGroupOutputDTO.class);
    }
}
