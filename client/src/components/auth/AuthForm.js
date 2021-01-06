import React, { useState } from 'react';
import { Button, Form, Grid, Message, Segment, Header } from 'semantic-ui-react';
import ax from '../../axios/axios';
import LocalStorageService from '../../services/LocalStorageService';
import { registerRoute } from '../../constants/strings';

export default function AuthForm({ type, history }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const renderNameField = () => {
    if (type.toLowerCase() === 'register') {
      return (
        <Form.Input
          fluid
          icon="user"
          iconPosition="left"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      );
    }
    return <></>;
  };

  const handleOnSubmit = async () => {
    let resp;
    if (type.toLowerCase() === 'register') {
      let body = { name, email, password };
      resp = await ax.post('/register', body);
    }
    if (type.toLowerCase() === 'login') {
      let body = { email, password };
      resp = await ax.post('/login', body);
    }
    LocalStorageService.save('user', resp.data);
    history.push('/images');
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Grid textAlign="center" style={{ height: '50vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          {type}
        </Header>
        <Form size="large">
          <Segment stacked>
            {renderNameField()}
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={handleEmailChange}
              value={email}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
            />

            <Button
              color="teal"
              fluid
              size="large"
              onClick={async () => {
                await handleOnSubmit();
              }}
            >
              {type}
            </Button>
          </Segment>
        </Form>
        <Message>
          <Message.Header>Not yet registered?</Message.Header>
          <br></br>
          <Button fluid onClick={() => history.push(registerRoute)}>
            Register
          </Button>
        </Message>
      </Grid.Column>
    </Grid>
  );
}
