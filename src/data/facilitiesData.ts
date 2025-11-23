import resourceCenter from '../assets/images/Resource_Center.JPG'
import speechLab from '../assets/images/Speech_Laboratory.jpg'
import CBAOffice from '../assets/images/CBA_office.png'
import collegeLibrary from '../assets/images/collegeLibrary.png'
import hsLibrary from '../assets/images/hsLibrary.png'
import elemLibrary from '../assets/images/silid_aklatan.jpg'
import gym from '../assets/images/euc_gym.JPG'
import sANDr from '../assets/images/S-and-R.png'
import hrmLectureRoom from '../assets/images/HRM_lecture_room.jpg'
import HCKitchen from '../assets/images/Hot_and_Cold_Kitchen.jpg'
import jhsCanteen from '../assets/images/jhs_canteen.jpg'
import comlab1 from '../assets/images/comlab.JPG'
import comlab2 from '../assets/images/comlab_2.jpg'
import comlab3 from '../assets/images/computerLab3.jpg'
import chapel from '../assets/images/Chapel.JPG'
import registrar from '../assets/images/registrar.JPG'
import treasury from '../assets/images/treasury.JPG'
import functionHall from '../assets/images/function_hall.png'
import hwCenter from '../assets/images/health-and-wellness-center.JPG'
import accounting from '../assets/images/Accounting.JPG'
import deansOffice from '../assets/images/DeansOffice.jpg'
import conferenceRoom from '../assets/images/conferenceRoom.jpg'
import osas from '../assets/images/osas.jpg'
import nursingLab from '../assets/images/nursingskillslaboratory.png'
import nursingOffice from '../assets/images/nursingoffice.jpg'
import officeofthedirector from '../assets/images/officeofthedirector.jpg'
import officecommunityservice from '../assets/images/officecommunityservice.png'
import officeoddicipline from '../assets/images/officediscipline.png'
import bedpublication from '../assets/images/BEDpublication.png'
import officehsprincipal from '../assets/images/officehsprincipal.png'
import hsregistrar from '../assets/images/hsregistrar.png'
import guidanceofficeelem from '../assets/images/guidanceofficeelementary.png'
import principalofficegradeschool from '../assets/images/Principalofficegradeschool.jpg'


export interface FacilityData {
  id: string;
  name: string;
  location: string;
  description: string;
  forWhom: string;
  officeHours?: string[];
  image: string;
  additionalInfo?: string;
  type: 'building' | 'office' | 'facility' | 'laboratory' | 'recreation';
  position: { x: number; y: number; width: number; height: number }; // Position on the map image
}

