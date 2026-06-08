'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';

type Tab = 'profile' | 'privacy' | 'blocked';

export default function SettingsPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const [name, setName] = useState('Campus Connector');
  const [bio, setBio] = useState('Love meeting new people and exploring campus clubs.');
  const [showEmail, setShowEmail] = useState(false);
  const [showPhone, setShowPhone] = useState(false);
  const [showOnline, setShowOnline] = useState(true);
  const [blockedUsers, setBlockedUsers] = useState<string[]>(['Unknown User']);
  const [status, setStatus] = useState('');
  const [saving, setSaving] = useState(false);

  const saveChanges = async () => {
    if (!name.trim()) {
      setStatus('Name is required.');
      return;
    }

    setSaving(true);
    setStatus('');
    await new Promise((resolve) => setTimeout(resolve, 700));
    setSaving(false);
    setStatus('Changes saved successfully.');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-syne text-3xl font-bold">Settings</h1>

          <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl border border-border-primary bg-bg-secondary p-1 text-sm">
            {(['profile', 'privacy', 'blocked'] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => {
                  setStatus('');
                  setTab(item);
                }}
                className={`rounded-xl px-4 py-2 capitalize ${tab === item ? 'bg-pink-primary text-white' : 'text-text-muted'}`}
              >
                {item}
              </button>
            ))}
          </div>

          <section className="mt-6 rounded-3xl border border-border-primary bg-bg-secondary p-6">
            {tab === 'profile' && (
              <div className="space-y-4">
                <label className="block text-sm">
                  <span className="mb-2 block text-text-muted">Display Name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3"
                  />
                </label>

                <label className="block text-sm">
                  <span className="mb-2 block text-text-muted">Bio</span>
                  <textarea
                    value={bio}
                    onChange={(event) => setBio(event.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3"
                  />
                </label>
              </div>
            )}

            {tab === 'privacy' && (
              <div className="space-y-4">
                {[
                  { label: 'Show email after connect', value: showEmail, setValue: setShowEmail },
                  { label: 'Show phone after connect', value: showPhone, setValue: setShowPhone },
                  { label: 'Show online status', value: showOnline, setValue: setShowOnline },
                ].map((toggle) => (
                  <label key={toggle.label} className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3">
                    <span>{toggle.label}</span>
                    <button
                      type="button"
                      role="switch"
                      aria-checked={toggle.value}
                      onClick={() => toggle.setValue(!toggle.value)}
                      className={`h-6 w-11 rounded-full p-1 transition ${toggle.value ? 'bg-pink-primary' : 'bg-bg-quaternary'}`}
                    >
                      <span className={`block h-4 w-4 rounded-full bg-white transition ${toggle.value ? 'translate-x-5' : 'translate-x-0'}`} />
                    </button>
                  </label>
                ))}
              </div>
            )}

            {tab === 'blocked' && (
              <div className="space-y-3">
                {blockedUsers.length === 0 ? (
                  <div className="rounded-xl border border-border-primary bg-bg-tertiary px-4 py-4 text-sm text-text-muted">
                    No blocked users. You are all clear.
                  </div>
                ) : (
                  blockedUsers.map((user) => (
                    <div key={user} className="flex items-center justify-between rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3">
                      <span>{user}</span>
                      <button
                        type="button"
                        onClick={() => setBlockedUsers((prev) => prev.filter((item) => item !== user))}
                        className="rounded-full border border-border-secondary px-3 py-1 text-xs text-text-muted"
                      >
                        Unblock
                      </button>
                    </div>
                  ))
                )}
              </div>
            )}

            <button
              type="button"
              onClick={saveChanges}
              disabled={saving}
              className="mt-6 rounded-full bg-pink-primary px-6 py-3 font-medium text-white transition hover:bg-pink-hover disabled:opacity-60"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            {status && <p className="mt-3 text-sm text-text-muted">{status}</p>}
          </section>
        </div>
      </main>
    </>
  );
}
