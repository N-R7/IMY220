import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

const SplashPage = () => {
  return (
    <main>
      <h1>CAPTURE</h1>
      <div>
        <LoginForm />
        <SignupForm />
      </div>
    </main>
  );
};

export default SplashPage;