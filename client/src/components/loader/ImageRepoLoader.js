import React from 'react';
import Loader from 'react-loader-spinner';
import { Grid } from 'semantic-ui-react';

export default function ImageRepoLoader({ visible }) {
  return (
    <Grid container centered>
      <Loader
        type="Oval"
        color="teal"
        style={{ marginTop: '20%' }}
        height={100}
        width={100}
        visible={visible}
      />
    </Grid>
  );
}
