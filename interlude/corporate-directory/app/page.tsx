import { getServerSession } from 'next-auth/next'
import { authOptions } from './api/auth/[...nextauth]/route'
import { getProfiles } from '@/lib/profiles'
import ProfileCard from '@/components/ProfileCard'
import SignIn from '@/components/SignIn'

export default async function Home() {
  const session = await getServerSession(authOptions)
  
  if (!session) {
    return <SignIn />
  }

  const profiles = await getProfiles()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Company Directory</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {profiles.map(profile => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  )
}