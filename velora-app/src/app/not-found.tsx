import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c9a96e]/5 rounded-full blur-[100px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_0%,rgba(0,0,0,0.9)_100%)]"></div>
      </div>

      <div className="relative z-10 text-center px-4">
        <h1 className="text-9xl font-light tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">
          404
        </h1>
        <div className="h-[1px] w-24 bg-[#c9a96e] mx-auto mb-8"></div>
        <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-10 font-light">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link href="/" className="inline-flex items-center gap-2 border border-white/20 hover:border-[#c9a96e] hover:text-[#c9a96e] px-8 py-4 transition-all duration-300 font-medium tracking-wide bg-black/50 backdrop-blur-sm">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
