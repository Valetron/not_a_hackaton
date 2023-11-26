import React from 'react';
import LoginPage from '@/pages/Login';
import RegistrationPage from '@/pages/RegistrationPage';
import SuperadminPage from '@/pages/SuperadminPage';
import UniversityInfoPage from '@/pages/UniversityInfoPage';
import SubjectInfoPage from '@/pages/SubjectInfoPage';
import QuestionBaseInfoPage from '@/pages/QuestionBaseInfoPage';

export const router = [
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/register',
    element: <RegistrationPage />,
  },
  {
    path: '/superadmin',
    element: <SuperadminPage />,
  },
  {
    path: '/university/:id',
    element: <UniversityInfoPage />,
  },
  {
    path: '/subject/:id',
    element: <SubjectInfoPage />,
  },
  {
    path: '/question-base/:id',
    element: <QuestionBaseInfoPage />,
  },
];
