export namespace HackathonApi {
  export interface UniversityInputDTO {
    description?: string;
    name?: string;
  }
  export interface UniversityOutputDTO {
    description?: string;
    id?: number;
    name?: string;
  }
  export interface TestInputDTO {
    description?: string;
    duration?: number;
    link?: string;
    name?: string;
  }
  export interface TestOutputDTO {
    description?: string;
    duration?: number;
    id?: number;
    link?: string;
    name?: string;
  }
  export interface SubjectInputDTO {
    name?: string;
  }
  export interface SubjectOutputDTO {
    id?: number;
    name?: string;
  }
  export interface StudentGroupInputDTO {
    name?: string;
  }
  export interface StudentGroupOutputDTO {
    id?: number;
    name?: string;
  }
  export interface QuestionInputDTO {
    commentCorrect?: string;
    commentError?: string;
    commentWithoutAnswer?: string;
    mark?: number;
    mixAnswer?: boolean;
    questionText?: string;
  }
  export interface QuestionOutputDTO {
    commentCorrect?: string;
    commentError?: string;
    commentWithoutAnswer?: string;
    id?: number;
    mark?: number;
    mixAnswer?: boolean;
    questionText?: string;
  }
  export interface QuestionGroupInputDTO {
    name?: string;
  }
  export interface QuestionGroupOutputDTO {
    id?: number;
    name?: string;
  }
  export interface QuestionBaseInputDTO {
    name?: string;
  }
  export interface QuestionBaseOutputDTO {
    id?: number;
    name?: string;
  }
  export interface AnswerInputDTO {
    isCorrect?: boolean;
    name?: string;
  }
  export interface AnswerOutputDTO {
    id?: number;
    isCorrect?: boolean;
    name?: string;
  }
  export interface UserInputDTO {
    description?: string;
    email?: string;
    name?: string;
    password?: string;
    patronymic?: string;
    phone?: string;
    role?: string;
    surname?: string;
    universityId?: number;
  }
  export interface UserOutputDTO {
    description?: string;
    email?: string;
    id?: number;
    name?: string;
    patronymic?: string;
    phone?: string;
    role?: string;
    surname?: string;
    universityId?: number;
  }
  export interface UserAuthDTO {
    email?: string;
    password?: string;
  }
  export interface StudentOutputDTO {
    id?: number;
    name?: string;
    patronymic?: string;
    surname?: string;
    username?: string;
  }
  export interface ResultTestOutputDTO {
    beginningTest?: string;
    correctCount?: number;
    duration?: number;
    endingTest?: string;
    id?: number;
    mark?: number;
    percent?: number;
    testName?: string;
  }
  export interface ResultQuestionDTO {
    comment?: string;
    duration?: string;
    id?: number;
    mark?: number;
    name?: string;
  }
  export interface ResultAnswerDTO {
    id?: number;
    isCorrect?: boolean;
    isSelected?: boolean;
    name?: string;
  }
}

