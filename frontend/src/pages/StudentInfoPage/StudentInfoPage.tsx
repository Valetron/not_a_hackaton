import { useParams } from 'react-router-dom';
import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { HackathonApi } from '@/shared/api/HackathonApi';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabPanel from '@/components/TabPanel/TabPanel';

const StudentInfoPage = () => {
  const { id } = useParams();

  const [tabValue, setTabValue] = useState<number>(0);
  const [studentInfo, setStudentInfo] = useState<HackathonApi.StudentOutputDTO>();

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const fetchStudentInfo = useCallback(async () => {
    try {
      // const studentInfo = await getStudentById(Number(id));
    } catch {
      //
    }
  }, [id]);

  useEffect(() => {
    fetchStudentInfo();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Студент: {studentInfo?.name}
      </Typography>

      <Tabs value={tabValue} onChange={handleChange} aria-label="Университет">
        <Tab label="Результаты тестов" id="tab-1" />
      </Tabs>

      <TabPanel value={0} index={0}></TabPanel>
    </Box>
  );
};

export default StudentInfoPage;
