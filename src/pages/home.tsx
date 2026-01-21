// src/pages/Home.tsx
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-indigo-900 via-blue-300 to-indigo-700 text-white">
      
       

      {/* Hero Section */}
      <main className="flex flex-1 flex-col justify-center items-center text-center px-6 md:px-20 lg:px-40 mt-12">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-6 drop-shadow-lg">
          Simplify Contract Management
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-2xl drop-shadow-md">
          Create blueprints, generate contracts, manage lifecycle, and track all your agreements in one place. Streamline your workflow with ease.
        </p>
        <Link
          to="/dashboard"
          className="bg-white text-blue-700 font-bold px-8 py-3 rounded-lg shadow-lg hover:shadow-xl hover:bg-gray-100 transition"
        >
          Get Started
        </Link>
      </main>

      {/* Features Section */}
      <section className="py-20 bg-white/10">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/30 hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-2">Create Blueprints</h3>
            <p className="text-white/90">
              Design reusable contract templates with configurable fields for any purpose.
            </p>
          </div>
          <div className="p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/30 hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-2">Manage Contracts</h3>
            <p className="text-white/90">
              Generate contracts from blueprints, fill in values, and track their progress through the lifecycle.
            </p>
          </div>
          <div className="p-6 bg-white/20 backdrop-blur-md rounded-xl shadow-lg hover:bg-white/30 hover:scale-105 transition transform">
            <h3 className="text-2xl font-semibold mb-2">Track Status</h3>
            <p className="text-white/90">
              Keep an overview of all contracts with status indicators and quick actions for easy management.
            </p>
          </div>
        </div>
      </section>

      
    </div>
  );
}