export const facilitiesData: FacilityData[] = [
  {
    id: 'resource-center',
    name: 'Resource Center',
    location: '3rd Floor',
    description: 'The Resource Center provides academic resources, learning materials, and study support for all students. Access to educational materials, reference books, and multimedia resources.',
    forWhom: 'All students and faculty',
    officeHours: ['Monday - Friday: 8:00 AM - 4:00 PM'],
    image: resourceCenter,
    type: 'facility',
    position: { x: 15, y: 45, width: 8, height: 6 }
  },
  {
    id: 'speech-laboratory',
    name: 'Speech Laboratory',
    location: '3rd Floor',
    description: 'Modern speech laboratory equipped with audio recording facilities for language learning, speech practice, and communication skills development.',
    forWhom: 'Communication and Language students',
    officeHours: ['Monday - Friday: 8:00 AM - 4:00 PM'],
    image: speechLab,
    type: 'laboratory',
    position: { x: 30, y: 35, width: 10, height: 7 }
  },
  {
    id: 'cba-office',
    name: 'CBA Office',
    location: 'College of Business Administration Building',
    description: 'Main office for the College of Business Administration. Handles student concerns, academic advising, and administrative matters for CBA students.',
    forWhom: 'CBA students and faculty',
    officeHours: ['Monday - Friday: 8:00 AM - 4:00 PM'],
    image: CBAOffice,
    type: 'office',
    position: { x: 45, y: 28, width: 8, height: 5 }
  },
  {
    id: 'college-library',
    name: 'College Library',
    location: '2nd Floor',
    description: 'Main college library with extensive collection of books, journals, digital resources, and quiet study areas. Features modern facilities and computer workstations.',
    forWhom: 'All college students, faculty, and staff',
    officeHours: ['Monday - Friday: 7:00 AM - 5:00 PM'],
    image: collegeLibrary,
    type: 'building',
    position: { x: 52, y: 40, width: 12, height: 8 }
  },
  {
    id: 'euc-gymnasium',
    name: 'EUC Gymnasium',
    location: 'Sports Complex',
    description: 'Large multi-purpose gymnasium for sports activities, physical education classes, and university events. Features basketball court, volleyball court, and indoor sports facilities.',
    forWhom: 'All students, faculty, and registered sports clubs',
    officeHours: ['Monday - Friday: 6:00 AM - 9:00 PM', 'Saturday - Sunday: 7:00 AM - 8:00 PM'],
    image: gym,
    type: 'recreation',
    position: { x: 40, y: 58, width: 20, height: 12 }
  },
  {
    id: 'hrm-lecture-room',
    name: 'HRM Lecture Room',
    location: 'HRM Building',
    description: 'Specialized lecture room for Hotel and Restaurant Management courses with presentation equipment and comfortable seating.',
    forWhom: 'HRM students',
    officeHours: ['Monday - Friday: 7:00 AM - 9:00 PM', 'Saturday: 8:00 AM - 5:00 PM'],
    image: hrmLectureRoom,
    type: 'facility',
    position: { x: 25, y: 50, width: 9, height: 6 }
  },
  {
    id: 'hrm-hot-cold-kitchen',
    name: 'HRM Hot and Cold Kitchen',
    location: 'HRM Building',
    description: 'Professional training kitchens equipped with commercial-grade appliances for culinary arts practice and food preparation courses.',
    forWhom: 'HRM students enrolled in culinary courses',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: HCKitchen,
    type: 'facility',
    position: { x: 22, y: 62, width: 10, height: 7 }
  },
  {
    id: 'hrm-function-hall',
    name: 'HRM Function Hall',
    location: 'HRM Building',
    description: 'Elegant function hall for events management training, banquet practice, and hospitality service demonstrations.',
    forWhom: 'HRM students and event organizers',
    officeHours: ['By reservation - Contact HRM Office'],
    image: functionHall,
    type: 'facility',
    position: { x: 18, y: 72, width: 12, height: 8 }
  },
  {
    id: 'school-canteen',
    name: 'School Canteen',
    location: 'Ground Floor',
    description: 'Main canteen offering diverse meal options, snacks, and beverages. Features indoor seating and affordable student meals.',
    forWhom: 'All students, faculty, staff, and visitors',
    officeHours: ['Monday - Friday: 7:00 AM - 4:00 PM'],
    image: jhsCanteen,
    type: 'facility',
    position: { x: 8, y: 52, width: 7, height: 5 }
  },
  {
    id: 'chapel',
    name: 'Chapel',
    location: 'Ground Floor',
    description: 'Peaceful chapel for prayer, reflection, and religious services. Open to all faiths and beliefs.',
    forWhom: 'All members of the university community',
    officeHours: ['Open daily: 7:00 AM - 6:00 PM'],
    image: chapel,
    type: 'facility',
    position: { x: 12, y: 38, width: 8, height: 6 }
  },
  {
    id: 'registrar',
    name: 'Registrar',
    location: 'DRB Building, Ground Floor',
    description: 'Handles student registration, enrollment, academic records, transcripts, certifications, and grade management.',
    forWhom: 'All students',
    officeHours: ['Monday - Friday: 8:00 AM - 4:00 PM', 'Lunch Break: 12:00 PM - 1:00 PM'],
    image:registrar,
    type: 'office',
    position: { x: 70, y: 35, width: 6, height: 4 }
  },
  {
    id: 'accounting',
    name: 'Accounting Office',
    location: 'DRB Building, Ground Floor',
    description: 'Handles tuition payments, billing, financial records, and student account management.',
    forWhom: 'All students and parents/guardians',
    officeHours: ['Monday - Friday: 8:00 AM - 4:00 PM', 'Lunch Break: 12:00 PM - 1:00 PM'],
    image:accounting,
    type: 'office',
    position: { x: 65, y: 42, width: 6, height: 4 }
  },
  {
    id: 'treasurer',
    name: 'Treasurer Office',
    location: 'DRB Building, Ground Floor',
    description: 'Manages university finances, processes payments, and provides payment receipts.',
    forWhom: 'All students and staff',
    officeHours: ['Monday - Friday: 8:00 AM - 4:00 PM', 'Lunch Break: 12:00 PM - 1:00 PM'],
    image: treasury,
    type: 'office',
    position: { x: 65, y: 48, width: 6, height: 4 }
  },
  {
    id: 'deans-office',
    name: 'Dean\'s Office',
    location: 'DRB building, Ground Floor',
    description: 'Office of the academic dean. Handles academic policies, curriculum matters, and student academic concerns.',
    forWhom: 'Students with academic concerns and faculty',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Appointments recommended'],
    image: deansOffice,
    type: 'office',
    position: { x: 55, y: 25, width: 7, height: 5 }
  },
  {
    id: 'conference-room',
    name: 'Conference Room',
    location: 'DRB Building, Ground Floor',
    description: 'Professional conference room for meetings, seminars, and academic discussions.',
    forWhom: 'Faculty and authorized personnel',
    officeHours: ['By reservation only'],
    image: conferenceRoom,
    type: 'facility',
    position: { x: 62, y: 30, width: 8, height: 5 }
  },
  {
    id: 'osas',
    name: 'OSAS (Office of Student Affairs and Services)',
    location: 'DRB building, 2nd Floor',
    description: 'Provides comprehensive student support services including counseling, student activities, organizations, and student welfare programs.',
    forWhom: 'All students',
    officeHours: ['Monday - Friday: 7:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 1:00 PM'],
    image:osas,
    type: 'office',
    position: { x: 75, y: 55, width: 7, height: 5 }
  },
  {
    id: 'office-director',
    name: 'Office of the Director',
    location: 'DRB building, 2nd Floor',
    description: 'Executive office of the university director overseeing overall university operations and strategic planning.',
    forWhom: 'By appointment only',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: officeofthedirector,
    type: 'office',
    position: { x: 48, y: 20, width: 7, height: 5 }
  },
  {
    id: 'computer-lab-1',
    name: 'Computer Lab 1',
    location: 'DRB building, 2nd Floor',
    description: 'Modern computer laboratory with latest hardware and software for programming, design, and general computing courses.',
    forWhom: 'Computer Science students',
    officeHours: ['Monday - Friday: 7:00 AM - 5:00 PM'],
    image: comlab1,
    type: 'laboratory',
    position: { x: 32, y: 42, width: 8, height: 6 }
  },
  {
    id: 'computer-lab-2',
    name: 'Computer Lab 2',
    location: 'DRB building, 2nd Floor',
    description: 'Additional computer laboratory facility for programming and software development courses.',
    forWhom: 'Computer Science students',
    officeHours: ['Monday - Friday: 7:00 AM - 5:00 PM'],
    image: comlab2,
    type: 'laboratory',
    position: { x: 40, y: 42, width: 8, height: 6 }
  },
  {
    id: 'computer-lab-3',
    name: 'Computer Lab 3',
    location: 'DRB building, 2nd Floor',
    description: 'Third computer laboratory with specialized software for advanced computing courses.',
    forWhom: 'Computer Science students',
    officeHours: ['Monday - Friday: 7:00 AM - 5:00 PM'],
    image: comlab3,
    type: 'laboratory',
    position: { x: 48, y: 42, width: 8, height: 6 }
  },
  {
    id: 'hs-principal-office',
    name: 'Office of High School Principal',
    location: 'NEL building, 2nd Floor',
    description: 'Principal\'s office for high school department. Handles disciplinary matters, academic concerns, and administrative issues.',
    forWhom: 'High school students and parents',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: officehsprincipal,
    type: 'office',
    position: { x: 78, y: 62, width: 7, height: 5 }
  },
  {
    id: 'hs-registrar',
    name: 'High School Registrar',
    location: 'DRB building, 2nd Floor',
    description: 'Registrar office for high school students handling enrollment, records, and academic documentation.',
    forWhom: 'High school students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Lunch Break: 12:00 PM - 1:00 PM'],
    image:hsregistrar,
    type: 'office',
    position: { x: 78, y: 68, width: 7, height: 5 }
  },
  {
    id: 'research-publication',
    name: 'Research and Publication Center',
    location: 'DRB building, 3rd Floor',
    description: 'Supports research activities, academic publications, and thesis/dissertation preparation.',
    forWhom: 'Faculty and graduate students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: 'https://images.unsplash.com/photo-1703236079592-4d2f222e8d2f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzYzNDg1NzQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'office',
    position: { x: 85, y: 45, width: 8, height: 6 }
  },
  {
    id: 'robotics-lab-1',
    name: 'Robotics Laboratory 1',
    location: 'DRB building, 2nd Floor',
    description: 'Advanced robotics laboratory with equipment for robot design, programming, and testing.',
    forWhom: 'Engineering and IT students in robotics courses',
    officeHours: ['Monday - Friday: 8:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 3:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 88, y: 28, width: 8, height: 6 }
  },
  {
    id: 'robotics-lab-2',
    name: 'Robotics Laboratory 2',
    location: 'Engineering Building',
    description: 'Second robotics laboratory for advanced projects and competitions.',
    forWhom: 'Engineering and IT students in robotics courses',
    officeHours: ['Monday - Friday: 8:00 AM - 7:00 PM', 'Saturday: 9:00 AM - 3:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 88, y: 35, width: 8, height: 6 }
  },
  {
    id: 'chemistry-lab',
    name: 'Chemistry Laboratory 1',
    location: 'Science Building',
    description: 'Fully equipped chemistry laboratory for experiments, demonstrations, and practical chemistry courses.',
    forWhom: 'Science students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 72, y: 72, width: 9, height: 7 }
  },
  {
    id: 'anatomy-physiology',
    name: 'Anatomy and Physiology Room',
    location: 'Nursing Building',
    description: 'Specialized classroom with anatomical models and equipment for anatomy and physiology studies.',
    forWhom: 'Nursing and medical students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: nursingLab,
    type: 'laboratory',
    position: { x: 65, y: 78, width: 9, height: 7 }
  },
  {
    id: 'nursing-skills-lab-1',
    name: 'Nursing Skills Lab 1',
    location: 'Nursing Building',
    description: 'Hands-on nursing laboratory with medical equipment for practicing clinical skills and procedures.',
    forWhom: 'Nursing students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image:nursingLab,
    type: 'laboratory',
    position: { x: 58, y: 72, width: 8, height: 6 }
  },
  {
    id: 'nursing-skills-lab-2',
    name: 'Nursing Skills Lab 2',
    location: 'Nursing Building',
    description: 'Additional nursing skills laboratory for advanced nursing procedures and simulation.',
    forWhom: 'Nursing students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: nursingLab,
    type: 'laboratory',
    position: { x: 58, y: 78, width: 8, height: 6 }
  },
  {
    id: 'hs-library',
    name: 'High School Library',
    location: 'High School Building',
    description: 'Library dedicated to high school students with age-appropriate resources and study areas.',
    forWhom: 'High school students',
    officeHours: ['Monday - Friday: 7:30 AM - 5:00 PM'],
    image: hsLibrary,
    type: 'building',
    position: { x: 82, y: 72, width: 10, height: 7 }
  },
  {
    id: 'nursing-office',
    name: 'Nursing Office',
    location: 'Nursing Building',
    description: 'Administrative office for the nursing department handling student concerns and program coordination.',
    forWhom: 'Nursing students and faculty',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: nursingOffice,
    type: 'office',
    position: { x: 52, y: 75, width: 6, height: 5 }
  },
  {
    id: 'health-wellness-center',
    name: 'Health and Wellness Center',
    location: 'Student Services Building',
    description: 'Provides basic medical services, first aid, health consultations, and wellness programs for students and staff.',
    forWhom: 'All students and staff',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM', 'Emergency services available'],
    image: hwCenter,
    type: 'facility',
    position: { x: 4, y: 65, width: 7, height: 5 }
  },
  {
    id: 'guidance-office-elem',
    name: 'Guidance Office Elementary',
    location: 'Elementary Building',
    description: 'Counseling and guidance services for elementary students addressing academic, social, and emotional concerns.',
    forWhom: 'Elementary students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: guidanceofficeelem,
    type: 'office',
    position: { x: 2, y: 72, width: 6, height: 5 }
  },
  {
    id: 'principal-office-gs',
    name: 'Principal Office Grade School',
    location: 'Grade School Building',
    description: 'Grade school principal\'s office overseeing elementary education programs and student welfare.',
    forWhom: 'Elementary students and parents',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: principalofficegradeschool,
    type: 'office',
    position: { x: 2, y: 78, width: 6, height: 5 }
  },
  {
    id: 'physics-lab',
    name: 'Physics Laboratory',
    location: 'Science Building',
    description: 'Physics laboratory equipped for experiments in mechanics, electricity, optics, and other physics topics.',
    forWhom: 'Science and engineering students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 90, y: 15, width: 9, height: 7 }
  },
  {
    id: 'tle-lab-1',
    name: 'TLE Laboratory 1',
    location: 'TLE Building',
    description: 'Technology and Livelihood Education laboratory for hands-on vocational and technical skills training.',
    forWhom: 'High school TLE students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 90, y: 48, width: 8, height: 6 }
  },
  {
    id: 'tle-lab-2',
    name: 'TLE Laboratory 2',
    location: 'TLE Building',
    description: 'Second TLE laboratory for additional vocational training programs.',
    forWhom: 'High school TLE students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 90, y: 55, width: 8, height: 6 }
  },
  {
    id: 'bed-comp-lab-1',
    name: 'BEd Computer Laboratory 1',
    location: 'Education Building',
    description: 'Computer laboratory for education students with educational software and teaching tools.',
    forWhom: 'Education students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 90, y: 22, width: 8, height: 6 }
  },
  {
    id: 'bed-comp-lab-2',
    name: 'BEd Computer Laboratory 2',
    location: 'Education Building',
    description: 'Additional computer laboratory for education students.',
    forWhom: 'Education students',
    officeHours: ['Monday - Friday: 8:00 AM - 6:00 PM'],
    image: 'https://images.unsplash.com/photo-1692133211836-52846376d66f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMGxhYiUyMGNsYXNzcm9vbXxlbnwxfHx8fDE3NjM1MzM5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    type: 'laboratory',
    position: { x: 90, y: 68, width: 8, height: 6 }
  },
  {
    id: 'silid-aklatan',
    name: 'Silid Aklatan',
    location: 'Academic Building',
    description: 'Filipino library section with Filipino literature and resources.',
    forWhom: 'All students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: elemLibrary,
    type: 'facility',
    position: { x: 90, y: 75, width: 8, height: 6 }
  },
  {
    id: 'bed-publication',
    name: 'BEd Publication',
    location: 'Education Building',
    description: 'Publication office for education department managing school publications and media.',
    forWhom: 'Education students and publication staff',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: bedpublication,
    type: 'office',
    position: { x: 90, y: 82, width: 7, height: 5 }
  },
  {
    id: 'office-discipline',
    name: 'Office of Discipline',
    location: 'Student Services Building',
    description: 'Handles student discipline, code of conduct violations, and behavioral concerns.',
    forWhom: 'All students',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: officeoddicipline,
    type: 'office',
    position: { x: 75, y: 48, width: 7, height: 5 }
  },
  {
    id: 'community-extension',
    name: 'Office of Community Extension Services',
    location: 'Admin Building',
    description: 'Coordinates community outreach programs, volunteer activities, and extension services.',
    forWhom: 'Students, faculty, and community partners',
    officeHours: ['Monday - Friday: 8:00 AM - 5:00 PM'],
    image: officecommunityservice,
    type: 'office',
    position: { x: 82, y: 55, width: 8, height: 5 }
  },
  {
    id: 'canteen-hs',
    name: 'Canteen HS',
    location: 'High School Building',
    description: 'Dedicated canteen for high school students with affordable meals and snacks.',
    forWhom: 'High school students',
    officeHours: ['Monday - Friday: 7:00 AM - 4:00 PM'],
    image: jhsCanteen,
    type: 'facility',
    position: { x: 3, y: 58, width: 6, height: 5 }
  },
  {
    id: 'sr-hall',
    name: 'S and R Hall',
    location: 'Campus Center',
    description: 'Multi-purpose hall for sports, recreation, events, assemblies, and large gatherings.',
    forWhom: 'All students and event organizers',
    officeHours: ['By reservation - Contact admin office'],
    image: sANDr,
    type: 'recreation',
    position: { x: 35, y: 12, width: 15, height: 10 }
  }
];
