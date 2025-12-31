import React, { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, FileText, Users, PartyPopper, Clock } from 'lucide-react';
import ParentLayout from '../../components/layout/ParentLayout';
import Card from '../../components/common/TempCard';
import Loading from '../../components/common/Loading';
import { mockCalendarService } from '../../services/mockData';

export default function Calendar() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    mockCalendarService.getEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ParentLayout>
        <Loading message="Loading calendar..." />
      </ParentLayout>
    );
  }

  const getEventIcon = (type) => {
    switch (type) {
      case 'exam': return FileText;
      case 'meeting': return Users;
      case 'event': return PartyPopper;
      default: return CalendarIcon;
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'exam': return 'bg-red-100 text-red-600';
      case 'meeting': return 'bg-blue-100 text-blue-600';
      case 'event': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.type === filter);

  const upcomingEvents = filteredEvents.filter(e => 
    new Date(e.startDate) >= new Date()
  ).sort((a, b) => new Date(a.startDate) - new Date(b.startDate));

  const pastEvents = filteredEvents.filter(e => 
    new Date(e.endDate) < new Date()
  ).sort((a, b) => new Date(b.startDate) - new Date(a.startDate));

  return (
    <ParentLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">School Calendar</h2>
          <p className="text-gray-600">View all school events, exams, and important dates</p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            { value: 'all', label: 'All Events' },
            { value: 'exam', label: 'Exams' },
            { value: 'meeting', label: 'Meetings' },
            { value: 'event', label: 'Events' }
          ].map(tab => (
            <button
              key={tab.value}
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === tab.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Upcoming Events */}
        {upcomingEvents.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingEvents.map(event => {
                const Icon = getEventIcon(event.type);
                const colorClass = getEventColor(event.type);
                const startDate = new Date(event.startDate);
                const endDate = new Date(event.endDate);
                const isSameDay = startDate.toDateString() === endDate.toDateString();

                return (
                  <Card key={event.id} hover>
                    <div className="flex items-start gap-4">
                      <div className={`w-14 h-14 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-gray-900">{event.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${colorClass}`}>
                            {event.type}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock size={16} />
                          <span>
                            {isSameDay
                              ? startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
                              : `${startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - ${endDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Past Events */}
        {pastEvents.length > 0 && (
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Past Events</h3>
            <div className="space-y-3">
              {pastEvents.map(event => {
                const Icon = getEventIcon(event.type);
                const colorClass = getEventColor(event.type);
                const startDate = new Date(event.startDate);

                return (
                  <Card key={event.id} className="opacity-75">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 ${colorClass}`}>
                        <Icon size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-gray-900">{event.title}</h4>
                          <span className="text-sm text-gray-500">
                            {startDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {filteredEvents.length === 0 && (
          <Card className="text-center py-12">
            <CalendarIcon size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Events Found</h3>
            <p className="text-gray-600">There are no events matching your filter.</p>
          </Card>
        )}
      </div>
    </ParentLayout>
  );
}