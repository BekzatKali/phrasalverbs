import { signIn } from 'next-auth/react';

const SignInPage = () => {
  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={() => signIn('github')}>Sign in with GitHub</button>
    </div>
  );
};

export default SignInPage;
