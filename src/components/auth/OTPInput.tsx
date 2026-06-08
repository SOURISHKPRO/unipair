'use client';

import { useState } from 'react';

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
}

export default function OTPInput({ value, onChange, length = 6 }: OTPInputProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newVal = e.target.value;
    if (!/^\d*$/.test(newVal)) return;

    const arr = value.split('');
    arr[index] = newVal;
    const newValue = arr.join('').slice(0, length);
    onChange(newValue);

    if (newVal && index < length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const handleBackspace = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      setActiveIndex(index - 1);
    }
  };

  const digits = value.split('');

  return (
    <div className="flex gap-2 justify-center">
      {Array.from({ length }).map((_, i) => (
        <input
          key={i}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digits[i] || ''}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleBackspace(e, i)}
          onFocus={() => setActiveIndex(i)}
          autoFocus={i === 0}
          className={`w-12 h-12 text-center text-lg font-semibold border rounded-lg transition ${
            activeIndex === i
              ? 'border-pink-primary bg-pink-primary/10'
              : 'border-border-primary'
          } bg-bg-tertiary focus:outline-none focus:ring-2 focus:ring-pink-primary/50`}
        />
      ))}
    </div>
  );
}
