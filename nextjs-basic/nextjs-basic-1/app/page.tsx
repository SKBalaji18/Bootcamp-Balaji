import GreetingForm from '@/components/GreetingForm'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8 gradient-background">
      <h1 className="text-4xl font-bold mb-8 text-white text-center">Welcome to the Greeting App</h1>
      <GreetingForm />
    </main>
  )
}

