import { useParams } from 'react-router-dom';
import React, { SyntheticEvent, useState } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@/components/TabPanel/TabPanel';
import { useStudent } from '@/shared/api/hooks/useStudent';
import ResultsTab from '@/pages/StudentInfoPage/ResultsTab';

const StudentInfoPage = () => {
  const { studentId } = useParams();

  const [tabValue, setTabValue] = useState<number>(0);

  const { studentInfo } = useStudent(Number(studentId));

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <Box
      sx={{
        padding: '16px',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Студент: {studentInfo?.name} {studentInfo?.surname} {studentInfo?.patronymic}
      </Typography>

      <Tabs value={tabValue} onChange={handleChange} aria-label="Университет">
        <Tab label="Результаты тестов" id="tab-1" />
      </Tabs>

      <TabPanel value={0} index={0}>
        {studentInfo && studentInfo.id && <ResultsTab studentInfo={studentInfo} />}
      </TabPanel>
    </Box>
  );
};

export default StudentInfoPage;
