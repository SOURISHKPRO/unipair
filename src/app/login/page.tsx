'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import OTPInput from '@/components/auth/OTPInput';
import { useAuth } from '@/lib/auth';
import { validatePhone } from '@/lib/utils';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const requestOtp = async () => {
    setError('');
    if (!validatePhone(phone)) {
      setError('Enter a valid 10-digit phone number.');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setStep('otp');
  };

  const verifyOtp = async () => {
    setError('');
    if (otp.length !== 6) {
      setError('Enter the 6-digit OTP.');
      return;
    }
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setUser({ id: 'user-1', phone });
    router.push('/discover');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-10">
        <div className="mx-auto max-w-md rounded-3xl border border-border-primary bg-bg-secondary p-6 sm:p-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-pink-primary">Login</p>
          <h1 className="font-syne text-3xl font-bold">Welcome back</h1>
          <p className="mt-2 text-sm text-text-muted">
            {step === 'phone' ? 'Enter your phone number to get OTP.' : 'Verify OTP to continue to your dashboard.'}
          </p>

          {step === 'phone' ? (
            <div className="mt-6 space-y-4">
              <label className="block text-sm">
                <span className="mb-2 block text-text-muted">Phone Number</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="9876543210"
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 outline-none transition focus:border-pink-primary"
                />
              </label>
              <button
                type="button"
                disabled={loading}
                onClick={requestOtp}
                className="w-full rounded-full bg-pink-primary px-4 py-3 font-medium text-white transition hover:bg-pink-hover disabled:opacity-60"
              >
                {loading ? 'Sending OTP...' : 'Send OTP'}
              </button>
            </div>
          ) : (
            <div className="mt-6 space-y-4">
              <OTPInput value={otp} onChange={setOtp} />
              <button
                type="button"
                disabled={loading}
                onClick={verifyOtp}
                className="w-full rounded-full bg-pink-primary px-4 py-3 font-medium text-white transition hover:bg-pink-hover disabled:opacity-60"
              >
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setOtp('');
                  setStep('phone');
                }}
                className="w-full rounded-full border border-border-secondary px-4 py-3 text-sm text-text-muted transition hover:text-white"
              >
                Change phone number
              </button>
            </div>
          )}

          {error && <p className="mt-4 rounded-xl bg-red-500/20 px-3 py-2 text-sm text-red-200">{error}</p>}

          <p className="mt-6 text-sm text-text-muted">
            New to UniPair?{' '}
            <Link href="/signup" className="text-pink-primary hover:text-pink-hover">
              Create account
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
