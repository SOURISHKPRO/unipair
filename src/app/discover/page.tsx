'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { mockProfiles } from '@/lib/mockData';

export default function DiscoverPage() {
  const [search, setSearch] = useState('');
  const [ageRange, setAgeRange] = useState<[number, number]>([18, 25]);
  const [relationshipType, setRelationshipType] = useState('All');
  const [connectionMode, setConnectionMode] = useState('All');
  const [hiddenIds, setHiddenIds] = useState<string[]>([]);
  const [loadingAction, setLoadingAction] = useState<string | null>(null);

  const filteredProfiles = useMemo(() => {
    return mockProfiles.filter((profile) => {
      const bySearch =
        profile.name.toLowerCase().includes(search.toLowerCase()) ||
        profile.university.toLowerCase().includes(search.toLowerCase()) ||
        profile.course.toLowerCase().includes(search.toLowerCase());
      const byAge = profile.age >= ageRange[0] && profile.age <= ageRange[1];
      const byRelationship = relationshipType === 'All' || profile.relationshipType === relationshipType;
      const byMode = connectionMode === 'All' || profile.connectionMode === connectionMode;
      const visible = !hiddenIds.includes(profile.id);
      return bySearch && byAge && byRelationship && byMode && visible;
    });
  }, [ageRange, connectionMode, hiddenIds, relationshipType, search]);

  const activeProfile = filteredProfiles[0];

  const handleDecision = async (profileId: string) => {
    setLoadingAction(profileId);
    await new Promise((resolve) => setTimeout(resolve, 400));
    setHiddenIds((prev) => [...prev, profileId]);
    setLoadingAction(null);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[280px,1fr]">
          <aside className="glass-card h-fit p-5">
            <h2 className="font-syne text-xl font-bold">Filters</h2>
            <div className="mt-4 space-y-4 text-sm">
              <label className="block">
                <span className="mb-2 block text-text-muted">Search</span>
                <input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name/course"
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3 py-2"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-text-muted">Max age: {ageRange[1]}</span>
                <input
                  type="range"
                  min={18}
                  max={30}
                  value={ageRange[1]}
                  onChange={(event) => setAgeRange([18, Number(event.target.value)])}
                  className="w-full"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-text-muted">Relationship type</span>
                <select
                  value={relationshipType}
                  onChange={(event) => setRelationshipType(event.target.value)}
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3 py-2"
                >
                  {['All', 'Serious', 'Casual', 'Friends', 'Not sure'].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-text-muted">Connection mode</span>
                <select
                  value={connectionMode}
                  onChange={(event) => setConnectionMode(event.target.value)}
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-3 py-2"
                >
                  {['All', 'Online', 'Offline', 'Both'].map((option) => (
                    <option key={option}>{option}</option>
                  ))}
                </select>
              </label>
            </div>
          </aside>

          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h1 className="font-syne text-3xl font-bold">Discover</h1>
              <span className="rounded-full border border-border-secondary px-3 py-1 text-sm text-text-muted">
                {filteredProfiles.length} profiles found
              </span>
            </div>

            {!activeProfile ? (
              <div className="glass-card p-8 text-center">
                <p className="text-lg">No profiles match your filters yet.</p>
                <button
                  type="button"
                  className="mt-4 rounded-full bg-pink-primary px-6 py-3"
                  onClick={() => {
                    setSearch('');
                    setAgeRange([18, 25]);
                    setRelationshipType('All');
                    setConnectionMode('All');
                    setHiddenIds([]);
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid gap-5 xl:grid-cols-2">
                <article className="glass-card overflow-hidden">
                  <div className="grid grid-cols-2 gap-px bg-border-primary">
                    {activeProfile.photos.slice(0, 4).map((photo, index) => (
                      <div key={`${activeProfile.id}-${index}`} className="flex h-28 items-center justify-center bg-bg-tertiary text-4xl">
                        {photo}
                      </div>
                    ))}
                  </div>

                  <div className="p-5">
                    <h2 className="text-2xl font-bold">{activeProfile.name}, {activeProfile.age}</h2>
                    <p className="mt-1 text-sm text-text-muted">
                      {activeProfile.university} · {activeProfile.course} · {activeProfile.graduationYear}
                    </p>
                    <p className="mt-3 text-sm text-text-muted">{activeProfile.bio}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {activeProfile.hobbies.map((hobby) => (
                        <span key={hobby} className="rounded-full border border-pink-border bg-pink-dim px-3 py-1 text-xs text-pink-light">
                          {hobby}
                        </span>
                      ))}
                    </div>

                    <div className="mt-5 flex gap-3">
                      <button
                        type="button"
                        disabled={loadingAction === activeProfile.id}
                        onClick={() => handleDecision(activeProfile.id)}
                        className="flex-1 rounded-full border border-border-secondary px-4 py-3 text-sm text-text-muted transition hover:text-white disabled:opacity-60"
                      >
                        Pass
                      </button>
                      <button
                        type="button"
                        disabled={loadingAction === activeProfile.id}
                        onClick={() => handleDecision(activeProfile.id)}
                        className="flex-1 rounded-full bg-pink-primary px-4 py-3 text-sm font-medium text-white transition hover:bg-pink-hover disabled:opacity-60"
                      >
                        {loadingAction === activeProfile.id ? 'Saving...' : 'Like'}
                      </button>
                    </div>

                    <Link href={`/profile/${activeProfile.id}`} className="mt-3 block text-center text-sm text-pink-primary hover:text-pink-hover">
                      View full profile
                    </Link>
                  </div>
                </article>

                <div className="glass-card p-5">
                  <h3 className="text-lg font-semibold">More profiles</h3>
                  <div className="mt-3 space-y-3">
                    {filteredProfiles.slice(1).length === 0 && (
                      <p className="rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 text-sm text-text-muted">
                        You are caught up. Keep exploring daily for new people.
                      </p>
                    )}
                    {filteredProfiles.slice(1).map((profile) => (
                      <Link
                        key={profile.id}
                        href={`/profile/${profile.id}`}
                        className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 transition hover:border-pink-border"
                      >
                        <span>{profile.name} · {profile.age}</span>
                        <span className="text-xs text-text-muted">{profile.relationshipType}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>
    </>
  );
}
