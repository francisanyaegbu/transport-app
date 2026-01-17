import Navbar from '../../app/components/Navbar'
import ProfileForm from '../../app/components/ProfileForm'

export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <main style={{ padding: 20 }}>
        <h1>Profile</h1>
        <ProfileForm />
      </main>
    </>
  )
}
