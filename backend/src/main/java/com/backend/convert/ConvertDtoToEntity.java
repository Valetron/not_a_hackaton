package com.backend.convert;

import com.backend.model.answer.Answer;
import com.backend.model.answer.dto.AnswerInputDTO;
import com.backend.model.question.Question;
import com.backend.model.question.dto.QuestionInputDTO;
import com.backend.model.questionBase.QuestionBase;
import com.backend.model.questionBase.dto.QuestionBaseInputDTO;
import com.backend.model.questionGroup.QuestionGroup;
import com.backend.model.questionGroup.dto.QuestionGroupInputDTO;
import com.backend.model.student.Student;
import com.backend.model.student.dto.StudentInputDTO;
import com.backend.model.studentGroup.StudentGroup;
import com.backend.model.studentGroup.dto.StudentGroupInputDTO;
import com.backend.model.subject.Subject;
import com.backend.model.subject.dto.SubjectInputDTO;
import com.backend.model.test.Test;
import com.backend.model.test.dto.TestInputDTO;
import com.backend.model.university.University;
import com.backend.model.university.dto.UniversityInputDTO;
import com.backend.model.user.User;
import com.backend.model.user.dto.UserInputDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ConvertDtoToEntity {

    @Autowired
    private ModelMapper modelMapper;

    public User userToEntity(UserInputDTO userDTO){
        return modelMapper.map(userDTO, User.class);
    }

    public Answer answerToEntity(AnswerInputDTO answerDTO){
        return modelMapper.map(answerDTO, Answer.class);
    }
    public Question questionToEntity(QuestionInputDTO questionDTO){
        return modelMapper.map(questionDTO, Question.class);
    }

    public QuestionBase questionBaseToEntity(QuestionBaseInputDTO questionBaseDTO){
        return modelMapper.map(questionBaseDTO, QuestionBase.class);
    }

    public QuestionGroup questionGroupToEntity(QuestionGroupInputDTO questionGroupDTO){
        return modelMapper.map(questionGroupDTO, QuestionGroup.class);
    }

    public Subject subjectToEntity(SubjectInputDTO subjectDTO){
        return modelMapper.map(subjectDTO, Subject.class);
    }

    public University universityToEntity(UniversityInputDTO universityDTO){
        return modelMapper.map(universityDTO, University.class);
    }

    public Test testToEntity(TestInputDTO testInputDTO){
        return modelMapper.map(testInputDTO, Test.class);
    }

    public Student studentToEntity(StudentInputDTO studentInputDTO){
        return modelMapper.map(studentInputDTO, Student.class);
    }

    public StudentGroup studentGroupToEntity(StudentGroupInputDTO studentGroupInputDTO){
        return modelMapper.map(studentGroupInputDTO, StudentGroup.class);
    }
}
