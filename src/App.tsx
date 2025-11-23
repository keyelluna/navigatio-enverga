import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LaunchPage from './components/LaunchPage';
import AccountSelection from './components/AccountSelection';
import SignIn from './components/SignIn';
import StudentSignUp from './components/StudentSignUp';
import FacultySignUp from './components/FacultySignUp';
import HomePage from './components/HomePage';
import { setCurrentUser } from './utils/localStorage';
import { easeInOut } from "framer-motion";

type Screen = 'launch' | 'account-selection' | 'student-signin' | 'student-signup' | 'faculty-signin' | 'faculty-signup' | 'home';
type UserType = 'visitor' | 'student' | 'faculty' | null;

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('launch');
  const [userType, setUserType] = useState<UserType>(null);

  const handleLaunchComplete = () => {
    setCurrentScreen('account-selection');
  };

  const handleAccountSelect = (type: 'visitor' | 'student' | 'faculty') => {
    setUserType(type);
    if (type === 'visitor') {
      setCurrentScreen('home');
    } else if (type === 'student') {
      setCurrentScreen('student-signin');
    } else {
      setCurrentScreen('faculty-signin');
    }
  };

  const handleSignInSuccess = () => {
    setCurrentScreen('home');
  };

  const handleGoToSignUp = () => {
    if (userType === 'student') {
      setCurrentScreen('student-signup');
    } else if (userType === 'faculty') {
      setCurrentScreen('faculty-signup');
    }
  };

  const handleSignUpSuccess = () => {
    setCurrentScreen('home');
  };

  const handleBackToAccountSelection = () => {
    setCurrentScreen('account-selection');
    setUserType(null);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('launch');
    setUserType(null);
  };

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 1.05 }
  };
  const pageTransition = {
    duration: 0.4,
    ease: easeInOut
  };
  
  return (
    <div className="min-h-screen w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'launch' && (
          <motion.div
            key="launch"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <LaunchPage onComplete={handleLaunchComplete} />
          </motion.div>
        )}
        {currentScreen === 'account-selection' && (
          <motion.div
            key="account-selection"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <AccountSelection onSelect={handleAccountSelect} />
          </motion.div>
        )}
        {currentScreen === 'student-signin' && (
          <motion.div
            key="student-signin"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SignIn 
              userType="student" 
              onSignInSuccess={handleSignInSuccess}
              onGoToSignUp={handleGoToSignUp}
              onBack={handleBackToAccountSelection}
            />
          </motion.div>
        )}
        {currentScreen === 'faculty-signin' && (
          <motion.div
            key="faculty-signin"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <SignIn 
              userType="faculty" 
              onSignInSuccess={handleSignInSuccess}
              onGoToSignUp={handleGoToSignUp}
              onBack={handleBackToAccountSelection}
            />
          </motion.div>
        )}
        {currentScreen === 'student-signup' && (
          <motion.div
            key="student-signup"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <StudentSignUp 
              onSignUpSuccess={handleSignUpSuccess}
              onBack={handleBackToAccountSelection}
            />
          </motion.div>
        )}
        {currentScreen === 'faculty-signup' && (
          <motion.div
            key="faculty-signup"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <FacultySignUp 
              onSignUpSuccess={handleSignUpSuccess}
              onBack={handleBackToAccountSelection}
            />
          </motion.div>
        )}
        {currentScreen === 'home' && (
          <motion.div
            key="home"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageVariants}
            transition={pageTransition}
          >
            <HomePage userType={userType} onLogout={handleLogout} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}