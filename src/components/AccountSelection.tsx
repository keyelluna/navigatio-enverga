import { User, GraduationCap, BookOpen, ArrowRight } from 'lucide-react';
import imgImg79934 from "figma:asset/c25b1fe69c351497b5677896e641e46ea498b783.png";
import imgImage1 from "figma:asset/e30c10d7f9b16dd75f0275ed8191330fefa3bd8d.png";

interface AccountSelectionProps {
  onSelect: (type: 'visitor' | 'student' | 'faculty') => void;
}

export default function AccountSelection({ onSelect }: AccountSelectionProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 relative w-full min-h-screen overflow-hidden flex items-center justify-center p-4 sm:p-6">
      {/* Background Image - subtle */}
      <div className="absolute inset-0 opacity-5">
        <img alt="" className="w-full h-full object-cover" src={imgImg79934} />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-[#780302]/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-[#780302]/10 rounded-full blur-3xl" />
      </div>

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-5xl">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="flex justify-center mb-4 sm:mb-6">
            <div className="size-20 sm:size-24 md:size-32 bg-white rounded-full p-3 shadow-2xl">
              <img alt="University Logo" className="w-full h-full object-contain" src={imgImage1} />
            </div>
          </div>
          <h1 className="font-lilita text-[#780302] text-[28px] sm:text-[36px] md:text-[48px] mb-2 sm:mb-3 px-4">
            Campus Navigator
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl max-w-2xl mx-auto px-4">
            Choose your account type to begin exploring our campus
          </p>
        </div>

        {/* Account Type Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-4xl mx-auto px-2">
          {/* Visitor Card */}
          <button
            onClick={() => onSelect('visitor')}
            className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-98 border-2 border-transparent hover:border-[#780302]/20 min-h-[280px] sm:min-h-[320px]"
          >
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 h-full justify-between">
              <div className="relative">
                <div className="absolute inset-0 bg-[#780302]/10 rounded-full blur-xl group-hover:bg-[#780302]/20 transition-all duration-300" />
                <div className="relative size-16 sm:size-20 bg-gradient-to-br from-[#780302] to-[#a00402] rounded-full flex items-center justify-center shadow-lg">
                  <User className="size-8 sm:size-10 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-lilita text-[#780302] text-[24px] sm:text-[28px] mb-1 sm:mb-2">
                  Visitor
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                  Explore campus facilities and navigate buildings without an account
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#780302] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pt-2">
                <span className="text-sm sm:text-base">Continue</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </button>

          {/* Student Card */}
          <button
            onClick={() => onSelect('student')}
            className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-98 border-2 border-transparent hover:border-[#780302]/20 min-h-[280px] sm:min-h-[320px]"
          >
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 h-full justify-between">
              <div className="relative">
                <div className="absolute inset-0 bg-[#780302]/10 rounded-full blur-xl group-hover:bg-[#780302]/20 transition-all duration-300" />
                <div className="relative size-16 sm:size-20 bg-gradient-to-br from-[#780302] to-[#a00402] rounded-full flex items-center justify-center shadow-lg">
                  <GraduationCap className="size-8 sm:size-10 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-lilita text-[#780302] text-[24px] sm:text-[28px] mb-1 sm:mb-2">
                  Student
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                  Access personalized features and manage your campus experience
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#780302] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pt-2">
                <span className="text-sm sm:text-base">Sign In / Register</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </button>

          {/* Faculty Card */}
          <button
            onClick={() => onSelect('faculty')}
            className="group relative bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl active:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-98 border-2 border-transparent hover:border-[#780302]/20 min-h-[280px] sm:min-h-[320px] sm:col-span-2 md:col-span-1"
          >
            <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4 h-full justify-between">
              <div className="relative">
                <div className="absolute inset-0 bg-[#780302]/10 rounded-full blur-xl group-hover:bg-[#780302]/20 transition-all duration-300" />
                <div className="relative size-16 sm:size-20 bg-gradient-to-br from-[#780302] to-[#a00402] rounded-full flex items-center justify-center shadow-lg">
                  <BookOpen className="size-8 sm:size-10 text-white" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-center">
                <h3 className="font-lilita text-[#780302] text-[24px] sm:text-[28px] mb-1 sm:mb-2">
                  Faculty
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed px-2">
                  Manage campus resources and access faculty-specific tools
                </p>
              </div>

              <div className="flex items-center gap-2 text-[#780302] opacity-0 group-hover:opacity-100 group-active:opacity-100 transition-opacity duration-200 pt-2">
                <span className="text-sm sm:text-base">Sign In / Register</span>
                <ArrowRight className="size-4" />
              </div>
            </div>
          </button>
        </div>

        {/* Footer Info */}
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-gray-500 text-xs sm:text-sm">
            Need help? Contact support at <span className="text-[#780302]">support@university.edu</span>
          </p>
        </div>
      </div>
    </div>
  );
}