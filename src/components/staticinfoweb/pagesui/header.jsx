import Button from "../ui/buttons"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          JobConnect
        </Link>
        <div className="space-x-4">
          <Link href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </Link>
          <Link href="#benefits" className="text-gray-600 hover:text-gray-900">
            Benefits
          </Link>
          <Button variant="outline">Log In</Button>
          <Button>Sign Up</Button>
        </div>
      </nav>
    </header>
  )
}