export interface HackathonApi {
  version: '1';
  routes: {
    '/university/{universityId}': {
      GET: {
        params: {
          universityId: number;
        };
        response: HackathonApi.UniversityOutputDTO;
      };
      PUT: {
        body: HackathonApi.UniversityInputDTO;
        params: {
          universityId: number;
        };
        response: HackathonApi.UniversityOutputDTO;
      };
      DELETE: {
        params: {
          universityId: number;
        };
        response: HackathonApi.UniversityOutputDTO;
      };
    };
    '/test/{testId}': {
      PUT: {
        body: HackathonApi.TestInputDTO;
        params: {
          testId: number;
        };
        response: HackathonApi.TestOutputDTO;
      };
      DELETE: {
        params: {
          testId: number;
        };
        response: HackathonApi.TestOutputDTO;
      };
    };
    '/subject/{subjectId}': {
      PUT: {
        body: HackathonApi.SubjectInputDTO;
        params: {
          subjectId: number;
        };
        response: HackathonApi.SubjectOutputDTO;
      };
      DELETE: {
        params: {
          subjectId: number;
        };
        response: HackathonApi.SubjectOutputDTO;
      };
    };
    '/student-group/{studentGroupId}': {
      PUT: {
        params: {
          studentGroupId: number;
        };
        query: {
          studentGroupInput: HackathonApi.StudentGroupInputDTO;
        };
        response: HackathonApi.StudentGroupOutputDTO;
      };
      DELETE: {
        params: {
          studentGroupId: number;
        };
        response: HackathonApi.StudentGroupOutputDTO;
      };
    };
    '/question/{questionId}': {
      PUT: {
        body: HackathonApi.QuestionInputDTO;
        params: {
          questionId: number;
        };
        response: HackathonApi.QuestionOutputDTO;
      };
      DELETE: {
        params: {
          questionId: number;
        };
        response: HackathonApi.QuestionOutputDTO;
      };
    };
    '/question-group/{questionGroupId}': {
      PUT: {
        body: HackathonApi.QuestionGroupInputDTO;
        params: {
          questionGroupId: number;
        };
        response: HackathonApi.QuestionGroupOutputDTO;
      };
      DELETE: {
        params: {
          questionGroupId: number;
        };
        response: HackathonApi.QuestionGroupOutputDTO;
      };
    };
    '/question-base/{questionBaseId}': {
      PUT: {
        body: HackathonApi.QuestionBaseInputDTO;
        params: {
          questionBaseId: number;
        };
        response: HackathonApi.QuestionBaseOutputDTO;
      };
      DELETE: {
        params: {
          questionBaseId: number;
        };
        response: HackathonApi.QuestionBaseOutputDTO;
      };
    };
    '/answer/{answerId}': {
      PUT: {
        body: HackathonApi.AnswerInputDTO;
        params: {
          answerId: number;
        };
        response: HackathonApi.AnswerOutputDTO;
      };
      DELETE: {
        params: {
          answerId: number;
        };
        response: HackathonApi.AnswerOutputDTO;
      };
    };
    '/user/registration': {
      POST: {
        body: HackathonApi.UserInputDTO;
        response: HackathonApi.UserOutputDTO;
      };
    };
    '/user/auth': {
      POST: {
        body: HackathonApi.UserAuthDTO;
        response: HackathonApi.UserOutputDTO;
      };
    };
    '/university': {
      GET: {
        response: HackathonApi.UniversityOutputDTO[];
      };
      POST: {
        body: HackathonApi.UniversityInputDTO;
        response: HackathonApi.UniversityOutputDTO;
      };
    };
    '/test/{subjectId}': {
      GET: {
        params: {
          subjectId: number;
        };
        response: HackathonApi.TestOutputDTO[];
      };
      POST: {
        body: HackathonApi.TestInputDTO;
        params: {
          subjectId: number;
        };
        response: HackathonApi.TestOutputDTO;
      };
    };
    '/test/add-question/{testId}': {
      POST: {
        body: number[];
        params: {
          testId: number;
        };
        response: HackathonApi.QuestionOutputDTO[];
      };
    };
    '/subject/{universityId}': {
      POST: {
        body: HackathonApi.SubjectInputDTO;
        params: {
          universityId: number;
        };
        response: HackathonApi.SubjectOutputDTO;
      };
    };
    '/student-group/{universityId}': {
      GET: {
        params: {
          universityId: number;
        };
        response: HackathonApi.StudentGroupOutputDTO[];
      };
      POST: {
        body: HackathonApi.StudentGroupInputDTO;
        params: {
          universityId: number;
        };
        response: HackathonApi.StudentGroupOutputDTO;
      };
    };
    '/question/{questionGroupId}': {
      POST: {
        body: HackathonApi.QuestionInputDTO;
        params: {
          questionGroupId: number;
        };
        response: HackathonApi.QuestionGroupOutputDTO;
      };
    };
    '/question-group/{questionBaseId}': {
      POST: {
        body: HackathonApi.QuestionGroupInputDTO;
        params: {
          questionBaseId: number;
        };
        response: HackathonApi.QuestionGroupOutputDTO;
      };
    };
    '/question-base/{subjectId}': {
      POST: {
        body: HackathonApi.QuestionBaseInputDTO;
        params: {
          subjectId: number;
        };
        response: HackathonApi.QuestionBaseOutputDTO;
      };
    };
    '/answer/{questionIds}': {
      POST: {
        body: HackathonApi.AnswerInputDTO[];
        params: {
          questionIds: number;
        };
        response: HackathonApi.AnswerOutputDTO[];
      };
    };
    '/active-test/{testId}': {
      POST: {
        body: number[];
        params: {
          testId: number;
        };
        response: HackathonApi.StudentOutputDTO[];
      };
      DELETE: {
        body: number[];
        params: {
          testId: number;
        };
        response: HackathonApi.StudentOutputDTO;
      };
    };
    '/user/info/{userId}': {
      GET: {
        params: {
          userId: number;
        };
        response: HackathonApi.UserOutputDTO;
      };
    };
    '/user/get-teachers/{universityId}': {
      GET: {
        params: {
          universityId: number;
        };
        response: HackathonApi.UserOutputDTO[];
      };
    };
    '/subject/get-one/{subjectId}': {
      GET: {
        params: {
          subjectId: number;
        };
        response: HackathonApi.SubjectOutputDTO;
      };
    };
    '/subject/get-all/{universityId}': {
      GET: {
        params: {
          universityId: number;
        };
        response: HackathonApi.SubjectOutputDTO[];
      };
    };
    '/student/{groupId}': {
      GET: {
        params: {
          groupId: number;
        };
        response: HackathonApi.StudentOutputDTO[];
      };
    };
    '/student/info/{studentId}': {
      GET: {
        params: {
          studentId: number;
        };
        response: HackathonApi.StudentOutputDTO;
      };
    };
    '/result-test/{studentId}': {
      GET: {
        params: {
          studentId: number;
        };
        response: HackathonApi.ResultTestOutputDTO[];
      };
    };
    '/result-question/{testId}': {
      GET: {
        params: {
          testId: number;
        };
        response: HackathonApi.ResultQuestionDTO[];
      };
    };
    '/result-answer/{questionId}': {
      GET: {
        params: {
          questionId: number;
        };
        response: HackathonApi.ResultAnswerDTO[];
      };
    };
    '/question/get-one/{questionId}': {
      GET: {
        params: {
          questionId: number;
        };
        response: HackathonApi.QuestionOutputDTO;
      };
    };
    '/question/get-all/{questionGroupId}': {
      GET: {
        params: {
          questionGroupId: number;
        };
        response: HackathonApi.QuestionOutputDTO[];
      };
    };
    '/question-group/get-one/{questionGroupId}': {
      GET: {
        params: {
          questionGroupId: number;
        };
        response: HackathonApi.QuestionGroupOutputDTO;
      };
    };
    '/question-group/get-all/{questionBaseId}': {
      GET: {
        params: {
          questionBaseId: number;
        };
        response: HackathonApi.QuestionGroupOutputDTO[];
      };
    };
    '/question-base/get-one/{questionBaseId}': {
      GET: {
        params: {
          questionBaseId: number;
        };
        response: HackathonApi.QuestionBaseOutputDTO;
      };
    };
    '/question-base/get-all/{subjectId}': {
      GET: {
        params: {
          subjectId: number;
        };
        response: HackathonApi.QuestionBaseOutputDTO;
      };
    };
    '/answer/{questionId}': {
      GET: {
        params: {
          questionId: number;
        };
        response: HackathonApi.AnswerOutputDTO[];
      };
    };
    '/active-test/{studentId}': {
      GET: {
        params: {
          studentId: number;
        };
        response: HackathonApi.StudentOutputDTO[];
      };
    };
    '/test/delete-question/{testId}': {
      DELETE: {
        body: number[];
        params: {
          testId: number;
        };
        response: HackathonApi.QuestionOutputDTO[];
      };
    };
  };
}
