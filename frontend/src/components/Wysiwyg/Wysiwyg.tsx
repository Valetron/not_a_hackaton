import React, { Dispatch, FC, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Box, Button } from '@mui/material';
import { parseMarkdownStringToQuestion } from '@/shared/api/utils/adapters';

interface WysiwygProps {
  value: string | undefined;
  dispatchValue: Dispatch<string | undefined>;
}
const Wysiwyg: FC<WysiwygProps> = ({ value, dispatchValue }) => {
  return (
    <Box>
      <MDEditor value={value} onChange={dispatchValue} height={600} />
    </Box>
  );
};

export default Wysiwyg;
