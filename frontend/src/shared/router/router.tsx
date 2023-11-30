import React from 'react';
import LoginPage from '@/pages/Login';
import RegistrationPage from '@/pages/RegistrationPage';
import SuperadminPage from '@/pages/SuperadminPage';
import UniversityInfoPage from '@/pages/UniversityInfoPage';
import SubjectInfoPage from '@/pages/SubjectInfoPage';
import QuestionBaseInfoPage from '@/pages/QuestionBaseInfoPage';
import StudentInfoPage from '@/pages/StudentInfoPage/StudentInfoPage';

const unsignedRoutes = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
  },
];

export const superAdminRoutes = [
  {
    path: '/superadmin',
    element: <SuperadminPage />,
  },
  {
    path: '/university/:universityId',
    element: <UniversityInfoPage />,
  },
  {
    path: '/university/:universityId/subject/:subjectId',
    element: <SubjectInfoPage />,
  },
  {
    path: '/university/:universityId/subject/:subjectId/questionBase/:questionBaseId',
    element: <QuestionBaseInfoPage />,
  },
  {
    path: '/university/:universityId/student/:studentId',
    element: <StudentInfoPage />,
  },
];

export const teacherRoutes = [
  {
    path: '/university/:universityId',
    element: <UniversityInfoPage />,
  },
  {
    path: '/university/:universityId/subject/:subjectId',
    element: <SubjectInfoPage />,
  },
  {
    path: '/university/:universityId/subject/:subjectId/questionBase/:questionBaseId',
    element: <QuestionBaseInfoPage />,
  },
  {
    path: '/university/:universityId/student/:studentId',
    element: <StudentInfoPage />,
  },
];

export const getRouterByRole = {
  SUPERADMIN: superAdminRoutes,
  TEACHER: teacherRoutes,
  UNSIGNED: unsignedRoutes,
};
