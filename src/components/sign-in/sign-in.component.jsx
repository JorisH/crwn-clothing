import React from 'react';
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in.styles.scss';

import { auth, signInWithGoogle } from '../../firebase/firebase.utils';

const SignIn = () => {
  
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      // clear form for now
      setEmail('');
      setPassword('');
    } catch (error) {
      console.log("problem signing in: ", error.message);
    }
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
          <CustomButton type="button" onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
        </div>
      </form>
    </div>
  )
}

export default SignIn;