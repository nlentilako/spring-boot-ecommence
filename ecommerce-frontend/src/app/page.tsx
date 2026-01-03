import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Smart E-Commerce Platform</h1>
          <p className="text-xl text-gray-600 mb-8">Production-grade e-commerce solution with Next.js</p>
          <div className="flex justify-center gap-4">
            <Link 
              href="/products" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Browse Products
            </Link>
            <Link 
              href="/dashboard" 
              className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
            >
              Dashboard
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">SEO Optimized</h2>
            <p className="text-gray-600">Server-side rendering for better search engine visibility and faster initial loads.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Admin Dashboard</h2>
            <p className="text-gray-600">Comprehensive analytics, order management, and product control panel.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Secure Authentication</h2>
            <p className="text-gray-600">JWT-based authentication with role-based access control.</p>
          </div>
        </div>
      </main>
    </div>
  )
}