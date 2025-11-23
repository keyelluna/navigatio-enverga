import { useState } from 'react';
import { X, Calendar, User, Settings, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import CalendarManagement from './CalendarManagement';
import ProfileView from './ProfileView';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  userType: 'visitor' | 'student' | 'faculty' | null;
  onLogout: () => void;
}

export default function HamburgerMenu({ isOpen, onClose, userType, onLogout }: HamburgerMenuProps) {
  const [activeView, setActiveView] = useState<'menu' | 'calendar' | 'profile'>('menu');

  const handleViewChange = (view: 'menu' | 'calendar' | 'profile') => {
    setActiveView(view);
  };

  const handleBack = () => {
    setActiveView('menu');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {/* Header */}
            <div className="bg-[maroon] text-white p-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <h2 className="font-lilita text-[24px]">
                  {activeView === 'calendar' ? 'Calendar' : activeView === 'profile' ? 'Profile' : 'Menu'}
                </h2>
                <button
                  onClick={activeView === 'menu' ? onClose : handleBack}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <X className="size-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              {activeView === 'menu' && (
                <div className="space-y-3">
                  <Button
                    onClick={() => handleViewChange('calendar')}
                    className="w-full justify-start h-14 text-left bg-white text-[#780302] border-2 border-[#780302] hover:bg-[#780302] hover:text-white transition-all"
                  >
                    <Calendar className="size-5 mr-3" />
                    School Calendar
                  </Button>

                  {userType !== 'visitor' && (
                    <Button
                      onClick={() => handleViewChange('profile')}
                      className="w-full justify-start h-14 text-left bg-white text-[#780302] border-2 border-[#780302] hover:bg-[#780302] hover:text-white transition-all"
                    >
                      <User className="size-5 mr-3" />
                      My Profile
                    </Button>
                  )}

                  {userType === 'faculty' && (
                    <Button
                      onClick={() => handleViewChange('calendar')}
                      className="w-full justify-start h-14 text-left bg-white text-[#8b5cf6] border-2 border-[#8b5cf6] hover:bg-[#8b5cf6] hover:text-white transition-all"
                    >
                      <Settings className="size-5 mr-3" />
                      Manage Calendar
                    </Button>
                  )}

                  <div className="pt-4 border-t border-gray-200 mt-4">
                    <Button
                      onClick={() => {
                        onLogout();
                        onClose();
                      }}
                      className="w-full justify-start h-14 text-left bg-white text-red-600 border-2 border-red-600 hover:bg-red-600 hover:text-white transition-all"
                    >
                      <LogOut className="size-5 mr-3" />
                      {userType === 'visitor' ? 'Exit' : 'Logout'}
                    </Button>
                  </div>
                </div>
              )}

              {activeView === 'calendar' && (
                <CalendarManagement userType={userType} onBack={handleBack} />
              )}

              {activeView === 'profile' && userType !== 'visitor' && (
                <ProfileView userType={userType} onBack={handleBack} />
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}