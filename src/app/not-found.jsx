import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center bg-base-100 px-6 py-24">
      <div className="text-center">
        <h1 className="text-9xl font-black text-primary/20 animate-pulse">404</h1>
        
        <div className="relative -mt-20">
          <h2 className="text-4xl font-bold font-serif text-gray-800 mb-4">
            Oops! Page Not Found
          </h2>
          <p className="text-lg text-gray-500 max-w-md mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn btn-primary btn-lg rounded-full px-12 text-white shadow-lg hover:shadow-xl transition-all"
            >
              Return to Home
            </Link>
            <Link
              href="/services"
              className="btn btn-outline btn-lg rounded-full px-12"
            >
              Our Services
            </Link>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto opacity-70">
          <div className="p-4 rounded-2xl border border-dashed border-gray-200">
            <h4 className="font-bold text-primary mb-2">Baby Care</h4>
            <p className="text-sm">Trusted care for your little ones.</p>
          </div>
          <div className="p-4 rounded-2xl border border-dashed border-gray-200">
            <h4 className="font-bold text-primary mb-2">Elderly Care</h4>
            <p className="text-sm">Compassionate support for seniors.</p>
          </div>
          <div className="p-4 rounded-2xl border border-dashed border-gray-200">
            <h4 className="font-bold text-primary mb-2">Special Care</h4>
            <p className="text-sm">Personalized medical support.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
