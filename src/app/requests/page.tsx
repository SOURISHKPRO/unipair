'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import { receivedRequests, sentRequests } from '@/lib/mockData';

export default function RequestsPage() {
  const [tab, setTab] = useState<'received' | 'sent'>('received');
  const [received, setReceived] = useState(receivedRequests);
  const [sent, setSent] = useState(sentRequests);

  const activeList = tab === 'received' ? received : sent;

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-8">
        <div className="mx-auto max-w-4xl">
          <h1 className="font-syne text-3xl font-bold">Requests</h1>

          <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-border-primary bg-bg-secondary p-1">
            <button
              type="button"
              onClick={() => setTab('received')}
              className={`rounded-xl px-4 py-2 text-sm ${tab === 'received' ? 'bg-pink-primary text-white' : 'text-text-muted'}`}
            >
              Received <span className="ml-1 rounded-full bg-black/30 px-2 py-0.5 text-xs">{received.length}</span>
            </button>
            <button
              type="button"
              onClick={() => setTab('sent')}
              className={`rounded-xl px-4 py-2 text-sm ${tab === 'sent' ? 'bg-pink-primary text-white' : 'text-text-muted'}`}
            >
              Sent <span className="ml-1 rounded-full bg-black/30 px-2 py-0.5 text-xs">{sent.length}</span>
            </button>
          </div>

          {activeList.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-border-primary bg-bg-secondary p-8 text-center">
              <p className="text-lg">No {tab} requests yet.</p>
              <Link href="/discover" className="mt-4 inline-block rounded-full bg-pink-primary px-6 py-3">
                Go to Discover
              </Link>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {activeList.map((item) => (
                <article key={item.id} className="rounded-2xl border border-border-primary bg-bg-secondary p-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h2 className="font-semibold">{item.name}</h2>
                      <p className="text-sm text-text-muted">{item.message}</p>
                      <p className="mt-1 text-xs text-text-muted">{item.time}</p>
                    </div>

                    {tab === 'received' ? (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => setReceived((prev) => prev.filter((request) => request.id !== item.id))}
                          className="rounded-full border border-border-secondary px-4 py-2 text-sm text-text-muted"
                        >
                          Reject
                        </button>
                        <button
                          type="button"
                          onClick={() => setReceived((prev) => prev.filter((request) => request.id !== item.id))}
                          className="rounded-full bg-pink-primary px-4 py-2 text-sm font-medium"
                        >
                          Accept
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setSent((prev) => prev.filter((request) => request.id !== item.id))}
                        className="rounded-full border border-border-secondary px-4 py-2 text-sm text-text-muted"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
