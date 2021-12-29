import React from 'react';
import { useDispatch } from 'react-redux';

import './sign-in.styles.scss';

import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import { emailSignInStart, googleSignInStart } from '../../redux/user/user.actions';

const SignIn = () => {

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailSignInStart(email, password));
  }

  return (
    <div className='sign-in'>
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>

        <FormInput
          name="email"
          type="email"
          label="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />

        <FormInput
          name="password"
          type="password"
          label="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />

        <div className='buttons'>
          <CustomButton type="submit">Sign in</CustomButton>
          <CustomButton type="button" onClick={() => dispatch(googleSignInStart())} isGoogleSignIn>Sign in with Google</CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn;