import Navbar from '../../app/components/Navbar'
import AuthForm from '../../app/components/AuthForm'

export default function AuthPage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 24 }}>
        <h1>Sign in / Sign up</h1>
        <p>Access your account or create a new student or rider profile.</p>
        <AuthForm />
      </main>
    </>
  )
}
