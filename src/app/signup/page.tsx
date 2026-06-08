'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import OTPInput from '@/components/auth/OTPInput';
import { useAuth } from '@/lib/auth';
import { validateAge, validateEmail, validateName, validatePhone } from '@/lib/utils';

type Step = 'phone' | 'phoneOtp' | 'email' | 'emailOtp' | 'details';
const stepOrder: Step[] = ['phone', 'phoneOtp', 'email', 'emailOtp', 'details'];

export default function SignupPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [step, setStep] = useState<Step>('phone');
  const [phone, setPhone] = useState('');
  const [phoneOtp, setPhoneOtp] = useState('');
  const [email, setEmail] = useState('');
  const [emailOtp, setEmailOtp] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'male' | 'female' | 'other' | ''>('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const progress = useMemo(() => ((stepOrder.indexOf(step) + 1) / stepOrder.length) * 100, [step]);

  const goNext = async () => {
    setError('');

    if (step === 'phone') {
      if (!validatePhone(phone)) {
        setError('Enter a valid 10-digit phone number.');
        return;
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      setStep('phoneOtp');
      return;
    }

    if (step === 'phoneOtp') {
      if (phoneOtp.length !== 6) {
        setError('Enter valid phone OTP.');
        return;
      }
      setStep('email');
      return;
    }

    if (step === 'email') {
      if (!validateEmail(email)) {
        setError('Enter a valid email address.');
        return;
      }
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 500));
      setLoading(false);
      setStep('emailOtp');
      return;
    }

    if (step === 'emailOtp') {
      if (emailOtp.length !== 6) {
        setError('Enter valid email OTP.');
        return;
      }
      setStep('details');
      return;
    }

    if (!validateName(name)) {
      setError('Name should be 2-50 characters.');
      return;
    }

    const numericAge = Number(age);
    if (!validateAge(numericAge)) {
      setError('Age must be between 18 and 100.');
      return;
    }

    if (!gender) {
      setError('Please select your gender.');
      return;
    }

    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setLoading(false);
    setUser({ id: 'user-signup', phone, email, name });
    router.push('/onboarding');
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary px-4 py-10">
        <div className="mx-auto max-w-xl rounded-3xl border border-border-primary bg-bg-secondary p-6 sm:p-8">
          <div className="mb-6">
            <h1 className="font-syne text-3xl font-bold">Create your account</h1>
            <p className="mt-2 text-sm text-text-muted">Step-by-step verification keeps UniPair safe and trusted.</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-bg-tertiary">
              <div className="h-full bg-pink-primary transition-all" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="space-y-4">
            {step === 'phone' && (
              <label className="block text-sm">
                <span className="mb-2 block text-text-muted">Phone Number</span>
                <input
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="9876543210"
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 outline-none transition focus:border-pink-primary"
                />
              </label>
            )}

            {step === 'phoneOtp' && <OTPInput value={phoneOtp} onChange={setPhoneOtp} />}

            {step === 'email' && (
              <label className="block text-sm">
                <span className="mb-2 block text-text-muted">College Email</span>
                <input
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@university.edu"
                  className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 outline-none transition focus:border-pink-primary"
                />
              </label>
            )}

            {step === 'emailOtp' && <OTPInput value={emailOtp} onChange={setEmailOtp} />}

            {step === 'details' && (
              <>
                <label className="block text-sm">
                  <span className="mb-2 block text-text-muted">Full Name</span>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 outline-none transition focus:border-pink-primary"
                  />
                </label>
                <label className="block text-sm">
                  <span className="mb-2 block text-text-muted">Age</span>
                  <input
                    type="number"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                    className="w-full rounded-xl border border-border-primary bg-bg-tertiary px-4 py-3 outline-none transition focus:border-pink-primary"
                  />
                </label>
                <div>
                  <p className="mb-2 text-sm text-text-muted">Gender</p>
                  <div className="grid grid-cols-3 gap-2">
                    {(['male', 'female', 'other'] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setGender(option)}
                        className={`rounded-xl border px-3 py-2 text-sm capitalize transition ${
                          gender === option ? 'border-pink-primary bg-pink-primary/15 text-white' : 'border-border-primary text-text-muted'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            <button
              type="button"
              onClick={goNext}
              disabled={loading}
              className="w-full rounded-full bg-pink-primary px-4 py-3 font-medium text-white transition hover:bg-pink-hover disabled:opacity-60"
            >
              {loading ? 'Please wait...' : step === 'details' ? 'Complete Signup' : 'Continue'}
            </button>
          </div>

          {error && <p className="mt-4 rounded-xl bg-red-500/20 px-3 py-2 text-sm text-red-200">{error}</p>}

          <p className="mt-6 text-sm text-text-muted">
            Already have an account?{' '}
            <Link href="/login" className="text-pink-primary hover:text-pink-hover">
              Login
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
