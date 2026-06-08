'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { mockMatches } from '@/lib/mockData';

export default function MatchesPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-8">
        <div className="mx-auto max-w-5xl">
          <h1 className="font-syne text-3xl font-bold">Matches</h1>

          {mockMatches.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-border-primary bg-bg-secondary p-8 text-center">
              <p>You have no matches yet.</p>
              <Link href="/discover" className="mt-4 inline-block rounded-full bg-pink-primary px-6 py-3">
                Discover profiles
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {mockMatches.map((match) => (
                <Link
                  key={match.id}
                  href="/chat"
                  className="rounded-2xl border border-border-primary bg-bg-secondary p-4 transition hover:border-pink-border"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="font-semibold">{match.name}</h2>
                      <p className="mt-1 text-sm text-text-muted">{match.lastMessage}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-xs ${match.online ? 'text-green-300' : 'text-text-muted'}`}>
                        {match.online ? 'Online' : 'Offline'}
                      </p>
                      {match.unreadCount > 0 && (
                        <span className="mt-1 inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-pink-primary px-2 text-xs font-medium">
                          {match.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
