'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { mockProfiles } from '@/lib/mockData';

const connectedProfileIds = new Set(['1']);

export default function ProfilePage() {
  const params = useParams<{ id: string }>();
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  const profile = useMemo(() => mockProfiles.find((item) => item.id === params.id), [params.id]);

  if (!profile) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-bg-primary px-4 py-10">
          <div className="mx-auto max-w-xl rounded-3xl border border-border-primary bg-bg-secondary p-8 text-center">
            <h1 className="font-syne text-3xl font-bold">Profile not found</h1>
            <p className="mt-2 text-text-muted">This profile may have been removed or is unavailable.</p>
            <Link href="/discover" className="mt-4 inline-block rounded-full bg-pink-primary px-6 py-3">
              Back to Discover
            </Link>
          </div>
        </main>
      </>
    );
  }

  const isConnected = connectedProfileIds.has(profile.id);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1.1fr,1fr]">
          <section className="glass-card p-5 sm:p-6">
            <div className="mb-4 flex h-72 items-center justify-center rounded-2xl bg-bg-tertiary text-7xl">
              {profile.photos[selectedPhoto]}
            </div>
            <div className="grid grid-cols-4 gap-2">
              {profile.photos.map((photo, index) => (
                <button
                  key={`${profile.id}-${photo}`}
                  type="button"
                  onClick={() => setSelectedPhoto(index)}
                  className={`flex h-16 items-center justify-center rounded-xl border text-2xl ${
                    selectedPhoto === index ? 'border-pink-primary bg-pink-primary/10' : 'border-border-primary bg-bg-tertiary'
                  }`}
                >
                  {photo}
                </button>
              ))}
            </div>
          </section>

          <section className="glass-card p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="font-syne text-3xl font-bold">{profile.name}, {profile.age}</h1>
                <p className="mt-1 text-sm text-text-muted">
                  {profile.university} · {profile.course} · Class of {profile.graduationYear}
                </p>
              </div>
              <div className="flex gap-2 text-xs">
                {Object.entries(profile.verified).map(([key, value]) => (
                  <span key={key} className={`rounded-full px-3 py-1 ${value ? 'bg-green-500/20 text-green-200' : 'bg-bg-tertiary text-text-muted'}`}>
                    {key}
                  </span>
                ))}
              </div>
            </div>

            <p className="mt-5 text-text-muted">{profile.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {profile.hobbies.map((hobby) => (
                <span key={hobby} className="rounded-full border border-pink-border bg-pink-dim px-3 py-1 text-xs text-pink-light">
                  {hobby}
                </span>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-border-primary bg-bg-tertiary p-4 text-sm">
              <p className="font-semibold">Contact</p>
              {isConnected ? (
                <p className="mt-2 text-text-muted">{profile.contact.email} · {profile.contact.phone}</p>
              ) : (
                <p className="mt-2 text-text-muted">Hidden until your request is accepted.</p>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {!isConnected && (
                <button type="button" className="flex-1 rounded-full bg-pink-primary px-5 py-3 font-medium">
                  Send Request
                </button>
              )}
              <Link
                href={isConnected ? '/chat' : '/requests'}
                className="flex-1 rounded-full border border-border-secondary px-5 py-3 text-center text-text-muted transition hover:text-white"
              >
                {isConnected ? 'Message' : 'View Requests'}
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
