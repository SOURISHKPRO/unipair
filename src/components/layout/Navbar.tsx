'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/auth';

const authLinks = [
  { href: '/discover', label: 'Discover' },
  { href: '/requests', label: 'Requests' },
  { href: '/matches', label: 'Matches' },
  { href: '/chat', label: 'Chat' },
  { href: '/settings', label: 'Settings' },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 border-b border-border-primary bg-bg-primary/90 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link href="/" className="font-syne text-xl font-extrabold tracking-wide">
          Uni<span className="text-pink-primary">Pair</span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {(isAuthenticated ? authLinks : [{ href: '/login', label: 'Login' }, { href: '/signup', label: 'Signup' }]).map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition ${active ? 'bg-pink-primary text-white' : 'text-text-muted hover:text-white'}`}
              >
                {link.label}
              </Link>
            );
          })}
          {isAuthenticated && (
            <button
              type="button"
              onClick={logout}
              className="rounded-full border border-border-secondary px-4 py-2 text-sm text-text-muted transition hover:text-white"
            >
              Logout
            </button>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <Link
            href={isAuthenticated ? '/discover' : '/login'}
            className="rounded-full bg-pink-primary px-4 py-2 text-sm font-medium"
          >
            {isAuthenticated ? 'Explore' : 'Login'}
          </Link>
        </div>
      </nav>
    </header>
  );
}
