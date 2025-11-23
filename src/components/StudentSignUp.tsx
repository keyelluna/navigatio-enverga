import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";
import { saveUser, getUserByEmail, setCurrentUser, type User } from '../utils/localStorage';
import { toast } from 'sonner';
import { StringifyOptions } from 'node:querystring';

interface StudentSignUpProps {
  onSignUpSuccess: () => void;
  onBack: () => void;
}

export default function StudentSignUp({ onSignUpSuccess, onBack }: StudentSignUpProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    educationLevel: '',
    course: '',
    year: '',
    schoolId: '',
    phoneNumber: '',
    address: '',
    emergencyContact: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Check if user already exists
    const existingUser = getUserByEmail(formData.email);
    if (existingUser) {
      toast.error('An account with this email already exists!');
      return;
    }

    // Create new user
    const newUser: User = {
      id: Date.now().toString(),
      email: formData.email,
      password: formData.password,
      userType: 'student',
      name: `${formData.firstName} ${formData.lastName}`,
      schoolId: formData.schoolId,
      year: formData.year,
      educationLevel: formData.educationLevel,
      course: formData.course
    };

    // Save user and set as current user
    saveUser(newUser);
    setCurrentUser(newUser);
    toast.success('Registration successful!');
    
    setTimeout(() => {
      onSignUpSuccess();
    }, 500);
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 relative w-full min-h-screen flex items-center justify-center p-4 py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#780302]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#780302]/5 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
      >
        <ArrowLeft className="size-5 text-[#780302] group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Sign Up Form */}
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#780302] to-[#a00402] p-8 text-white">
          <div className="flex justify-center mb-4">
            <div className="size-20 bg-white rounded-full p-2 shadow-lg">
              <img alt="University Logo" className="w-full h-full object-cover rounded-full" src={imgImage1} />
            </div>
          </div>
          <h2 className="text-center mb-2 font-lilita text-[32px]">
            Student Registration
          </h2>
          <p className="text-white/90 text-center">Join our campus community</p>
          
          {/* Progress indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            <div className={`h-2 rounded-full transition-all ${step === 1 ? 'w-16 bg-white' : 'w-8 bg-white/40'}`} />
            <div className={`h-2 rounded-full transition-all ${step === 2 ? 'w-16 bg-white' : 'w-8 bg-white/40'}`} />
          </div>
          <p className="text-white/80 text-center mt-3 text-sm">Step {step} of 2</p>
        </div>

        {/* Form content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-gray-700 mb-2 block">First Name *</Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleChange('firstName', e.target.value)}
                      required
                      className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                      placeholder="Enter first name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="lastName" className="text-gray-700 mb-2 block">Last Name *</Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleChange('lastName', e.target.value)}
                      required
                      className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                      placeholder="Enter last name"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-gray-700 mb-2 block">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="student@example.com"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="password" className="text-gray-700 mb-2 block">Password *</Label>
                    <Input
                      id="password"
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      required
                      className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                      placeholder="Create password"
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword" className="text-gray-700 mb-2 block">Confirm Password *</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      required
                      className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                      placeholder="Confirm password"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="educationLevel" className="text-gray-700 mb-2 block">Education Level *</Label>
                  <Select value={formData.educationLevel} onValueChange={(value:string) => handleChange('educationLevel', value)}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]">
                      <SelectValue placeholder="Select education level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elementary">Elementary</SelectItem>
                      <SelectItem value="highschool">High School</SelectItem>
                      <SelectItem value="seniorhighschool">Senior High School</SelectItem>
                      <SelectItem value="college">College</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.educationLevel === 'college' && (
                  <div>
                    <Label htmlFor="course" className="text-gray-700 mb-2 block">Course/Program *</Label>
                    <Select value={formData.course} onValueChange={(value:string) => handleChange('course', value)}>
                      <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]">
                        <SelectValue placeholder="Select program" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bachelor of Science in Nursing">Bachelor of Science in Nursing</SelectItem>
                        <SelectItem value="Bachelor of Science in Accountancy">Bachelor of Science in Accountancy</SelectItem>
                        <SelectItem value="Bachelor of Secondary Education - English">Bachelor of Secondary Education - Major in English</SelectItem>
                        <SelectItem value="Bachelor of Secondary Education - Science">Bachelor of Secondary Education - Major in Science</SelectItem>
                        <SelectItem value="Bachelor of Secondary Education - Mathematics">Bachelor of Secondary Education - Major in Mathematics</SelectItem>
                        <SelectItem value="Bachelor of Secondary Education - Filipino">Bachelor of Secondary Education - Major in Filipino</SelectItem>
                        <SelectItem value="Bachelor of Secondary Education - Social Studies">Bachelor of Secondary Education - Major in Social Studies</SelectItem>
                        <SelectItem value="Bachelor of Elementary Education - Generalist">Bachelor of Elementary Education - Major in Generalist</SelectItem>
                        <SelectItem value="Bachelor of Science in Computer Engineering">Bachelor of Science in Computer Engineering</SelectItem>
                        <SelectItem value="Bachelor of Arts in Psychology">Bachelor of Arts in Psychology</SelectItem>
                        <SelectItem value="Bachelor of Science in Business Administration">Bachelor of Science in Business Administration</SelectItem>
                        <SelectItem value="Bachelor of Science in Computer Science">Bachelor of Science in Computer Science</SelectItem>
                        <SelectItem value="Bachelor of Science in Hospitality Management">Bachelor of Science in Hospitality Management</SelectItem>
                        <SelectItem value="Bachelor of Science in Tourism Management">Bachelor of Science in Tourism Management</SelectItem>
                        <SelectItem value="Associate in Computer Science">Associate in Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label htmlFor="year" className="text-gray-700 mb-2 block">Year Level *</Label>
                  <Select value={formData.year} onValueChange={(value:string) => handleChange('year', value)}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]">
                      <SelectValue placeholder="Select year level" />
                    </SelectTrigger>
                    <SelectContent>
                      {formData.educationLevel === 'college' || formData.educationLevel === 'seniorhighschool' ? (
                        <>
                          <SelectItem value="1">1st Year</SelectItem>
                          <SelectItem value="2">2nd Year</SelectItem>
                          {formData.educationLevel === 'college' && (
                            <>
                              <SelectItem value="3">3rd Year</SelectItem>
                              <SelectItem value="4">4th Year</SelectItem>
                            </>
                          )}
                        </>
                      ) : (
                        <>
                          <SelectItem value="grade1">Grade 1</SelectItem>
                          <SelectItem value="grade2">Grade 2</SelectItem>
                          <SelectItem value="grade3">Grade 3</SelectItem>
                          <SelectItem value="grade4">Grade 4</SelectItem>
                          <SelectItem value="grade5">Grade 5</SelectItem>
                          <SelectItem value="grade6">Grade 6</SelectItem>
                          <SelectItem value="grade7">Grade 7</SelectItem>
                          <SelectItem value="grade8">Grade 8</SelectItem>
                          <SelectItem value="grade9">Grade 9</SelectItem>
                          <SelectItem value="grade10">Grade 10</SelectItem>
                        </>
                      )}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  type="button"
                  onClick={handleNext}
                  className="w-full bg-gradient-to-r from-[#780302] to-[#a00402] text-white hover:from-[#5a0201] hover:to-[#780302] shadow-lg h-12 text-[18px] transition-all hover:shadow-xl"
                >
                  Continue to Next Step →
                </Button>
              </>
            ) : (
              <>
                <div>
                  <Label htmlFor="schoolId" className="text-gray-700 mb-2 block">Student ID Number *</Label>
                  <Input
                    id="schoolId"
                    type="text"
                    value={formData.schoolId}
                    onChange={(e) => handleChange('schoolId', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="Enter student ID"
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber" className="text-gray-700 mb-2 block">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => handleChange('phoneNumber', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="+63 XXX XXX XXXX"
                  />
                </div>

                <div>
                  <Label htmlFor="address" className="text-gray-700 mb-2 block">Address *</Label>
                  <Input
                    id="address"
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleChange('address', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="Complete address"
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyContact" className="text-gray-700 mb-2 block">Emergency Contact Number *</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="Guardian/Parent contact"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button 
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 shadow-md h-12 text-[18px] transition-all"
                  >
                    ← Back
                  </Button>
                  <Button 
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-[#780302] to-[#a00402] text-white hover:from-[#5a0201] hover:to-[#780302] shadow-lg h-12 text-[18px] transition-all hover:shadow-xl"
                  >
                    Complete Registration
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}