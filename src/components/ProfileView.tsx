import { useEffect, useState } from 'react';
import { User, Mail, IdCard, GraduationCap, Building2 } from 'lucide-react';
import { getCurrentUser, type User as UserType } from '../utils/localStorage';

interface ProfileViewProps {
  userType: 'visitor' | 'student' | 'faculty' | null;
  onBack: () => void;
}

export default function ProfileView({ userType, onBack }: ProfileViewProps) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
  }, []);

  if (!user) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No profile information available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex flex-col items-center text-center pb-6 border-b">
        <div className="size-24 bg-[#780302]/10 rounded-full flex items-center justify-center mb-4">
          <User className="size-12 text-[#780302]" />
        </div>
        <h3 className="text-[#780302] mb-1">{user.name}</h3>
        <p className="text-gray-600 text-sm capitalize">{user.userType}</p>
      </div>

      {/* Profile Details */}
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
          <Mail className="size-5 text-[#780302] mt-0.5" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-gray-900">{user.email}</p>
          </div>
        </div>

        {user.schoolId && (
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <IdCard className="size-5 text-[#780302] mt-0.5" />
            <div>
              <p className="text-sm text-gray-500">School ID</p>
              <p className="text-gray-900">{user.schoolId}</p>
            </div>
          </div>
        )}

        {user.userType === 'student' && (
          <>
            {user.educationLevel && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="size-5 text-[#780302] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Education Level</p>
                  <p className="text-gray-900 capitalize">{user.educationLevel}</p>
                </div>
              </div>
            )}

            {user.year && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="size-5 text-[#780302] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Year Level</p>
                  <p className="text-gray-900">{user.year}</p>
                </div>
              </div>
            )}

            {user.course && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <GraduationCap className="size-5 text-[#780302] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Course</p>
                  <p className="text-gray-900">{user.course}</p>
                </div>
              </div>
            )}
          </>
        )}

        {user.userType === 'faculty' && (
          <>
            {user.department && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="size-5 text-[#780302] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Department</p>
                  <p className="text-gray-900">{user.department}</p>
                </div>
              </div>
            )}

            {user.position && (
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Building2 className="size-5 text-[#780302] mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Position</p>
                  <p className="text-gray-900">{user.position}</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
