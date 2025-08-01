import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="text-6xl mb-4">🚫</div>
        <h1 className="text-2xl font-semibold text-slate-800 mb-2">404 - Page Not Found</h1>
        <p className="text-slate-600 mb-4">The page you are looking for does not exist.</p>
        <Link 
          href="/" 
          className="inline-block mt-4 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}