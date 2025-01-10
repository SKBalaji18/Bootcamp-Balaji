export interface Profile {
    id: string
    name: string
    email: string
    photo?: string
    contactDetails: {
      phone?: string
      linkedin?: string
      github?: string
    }
    cvPath?: string
  }