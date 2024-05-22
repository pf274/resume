import { Tab, Tabs, Typography } from '@mui/material';
import { DateTime } from 'luxon';
import { useState } from 'react';

export function Resume({ resume, style }) {
  const [page, setPage] = useState("home");
  if (Object.keys(resume).length == 0) {
    return <div />
  }
  return (
    <div style={{flex: 1, padding: '1em'}}>
      <Typography style={{textAlign: 'center'}} variant='h2'>Peter Fullmer</Typography>
      <Tabs value={page} onChange={(_, newValue) => setPage(newValue)}>
        <Tab value="home" label="Home" />
        <Tab value="another" label="Another" />
      </Tabs>
    </div>
  );
}