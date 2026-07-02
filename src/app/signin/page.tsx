import { redirect } from 'next/navigation';

// ponytail: no dedicated sign-in page exists — auth lives on /signup.
// Replace with a real sign-in page when accounts get their own flow.
export default function SignInRedirect() {
  redirect('/signup');
}
