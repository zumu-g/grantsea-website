import { redirect } from 'next/navigation';

// ponytail: see /signin — single auth surface is /signup for now.
export default function LoginRedirect() {
  redirect('/signup');
}
