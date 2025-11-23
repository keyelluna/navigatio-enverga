import { motion } from 'motion/react';
import { X, Clock, Users, MapPin } from 'lucide-react';
import { FacilityData } from '../data/facilitiesData';

interface FacilityDetailModalProps {
  facility: FacilityData;
  onClose: () => void;
}

export default function FacilityDetailModal({ facility, onClose }: FacilityDetailModalProps) {
  return (
    <motion.div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Image */}
        <div className="relative h-64 bg-gray-200">
          <img
            src={facility.image}
            alt={facility.name}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
          >
            <X className="size-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <h2 className="text-[#780302] mb-2 font-lilita text-[32px]">
            {facility.name}
          </h2>
          
          <div className="flex items-center gap-2 text-gray-600 mb-4">
            <MapPin className="size-5" />
            <span>{facility.location}</span>
          </div>

          <div className="space-y-4">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">About</h3>
              <p className="text-gray-600">{facility.description}</p>
            </div>

            {/* For Whom */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                <Users className="size-5" />
                For Whom
              </h3>
              <p className="text-gray-600">{facility.forWhom}</p>
            </div>

            {/* Office Hours */}
            {facility.officeHours && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Clock className="size-5" />
                  Office Hours
                </h3>
                <div className="space-y-1">
                  {facility.officeHours.map((hours, index) => (
                    <p key={index} className="text-gray-600">{hours}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Additional Info */}
            {facility.additionalInfo && (
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Additional Information</h3>
                <p className="text-gray-600 text-sm">{facility.additionalInfo}</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}