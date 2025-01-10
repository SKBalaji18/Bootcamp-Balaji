
import Link from 'next/link'
import Image from 'next/image'
import { Profile } from '@/types/profile'

interface ProfileCardProps {
  profile: Profile
}

export default function ProfileCard({ profile }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {profile.photo && (
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={profile.photo}
            alt={profile.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
      )}
      <h2 className="text-xl font-semibold text-center mb-2">{profile.name}</h2>
      <p className="text-gray-600 text-center mb-4">{profile.email}</p>
      
      <div className="space-y-2">
        {profile.contactDetails.phone && (
          <p className="text-sm">📞 {profile.contactDetails.phone}</p>
        )}
        {profile.contactDetails.linkedin && (
          <a 
            href={profile.contactDetails.linkedin}
            className="text-blue-500 hover:underline block text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn Profile
          </a>
        )}
      </div>
      
      <div className="mt-4 space-x-4 flex justify-center">
        {profile.cvPath && (
          <a 
            href={profile.cvPath}
            className="text-blue-500 hover:underline text-sm"
            target="_blank"
            rel="noopener noreferrer"
          >
            View CV
          </a>
        )}
        <Link
          href={`/profile/${profile.id}/blog`}
          className="text-blue-500 hover:underline text-sm"
        >
          View Blog Posts
        </Link>
      </div>
    </div>
  )
}