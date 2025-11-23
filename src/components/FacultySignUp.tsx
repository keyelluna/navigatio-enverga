import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";
import { saveUser, getUserByEmail, setCurrentUser, type User } from '../utils/localStorage';
import { toast } from 'sonner';
import { motion } from "framer-motion";

interface FacultySignUpProps {
  onSignUpSuccess: () => void;
  onBack: () => void;
}

export default function FacultySignUp({ onSignUpSuccess, onBack }: FacultySignUpProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    employeeId: '',
    department: '',
    position: '',
    phoneNumber: '',
    officeLocation: '',
    specialization: '',
    emergencyContact: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Optional: validate step 1 fields before proceeding
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword || !formData.employeeId || !formData.department) {
      toast.error("Please fill all required fields for Step 1!");
      return;
    }
    setStep(2);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    // Validate step 2 fields
    if (!formData.position || !formData.specialization || !formData.officeLocation || !formData.phoneNumber || !formData.emergencyContact) {
      toast.error("Please fill all required fields for Step 2!");
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
      userType: 'faculty',
      name: `${formData.firstName} ${formData.lastName}`,
      schoolId: formData.employeeId,
      department: formData.department,
      position: formData.position
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
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#780302]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#780302]/5 rounded-full blur-3xl" />
      </div>

      {/* Back button */}
      <button 
        onClick={onBack}
        className="fixed top-6 left-6 z-50 p-3 bg-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all group"
      >
        <ArrowLeft className="size-5 text-[#780302] group-hover:-translate-x-1 transition-transform" />
      </button>

      {/* Sign Up Form */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#780302] to-[#a00402] p-8 text-white">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg">
              <img alt="University Logo" className="w-full h-full object-cover rounded-full" src={imgImage1} />
            </div>
          </div>
          <h2 className="text-center mb-2 font-lilita text-[32px]">
            Faculty Registration
          </h2>
          <p className="text-white/90 text-center">Join our teaching community</p>
          
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
                    placeholder="faculty@university.edu"
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
                  <Label htmlFor="employeeId" className="text-gray-700 mb-2 block">Employee ID *</Label>
                  <Input
                    id="employeeId"
                    type="text"
                    value={formData.employeeId}
                    onChange={(e) => handleChange('employeeId', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="Enter employee ID"
                  />
                </div>

                <div>
                  <Label htmlFor="department" className="text-gray-700 mb-2 block">Department *</Label>
                  <Select value={formData.department} onValueChange={(value: string) => handleChange('department', value)}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CCST">College of Computer Studies and Technology</SelectItem>
                      <SelectItem value="CTELA">College of Teacher Education and Liberal Arts</SelectItem>
                      <SelectItem value="CBA">College of Business Administration</SelectItem>
                      <SelectItem value="CNAHS">College of Nursing and Allied Health and Sciences</SelectItem>
                      <SelectItem value="CITHM">College of International Tourism and Hospitality Management</SelectItem>
                      <SelectItem value="N/A">N/A</SelectItem>
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
                  <Label htmlFor="position" className="text-gray-700 mb-2 block">Position/Rank *</Label>
                  <Select value={formData.position} onValueChange={(value: string) => handleChange('position', value)}>
                    <SelectTrigger className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]">
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Instructor">Instructor</SelectItem>
                      <SelectItem value="Department Head">Department Head</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="specialization" className="text-gray-700 mb-2 block">Specialization/Subject Area *</Label>
                  <Input
                    id="specialization"
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => handleChange('specialization', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="e.g., Mathematics, Computer Science"
                  />
                </div>

                <div>
                  <Label htmlFor="officeLocation" className="text-gray-700 mb-2 block">Office Location *</Label>
                  <Input
                    id="officeLocation"
                    type="text"
                    value={formData.officeLocation}
                    onChange={(e) => handleChange('officeLocation', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="Building and room number"
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
                  <Label htmlFor="emergencyContact" className="text-gray-700 mb-2 block">Emergency Contact Number *</Label>
                  <Input
                    id="emergencyContact"
                    type="tel"
                    value={formData.emergencyContact}
                    onChange={(e) => handleChange('emergencyContact', e.target.value)}
                    required
                    className="bg-gray-50 border-gray-300 focus:border-[#780302] focus:ring-[#780302]"
                    placeholder="Emergency contact"
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
      </motion.div>
    </div>
  );
}
