import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { Profile } from '@/types/profile'
import { BlogPost } from '@/types/blog'

const PROFILES_DIR = path.join(process.cwd(), 'content/profiles')
const BLOGS_DIR = path.join(process.cwd(), 'content/blogs')

export async function getProfiles(): Promise<Profile[]> {
  const profileDirs = fs.readdirSync(PROFILES_DIR)
  
  const profiles = profileDirs.map(dir => {
    const profilePath = path.join(PROFILES_DIR, dir, 'profile.json')
    const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'))
    
    return {
      ...profile,
      id: dir,
      photo: fs.existsSync(path.join(PROFILES_DIR, dir, 'photo.jpg')) 
        ? `/profiles/${dir}/photo.jpg` 
        : undefined,
      cvPath: fs.existsSync(path.join(PROFILES_DIR, dir, 'cv.pdf'))
        ? `/profiles/${dir}/cv.pdf`
        : undefined
    }
  })
  
  return profiles
}

export async function getProfile(id: string): Promise<Profile | null> {
  const profilePath = path.join(PROFILES_DIR, id, 'profile.json')
  
  if (!fs.existsSync(profilePath)) {
    return null
  }
  
  const profile = JSON.parse(fs.readFileSync(profilePath, 'utf-8'))
  return {
    ...profile,
    id,
    photo: fs.existsSync(path.join(PROFILES_DIR, id, 'photo.jpg')) 
      ? `/profiles/${id}/photo.jpg` 
      : undefined,
    cvPath: fs.existsSync(path.join(PROFILES_DIR, id, 'cv.pdf'))
      ? `/profiles/${id}/cv.pdf`
      : undefined
  }
}

export async function getBlogPosts(profileId: string): Promise<BlogPost[]> {
  const blogDir = path.join(BLOGS_DIR, profileId)
  if (!fs.existsSync(blogDir)) return []
  
  const posts = fs.readdirSync(blogDir)
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const content = fs.readFileSync(path.join(blogDir, file), 'utf-8')
      const { data, content: markdown } = matter(content)
      
      return {
        slug: file.replace('.md', ''),
        title: data.title,
        date: data.date,
        content: markdown,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    
  return posts
}

export async function getBlogPost(profileId: string, slug: string): Promise<BlogPost | null> {
  const postPath = path.join(BLOGS_DIR, profileId, `${slug}.md`)
  
  if (!fs.existsSync(postPath)) {
    return null
  }
  
  const content = fs.readFileSync(postPath, 'utf-8')
  const { data, content: markdown } = matter(content)
  
  return {
    slug,
    title: data.title,
    date: data.date,
    content: markdown,
  }
}