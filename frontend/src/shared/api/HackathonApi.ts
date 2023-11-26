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
  export interface Question {
    commentCorrect?: string;
    commentError?: string;
    commentWithoutAnswer?: string;
    id?: number;
    mark?: number;
    mixAnswer?: boolean;
    questionGroup?: HackathonApi.QuestionGroup;
    questionText?: string;
  }
  export interface QuestionBase {
    id?: number;
    name?: string;
    subject?: HackathonApi.Subject;
  }
  export interface QuestionGroup {
    id?: number;
    name?: string;
    questionBase?: HackathonApi.QuestionBase;
  }
  export interface Subject {
    id?: number;
    name?: string;
    university?: HackathonApi.University;
  }
  export interface TestOutputDTO {
    description?: string;
    duration?: number;
    id?: number;
    link?: string;
    name?: string;
    questionsList?: HackathonApi.Question[];
  }
  export interface University {
    description?: string;
    id?: number;
    name?: string;
  }
  export interface SubjectInputDTO {
    name?: string;
  }
  export interface SubjectOutputDTO {
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
    answerText?: string;
    correct?: boolean;
  }
  export interface AnswerOutputDTO {
    answerText?: string;
    correct?: boolean;
    id?: number;
  }
  export interface UserInputDTO {
    description?: string;
    email?: string;
    name?: string;
    patronymic?: string;
    phone?: string;
    role?: string;
    studentGroups?: string[];
    surname?: string;
    telegram?: string;
    university?: string;
  }
  export interface StudentOutputDTO {
    id?: number;
    name?: string;
    patronymic?: string;
    surname?: string;
    username?: string;
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
    '/user/registeration': {
      POST: {
        body: HackathonApi.UserInputDTO;
        response: ArrayBuffer;
        responseType: 'arraybuffer';
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
        response: HackathonApi.QuestionOutputDTO;
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
        response: HackathonApi.AnswerOutputDTO;
      };
    };
    '/active-test/{testId}': {
      POST: {
        body: number[];
        params: {
          testId: number;
        };
        response: HackathonApi.StudentOutputDTO;
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
    '/test/delete-question/{testId}': {
      DELETE: {
        body: number[];
        params: {
          testId: number;
        };
        response: HackathonApi.QuestionOutputDTO;
      };
    };
  };
}
