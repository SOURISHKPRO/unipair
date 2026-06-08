'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import { MOCK_USERS } from '@/lib/mockData';
import { ConnectionRequest, Match } from '@/types';
import { ShieldCheck, UserCheck, Heart, X, Check, Inbox, Send, Sparkles } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function RequestsPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [activeTab, setActiveTab] = useState<'incoming' | 'outgoing'>('incoming');
  const [incoming, setIncoming] = useState<ConnectionRequest[]>([]);
  const [outgoing, setOutgoing] = useState<ConnectionRequest[]>([]);
  
  // Celebration overlay state
  const [newMatch, setNewMatch] = useState<Match | null>(null);

  // Route protection
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Load incoming and outgoing requests on mount
  useEffect(() => {
    if (!user) return;

    // Load outgoing requests
    const outgoingStr = localStorage.getItem('unipair_requests') || '[]';
    const outgoingList: ConnectionRequest[] = JSON.parse(outgoingStr).filter(
      (r: ConnectionRequest) => r.senderId === user.id
    );
    setOutgoing(outgoingList);

    // Load incoming requests
    let incomingStr = localStorage.getItem('unipair_incoming_requests');
    let incomingList: ConnectionRequest[] = [];
    
    if (incomingStr) {
      incomingList = JSON.parse(incomingStr);
    } else {
      // Initialize mock incoming requests if none exist
      incomingList = [
        {
          id: 'req_inc_1',
          senderId: 'student_1',
          sender: MOCK_USERS[0], // Tanya Sharma
          recipientId: user.id,
          recipient: user,
          status: 'pending',
          message: 'Hey! Loved your bio, down to connect and check out some cafes around campus?',
          createdAt: new Date(Date.now() - 3600000 * 2).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
        },
        {
          id: 'req_inc_2',
          senderId: 'student_3',
          sender: MOCK_USERS[2], // Ananya Sen
          recipientId: user.id,
          recipient: user,
          status: 'pending',
          message: 'Saw you are also interested in photography. We should do a photowalk in SoBo!',
          createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
          updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
        },
      ];
      localStorage.setItem('unipair_incoming_requests', JSON.stringify(incomingList));
    }
    setIncoming(incomingList.filter((r) => r.status === 'pending'));
  }, [user]);

  // Decline Request
  const handleDecline = (requestId: string) => {
    const updated = incoming.map((r) => r.id === requestId ? { ...r, status: 'rejected' as const } : r);
    setIncoming(updated.filter((r) => r.status === 'pending'));
    localStorage.setItem('unipair_incoming_requests', JSON.stringify(updated));
  };

  // Accept Request (Creates Match)
  const handleAccept = (request: ConnectionRequest) => {
    if (!user) return;

    // 1. Remove from incoming requests list
    const updatedIncoming = incoming.map((r) => r.id === request.id ? { ...r, status: 'accepted' as const } : r);
    setIncoming(updatedIncoming.filter((r) => r.status === 'pending'));
    localStorage.setItem('unipair_incoming_requests', JSON.stringify(updatedIncoming));

    // 2. Create Match Object
    const matchId = `match_${Math.random().toString(36).substring(2, 11)}`;
    const newMatchObj: Match = {
      id: matchId,
      userId1: request.senderId,
      user1: request.sender,
      userId2: user.id,
      user2: user,
      createdAt: new Date().toISOString(),
    };

    // 3. Save Match to matches database
    const matchesStr = localStorage.getItem('unipair_matches') || '[]';
    const matchesList: Match[] = JSON.parse(matchesStr);
    matchesList.push(newMatchObj);
    localStorage.setItem('unipair_matches', JSON.stringify(matchesList));

    // 4. Initialize first greeting messages for the match
    const messagesKey = `unipair_messages_${matchId}`;
    const initialMessages = [
      {
        id: `msg_init_${Math.random().toString(36).substring(2, 9)}`,
        matchId: matchId,
        senderId: request.senderId,
        sender: request.sender,
        content: request.message || "Hey! I accepted your request, let's connect!",
        type: 'text' as const,
        createdAt: request.createdAt,
      }
    ];
    localStorage.setItem(messagesKey, JSON.stringify(initialMessages));

    // 5. Trigger Match Celebration Overlay
    setNewMatch(newMatchObj);
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen bg-bg-primary flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-pink-primary/30 border-t-pink-primary rounded-full animate-spin" />
          <p className="text-text-muted text-sm font-medium">Entering campus terminal...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem)] bg-bg-primary py-8 px-4 lg:px-8 relative">
        <div className="max-w-4xl mx-auto space-y-6">
          
          {/* Header & Tabs */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border-primary pb-4">
            <div>
              <h1 className="font-syne font-bold text-3xl text-white">Inbox Requests</h1>
              <p className="text-sm text-text-muted mt-1">Review incoming proposals or track your outgoing requests</p>
            </div>
            
            {/* Tabs Trigger */}
            <div className="bg-bg-secondary p-1 rounded-2xl border border-border-primary flex">
              <button
                onClick={() => setActiveTab('incoming')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'incoming'
                    ? 'bg-pink-primary text-white'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                <Inbox size={14} />
                <span>Incoming ({incoming.length})</span>
              </button>
              <button
                onClick={() => setActiveTab('outgoing')}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === 'outgoing'
                    ? 'bg-pink-primary text-white'
                    : 'text-text-muted hover:text-white'
                }`}
              >
                <Send size={14} />
                <span>Outgoing ({outgoing.length})</span>
              </button>
            </div>
          </div>

          {/* Incoming View */}
          {activeTab === 'incoming' && (
            <div className="space-y-4">
              {incoming.length > 0 ? (
                incoming.map((req) => (
                  <div
                    key={req.id}
                    className="bg-bg-secondary border border-border-primary rounded-[24px] p-6 flex flex-col md:flex-row gap-6 hover:border-pink-border transition duration-300"
                  >
                    {/* Photo */}
                    <div className="w-24 h-32 md:w-32 md:h-40 rounded-2xl overflow-hidden bg-bg-tertiary shrink-0 relative">
                      <img
                        src={req.sender.photos[0]}
                        alt={req.sender.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-baseline gap-2">
                          <h3 className="font-syne font-bold text-xl text-white">
                            {req.sender.name}
                          </h3>
                          <span className="text-base text-text-muted">{req.sender.age}</span>
                        </div>
                        <p className="text-xs text-text-muted font-medium">
                          🎓 {req.sender.university} · {req.sender.degree} in {req.sender.course}
                        </p>
                        {req.message && (
                          <div className="bg-bg-tertiary border border-border-primary p-3 rounded-xl text-xs text-white leading-relaxed mt-2 italic">
                            &ldquo;{req.message}&rdquo;
                          </div>
                        )}
                        <span className="text-[10px] text-text-muted2 block pt-1">
                          Received {formatDate(req.createdAt)}
                        </span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          onClick={() => handleAccept(req)}
                          className="flex-1 py-3 bg-pink-primary hover:bg-pink-hover text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5 shadow-md shadow-pink-primary/10"
                        >
                          <Check size={14} />
                          <span>Accept Request</span>
                        </button>
                        <button
                          onClick={() => handleDecline(req.id)}
                          className="px-4 py-3 bg-bg-tertiary border border-border-secondary text-text-muted hover:text-white rounded-xl transition text-xs font-semibold"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-bg-secondary border border-border-primary rounded-[24px] space-y-4">
                  <Inbox size={40} className="text-text-muted2 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">No incoming requests</h3>
                    <p className="text-xs text-text-muted max-w-sm mx-auto">
                      Wait for other campus students to send you a connection proposal, or check back later.
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Outgoing View */}
          {activeTab === 'outgoing' && (
            <div className="space-y-4">
              {outgoing.length > 0 ? (
                outgoing.map((req) => (
                  <div
                    key={req.id}
                    className="bg-bg-secondary border border-border-primary rounded-[24px] p-5 flex items-center justify-between hover:border-pink-border transition duration-300"
                  >
                    <div className="flex items-center gap-4">
                      {/* Photo */}
                      <div className="w-14 h-18 rounded-xl overflow-hidden bg-bg-tertiary shrink-0">
                        <img
                          src={req.recipient.photos[0]}
                          alt={req.recipient.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-white">{req.recipient.name}</h4>
                        <p className="text-xs text-text-muted mt-0.5">{req.recipient.university}</p>
                        <span className="text-[10px] text-text-muted2 mt-1 block">
                          Sent {formatDate(req.createdAt)}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="text-right">
                      <span className="inline-block px-3 py-1 bg-pink-dim border border-pink-border text-pink-light rounded-full text-[10px] font-semibold tracking-wider uppercase animate-pulse">
                        PENDING APPROVAL
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-16 bg-bg-secondary border border-border-primary rounded-[24px] space-y-4">
                  <Send size={40} className="text-text-muted2 mx-auto" />
                  <div className="space-y-1">
                    <h3 className="font-bold text-white">No outgoing requests</h3>
                    <p className="text-xs text-text-muted max-w-xs mx-auto">
                      Discover students on the campus deck and send connection requests to start matching!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Celebration Match Overlay Modal */}
        {newMatch && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="max-w-sm w-full bg-bg-secondary border border-pink-border/40 rounded-[32px] p-8 text-center space-y-6 relative overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
              {/* Sparkles */}
              <div className="absolute top-4 left-4 text-pink-primary opacity-60"><Sparkles size={24} /></div>
              <div className="absolute bottom-4 right-4 text-pink-primary opacity-60"><Sparkles size={24} /></div>
              
              <div className="text-pink-primary text-5xl">🎉</div>
              
              <div className="space-y-2">
                <h2 className="font-syne font-extrabold text-3xl text-white">It&apos;s a Match!</h2>
                <p className="text-sm text-text-muted">
                  You and <span className="text-white font-semibold">{newMatch.user1.name}</span> are now connected.
                </p>
              </div>

              {/* Photos comparison bubble */}
              <div className="flex justify-center items-center -space-x-4 py-4">
                <div className="w-20 h-20 rounded-full border-4 border-bg-secondary overflow-hidden bg-bg-tertiary">
                  <img
                    src={newMatch.user2.photos[0]}
                    alt="You"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="w-10 h-10 rounded-full bg-pink-primary flex items-center justify-center border-4 border-bg-secondary text-white text-xs font-bold relative z-10">
                  <Heart size={14} fill="white" />
                </div>
                <div className="w-20 h-20 rounded-full border-4 border-bg-secondary overflow-hidden bg-bg-tertiary">
                  <img
                    src={newMatch.user1.photos[0]}
                    alt={newMatch.user1.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => {
                    setNewMatch(null);
                    router.push('/matches');
                  }}
                  className="w-full py-3.5 bg-pink-primary hover:bg-pink-hover text-white text-sm font-bold rounded-full transition shadow-lg shadow-pink-primary/20"
                >
                  Start Chatting 💬
                </button>
                <button
                  onClick={() => setNewMatch(null)}
                  className="w-full py-3.5 border border-border-secondary text-text-muted hover:text-white rounded-full text-sm font-semibold transition"
                >
                  Keep Reviewing
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
