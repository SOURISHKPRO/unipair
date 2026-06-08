'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth';
import Navbar from '@/components/layout/Navbar';
import { validateName, validateAge, validateBio } from '@/lib/utils';

const STEPS = [
  { number: 1, label: 'Phone verified', completed: true },
  { number: 2, label: 'Email verified', completed: true },
  { number: 3, label: 'Name & age', completed: false },
  { number: 4, label: 'University details', completed: false },
  { number: 5, label: 'Degree & course', completed: false },
  { number: 6, label: 'Graduation year', completed: false },
  { number: 7, label: 'Bio & hobbies', completed: false },
  { number: 8, label: 'Preferences', completed: false },
  { number: 9, label: 'Upload photos', completed: false },
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(3);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Step 3
    name: '',
    age: '',
    // Step 4
    university: '',
    rollNumber: '',
    // Step 5
    degree: '',
    course: '',
    // Step 6
    graduationYear: new Date().getFullYear(),
    // Step 7
    bio: '',
    hobbies: [] as string[],
    // Step 8
    relationshipType: [] as string[],
    genderPreference: [] as string[],
    connectionMode: 'both' as 'online' | 'offline' | 'both',
    // Step 9
    photos: [] as string[],
  });

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 3:
        if (!validateName(formData.name)) {
          newErrors.name = 'Name must be 2-50 characters';
        }
        if (!validateAge(parseInt(formData.age))) {
          newErrors.age = 'You must be 18 or older';
        }
        break;
      case 4:
        if (!formData.university) {
          newErrors.university = 'Please select a university';
        }
        if (!formData.rollNumber) {
          newErrors.rollNumber = 'Roll number is required';
        }
        break;
      case 5:
        if (!formData.degree) {
          newErrors.degree = 'Degree is required';
        }
        if (!formData.course) {
          newErrors.course = 'Course is required';
        }
        break;
      case 7:
        if (!validateBio(formData.bio)) {
          newErrors.bio = 'Bio must be 10-500 characters';
        }
        if (formData.hobbies.length === 0) {
          newErrors.hobbies = 'Add at least one hobby';
        }
        break;
      case 8:
        if (formData.relationshipType.length === 0) {
          newErrors.relationshipType = 'Select at least one relationship type';
        }
        if (formData.genderPreference.length === 0) {
          newErrors.genderPreference = 'Select your gender preference';
        }
        break;
      case 9:
        if (formData.photos.length < 4) {
          newErrors.photos = 'Upload at least 4 photos';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validateStep(currentStep)) return;

    if (currentStep < 9) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentStep > 3) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Call API to save profile data
      // For now, just redirect to discover
      router.push('/discover');
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setFormData((prev) => ({
            ...prev,
            photos: [...prev.photos, event.target.result as string],
          }));
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index),
    }));
  };

  const toggleArray = (field: keyof typeof formData, value: string) => {
    const arr = formData[field] as string[];
    if (arr.includes(value)) {
      setFormData((prev) => ({
        ...prev,
        [field]: arr.filter((v) => v !== value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: [...arr, value],
      }));
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-bg-primary py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h1 className="font-syne font-bold text-2xl">
                Step {currentStep} of 9
              </h1>
              <span className="text-sm text-text-muted">
                {Math.round((currentStep / 9) * 100)}%
              </span>
            </div>
            <div className="w-full h-2 bg-bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-pink-primary transition-all duration-300"
                style={{ width: `${(currentStep / 9) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="bg-bg-secondary border border-border-primary rounded-3xl p-8 mb-8">
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">Name & Age</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.name ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="Your name"
                      />
                      {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Age</label>
                      <input
                        type="number"
                        value={formData.age}
                        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                        min="18"
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.age ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="18"
                      />
                      {errors.age && <p className="text-red-400 text-sm mt-1">{errors.age}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">University Details</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">University</label>
                      <input
                        type="text"
                        value={formData.university}
                        onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.university ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="Your university name"
                      />
                      {errors.university && <p className="text-red-400 text-sm mt-1">{errors.university}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Roll Number</label>
                      <input
                        type="text"
                        value={formData.rollNumber}
                        onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.rollNumber ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="Your roll number"
                      />
                      {errors.rollNumber && <p className="text-red-400 text-sm mt-1">{errors.rollNumber}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">Degree & Course</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Degree</label>
                      <input
                        type="text"
                        value={formData.degree}
                        onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.degree ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="B.Tech, BA, etc."
                      />
                      {errors.degree && <p className="text-red-400 text-sm mt-1">{errors.degree}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Course/Major</label>
                      <input
                        type="text"
                        value={formData.course}
                        onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.course ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="Computer Science, Commerce, etc."
                      />
                      {errors.course && <p className="text-red-400 text-sm mt-1">{errors.course}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">Graduation Year</h2>
                  <select
                    value={formData.graduationYear}
                    onChange={(e) => setFormData({ ...formData, graduationYear: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 bg-bg-tertiary border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-primary/50"
                  >
                    {Array.from({ length: 10 }).map((_, i) => {
                      const year = new Date().getFullYear() + i;
                      return (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}

            {currentStep === 7 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">Bio & Hobbies</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Bio</label>
                      <textarea
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className={`w-full px-4 py-3 bg-bg-tertiary border rounded-xl focus:outline-none focus:ring-2 ${
                          errors.bio ? 'border-red-500' : 'border-border-primary focus:ring-pink-primary/50'
                        }`}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                      {errors.bio && <p className="text-red-400 text-sm mt-1">{errors.bio}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-3">Hobbies</label>
                      <div className="flex flex-wrap gap-2">
                        {['Reading', 'Gaming', 'Sports', 'Art', 'Music', 'Travel', 'Cooking', 'Photography'].map(
                          (hobby) => (
                            <button
                              key={hobby}
                              onClick={() => toggleArray('hobbies', hobby)}
                              className={`px-4 py-2 rounded-full text-sm transition ${
                                formData.hobbies.includes(hobby)
                                  ? 'bg-pink-primary text-white'
                                  : 'bg-bg-tertiary border border-border-primary text-text-muted hover:border-pink-primary'
                              }`}
                            >
                              {hobby}
                            </button>
                          )
                        )}
                      </div>
                      {errors.hobbies && <p className="text-red-400 text-sm mt-2">{errors.hobbies}</p>}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 8 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">Preferences</h2>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Relationship Type</label>
                      <div className="flex flex-wrap gap-2">
                        {['Serious', 'Casual', 'Just friends', 'Not sure yet'].map((type) => (
                          <button
                            key={type}
                            onClick={() => toggleArray('relationshipType', type)}
                            className={`px-4 py-2 rounded-full text-sm transition ${
                              formData.relationshipType.includes(type)
                                ? 'bg-pink-primary text-white'
                                : 'bg-bg-tertiary border border-border-primary text-text-muted hover:border-pink-primary'
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                      {errors.relationshipType && (
                        <p className="text-red-400 text-sm mt-2">{errors.relationshipType}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Gender Preference</label>
                      <div className="flex flex-wrap gap-2">
                        {['Men', 'Women', 'Everyone'].map((gender) => (
                          <button
                            key={gender}
                            onClick={() => toggleArray('genderPreference', gender)}
                            className={`px-4 py-2 rounded-full text-sm transition ${
                              formData.genderPreference.includes(gender)
                                ? 'bg-pink-primary text-white'
                                : 'bg-bg-tertiary border border-border-primary text-text-muted hover:border-pink-primary'
                            }`}
                          >
                            {gender}
                          </button>
                        ))}
                      </div>
                      {errors.genderPreference && (
                        <p className="text-red-400 text-sm mt-2">{errors.genderPreference}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Connection Mode</label>
                      <div className="flex flex-wrap gap-2">
                        {['online', 'offline', 'both'].map((mode) => (
                          <button
                            key={mode}
                            onClick={() =>
                              setFormData({ ...formData, connectionMode: mode as 'online' | 'offline' | 'both' })
                            }
                            className={`px-4 py-2 rounded-full text-sm transition capitalize ${
                              formData.connectionMode === mode
                                ? 'bg-pink-primary text-white'
                                : 'bg-bg-tertiary border border-border-primary text-text-muted hover:border-pink-primary'
                            }`}
                          >
                            {mode}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentStep === 9 && (
              <div className="space-y-6">
                <div>
                  <h2 className="font-syne font-bold text-xl mb-4">Upload Photos</h2>
                  <p className="text-sm text-text-muted mb-4">Upload at least 4 photos</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {formData.photos.map((photo, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={photo}
                          alt={`Photo ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <button
                          onClick={() => removePhoto(idx)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        >
                          ✕
                        </button>
                      </div>
                    ))}

                    {formData.photos.length < 4 && (
                      <label className="border-2 border-dashed border-border-primary rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-pink-primary transition">
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                        />
                        <div className="text-center">
                          <div className="text-2xl mb-2">+</div>
                          <p className="text-xs text-text-muted">Add photo</p>
                        </div>
                      </label>
                    )}
                  </div>

                  {errors.photos && <p className="text-red-400 text-sm">{errors.photos}</p>}
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <div className="flex gap-4">
            <button
              onClick={handlePrev}
              disabled={currentStep === 3}
              className="flex-1 px-6 py-3 border border-border-primary rounded-full text-text-muted hover:border-pink-primary hover:text-text-primary transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={loading}
              className="flex-1 px-6 py-3 bg-pink-primary hover:bg-pink-hover text-white font-medium rounded-full transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : currentStep === 9 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
