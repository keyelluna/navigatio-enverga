// LocalStorage utilities for managing app data

export interface User {
  id: string;
  email: string;
  password: string;
  userType: 'student' | 'faculty';
  name: string;
  schoolId?: string;
  year?: string;
  educationLevel?: string;
  course?: string;
  department?: string;
  position?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  description?: string;
  createdBy: string;
}

export interface LostFoundItem {
  id: string;
  type: 'lost' | 'found';
  itemName: string;
  description: string;
  location: string;
  date: string;
  contactInfo: string;
  reportedBy: string;
  status: 'open' | 'resolved';
}

// User Management
export const getUsers = (): User[] => {
  const users = localStorage.getItem('campus_users');
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('campus_users', JSON.stringify(users));
};

export const getUserByEmail = (email: string): User | undefined => {
  const users = getUsers();
  return users.find(u => u.email === email);
};

export const authenticateUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem('campus_current_user');
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem('campus_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('campus_current_user');
  }
};

// Calendar Events Management
export const getCalendarEvents = (): CalendarEvent[] => {
  const events = localStorage.getItem('campus_calendar_events');
  if (!events) {
    // Initialize with default events
    const defaultEvents: CalendarEvent[] = [
      {
        id: '1',
        title: 'Last Day of Classes - Fall Semester',
        date: '2025-12-20',
        description: 'Final day of fall semester classes',
        createdBy: 'system'
      },
      {
        id: '2',
        title: 'Spring Semester Begins',
        date: '2026-01-06',
        description: 'First day of spring semester',
        createdBy: 'system'
      },
      {
        id: '3',
        title: 'Add/Drop Period',
        date: '2026-01-13',
        description: 'Add/Drop period from January 13-17',
        createdBy: 'system'
      }
    ];
    localStorage.setItem('campus_calendar_events', JSON.stringify(defaultEvents));
    return defaultEvents;
  }
  return JSON.parse(events);
};

export const saveCalendarEvent = (event: CalendarEvent): void => {
  const events = getCalendarEvents();
  events.push(event);
  events.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  localStorage.setItem('campus_calendar_events', JSON.stringify(events));
};

export const deleteCalendarEvent = (eventId: string): void => {
  const events = getCalendarEvents();
  const filtered = events.filter(e => e.id !== eventId);
  localStorage.setItem('campus_calendar_events', JSON.stringify(filtered));
};

// Lost & Found Management
export const getLostFoundItems = (): LostFoundItem[] => {
  const items = localStorage.getItem('campus_lostfound_items');
  return items ? JSON.parse(items) : [];
};

export const saveLostFoundItem = (item: LostFoundItem): void => {
  const items = getLostFoundItems();
  items.push(item);
  localStorage.setItem('campus_lostfound_items', JSON.stringify(items));
};

export const updateLostFoundItemStatus = (itemId: string, status: 'open' | 'resolved'): void => {
  const items = getLostFoundItems();
  const item = items.find(i => i.id === itemId);
  if (item) {
    item.status = status;
    localStorage.setItem('campus_lostfound_items', JSON.stringify(items));
  }
};

export const deleteLostFoundItem = (itemId: string): void => {
  const items = getLostFoundItems();
  const filtered = items.filter(i => i.id !== itemId);
  localStorage.setItem('campus_lostfound_items', JSON.stringify(filtered));
};
