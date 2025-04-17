import Button from "../ui/buttons"

export default function Hero() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">Connect with Your Dream Job</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          JobConnect brings together top employers and skilled professionals. Find your perfect match with our
          AI-powered platform.
        </p>
        <div className="space-x-4">
          <Button size="lg" variant="secondary">
            Find Jobs
          </Button>
          <Button size="lg" variant="outline">
            For Employers
          </Button>
        </div>
      </div>
    </section>
  )
}

