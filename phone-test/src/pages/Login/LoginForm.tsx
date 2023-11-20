import { useState } from 'react';

import {
  Button,
  Form,
  FormItem,
  Grid,
  Icon,
  SpinnerOutlined,
  TextFieldInput
} from '@aircall/tractor';

import { FormState } from './Login.decl';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  formState: FormState;
}

export const LoginForm = ({ onSubmit, formState }: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const emailRegex = /^[a-zA-Z0-9._%+-]+@aircall\.io$/;

  return (
    <Form
      onSubmit={e => {
        e.preventDefault();
        onSubmit(email, password);
      }}
      width="100%"
    >
      <Grid columnGap={4} rowGap={5} gridTemplateColumns="1fr">
        <FormItem label="Email" name="email">
          <TextFieldInput
            name="email"
            placeholder="job@aircall.io"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </FormItem>
        <FormItem label="Password" name="password">
          <TextFieldInput
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </FormItem>
        <FormItem>
          <Button
            block
            type="submit"
            data-testid="login-button"
            disabled={!Boolean(emailRegex.test(email) && password.length >= 8)}
          >
            {formState === 'Pending' ? <Icon component={SpinnerOutlined} spin /> : 'Login'}
          </Button>
        </FormItem>
      </Grid>
    </Form>
  );
};
