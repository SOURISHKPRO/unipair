import Link from 'next/link';

const links = [
  { href: '/', label: 'Home' },
  { href: '/discover', label: 'Discover' },
  { href: '/requests', label: 'Requests' },
  { href: '/settings', label: 'Settings' },
];

export default function Footer() {
  return (
    <footer className="border-t border-border-primary bg-bg-secondary">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-text-muted lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© {new Date().getFullYear()} UniPair. Built for campus connections.</p>
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition hover:text-white">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
