import { ModeToggle } from './ModeToggle'

export default function Header() {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container h-14 flex items-center justify-between">
        <h1 className="text-xl font-semibold">Kaminari Greeting App</h1>
        <ModeToggle />
      </div>
    </header>
  )
}