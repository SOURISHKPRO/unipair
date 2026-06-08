'use client';

import { useMemo, useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import { mockMatches } from '@/lib/mockData';

interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
}

const initialMessages: ChatMessage[] = [
  { id: '1', sender: 'them', text: 'Hey! How has your week been?' },
  { id: '2', sender: 'me', text: 'Pretty good, classes are intense though 😅' },
  { id: '3', sender: 'them', text: 'Same here. Want to grab coffee after lectures?' },
];

export default function ChatPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [draft, setDraft] = useState('');
  const [typing, setTyping] = useState(false);
  const activeMatch = useMemo(() => mockMatches[0], []);

  const sendMessage = () => {
    const content = draft.trim();
    if (!content) {
      return;
    }

    setMessages((prev) => [...prev, { id: String(prev.length + 1), sender: 'me', text: content }]);
    setDraft('');
    setTyping(true);
    setTimeout(() => setTyping(false), 1200);
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-8">
        <div className="mx-auto flex max-w-4xl flex-col rounded-3xl border border-border-primary bg-bg-secondary">
          <header className="flex items-center justify-between border-b border-border-primary px-5 py-4">
            <div>
              <h1 className="font-syne text-2xl font-bold">{activeMatch.name}</h1>
              <p className={`text-sm ${activeMatch.online ? 'text-green-300' : 'text-text-muted'}`}>
                {activeMatch.online ? 'Online now' : 'Offline'}
              </p>
            </div>
            <button type="button" className="rounded-full border border-border-secondary px-4 py-2 text-sm text-text-muted">
              📷 Image
            </button>
          </header>

          <section className="flex h-[420px] flex-col gap-3 overflow-y-auto p-5">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${
                  message.sender === 'me' ? 'ml-auto bg-pink-primary text-white' : 'bg-bg-tertiary text-text-muted'
                }`}
              >
                {message.text}
              </div>
            ))}

            {typing && <p className="text-xs text-text-muted">{activeMatch.name} is typing...</p>}
          </section>

          <footer className="border-t border-border-primary p-4">
            <div className="flex gap-3">
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault();
                    sendMessage();
                  }
                }}
                placeholder="Type a message..."
                className="flex-1 rounded-full border border-border-primary bg-bg-tertiary px-4 py-3"
              />
              <button type="button" onClick={sendMessage} className="rounded-full bg-pink-primary px-6 py-3 font-medium">
                Send
              </button>
            </div>
          </footer>
        </div>
      </main>
    </>
  );
}
