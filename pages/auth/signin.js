import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = () => {
    signIn("google", { callbackUrl: router.asPath });
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleSignIn}>Sign In with Google</button>
    </div>
  );
}
