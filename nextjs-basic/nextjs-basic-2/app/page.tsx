import GreetingForm from '@/components/GreetingForm'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-12">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome to Kaminari</h1>
        <p className="text-muted-foreground">Enter your name to generate a greeting.</p>
      </div>
      <GreetingForm />
    </div>
  )
}