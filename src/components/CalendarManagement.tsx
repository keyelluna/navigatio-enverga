import { useState, useEffect } from 'react';
import { Plus, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { getCalendarEvents, saveCalendarEvent, deleteCalendarEvent, type CalendarEvent, getCurrentUser } from '../utils/localStorage';

interface CalendarManagementProps {
  userType: 'visitor' | 'student' | 'faculty' | null;
  onBack: () => void;
}

export default function CalendarManagement({ userType, onBack }: CalendarManagementProps) {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    description: ''
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = () => {
    const loadedEvents = getCalendarEvents();
    setEvents(loadedEvents);
  };

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date) return;

    const currentUser = getCurrentUser();
    const event: CalendarEvent = {
      id: Date.now().toString(),
      title: newEvent.title,
      date: newEvent.date,
      description: newEvent.description,
      createdBy: currentUser?.email || 'admin'
    };

    saveCalendarEvent(event);
    setNewEvent({ title: '', date: '', description: '' });
    setIsAdding(false);
    loadEvents();
  };

  const handleDeleteEvent = (eventId: string) => {
    if (confirm('Are you sure you want to delete this event?')) {
      deleteCalendarEvent(eventId);
      loadEvents();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const isFaculty = userType === 'faculty';

  return (
    <div className="space-y-6">
      {/* Add Event Section - Faculty Only */}
      {isFaculty && (
        <div className="bg-[#780302]/5 rounded-lg p-4">
          {!isAdding ? (
            <Button
              onClick={() => setIsAdding(true)}
              className="w-full bg-[#780302] hover:bg-[#5a0201] text-white"
            >
              <Plus className="size-5 mr-2" />
              Add New Event
            </Button>
          ) : (
            <div className="space-y-4">
              <h3 className="text-[#780302] mb-3">Add New Event</h3>
              
              <div>
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  value={newEvent.title}
                  onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                  placeholder="Enter event title"
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="eventDate">Date</Label>
                <Input
                  id="eventDate"
                  type="date"
                  value={newEvent.date}
                  onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="eventDescription">Description (Optional)</Label>
                <Textarea
                  id="eventDescription"
                  value={newEvent.description}
                  onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                  placeholder="Enter event description"
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={handleAddEvent}
                  className="flex-1 bg-[#780302] hover:bg-[#5a0201] text-white"
                  disabled={!newEvent.title || !newEvent.date}
                >
                  Add Event
                </Button>
                <Button
                  onClick={() => {
                    setIsAdding(false);
                    setNewEvent({ title: '', date: '', description: '' });
                  }}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Events List */}
      <div className="space-y-3">
        <h3 className="text-[#780302] mb-3">
          {isFaculty ? 'All Events' : 'Upcoming Events'}
        </h3>
        
        {events.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <CalendarIcon className="size-12 mx-auto mb-3 opacity-30" />
            <p>No events scheduled</p>
          </div>
        ) : (
          events.map((event) => (
            <div
              key={event.id}
              className="border-l-4 border-[#780302] pl-4 py-3 bg-white rounded-r-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex-1">
                  <p className="text-sm text-gray-500 mb-1">{formatDate(event.date)}</p>
                  <p className="text-gray-900 mb-1">{event.title}</p>
                  {event.description && (
                    <p className="text-sm text-gray-600">{event.description}</p>
                  )}
                </div>
                
                {isFaculty && (
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  >
                    <Trash2 className="size-4" />
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
