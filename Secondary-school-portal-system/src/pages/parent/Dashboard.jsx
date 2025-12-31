import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, DollarSign, Calendar, TrendingUp, Clock } from 'lucide-react';
import ParentLayout from '../../components/layout/ParentLayout';
import Card from '../../components/common/TempCard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/TempButton';
import { mockParentService } from '../../services/mockData';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    mockParentService.getDashboard()
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ParentLayout>
        <Loading message="Loading dashboard..." />
      </ParentLayout>
    );
  }

  const quickStats = [
    {
      title: "Total Fees Balance",
      value: `MWK ${data.totalBalance.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-red-500",
      trend: "Due: Jan 31, 2025"
    },
    {
      title: "Latest Results",
      value: "Term 3, 2024",
      icon: TrendingUp,
      color: "bg-green-500",
      trend: "Available"
    },
    {
      title: "Upcoming Events",
      value: data.upcomingEvents.length,
      icon: Calendar,
      color: "bg-blue-500",
      trend: "This month"
    },
    {
      title: "Children Enrolled",
      value: data.children.length,
      icon: User,
      color: "bg-purple-500",
      trend: "Active students"
    }
  ];

  return (
    <ParentLayout>
      <div className="animate-fade-in">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {data.name.split(' ')[1]}! 👋
          </h2>
          <p className="text-gray-600">Here's what's happening with your children's education today.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {quickStats.map((stat, index) => (
            <Card key={index} hover>
              <div className="flex items-start justify-between mb-4">
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <stat.icon className="text-white" size={24} />
                </div>
              </div>
              <h3 className="text-gray-600 text-sm font-medium mb-1">{stat.title}</h3>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-xs text-gray-500">{stat.trend}</p>
            </Card>
          ))}
        </div>

        {/* Children Cards */}
        <section className="mb-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Your Children</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.children.map((child) => (
              <Card key={child.id} hover>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-2xl font-bold">
                      {child.firstName[0]}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-bold text-gray-900">{child.fullName}</h4>
                    <p className="text-sm text-gray-600">Form {child.formLevel} • Class {child.className}</p>
                    
                    <div className="flex gap-4 mt-3">
                      <div className="flex-1 bg-green-50 rounded-lg p-2">
                        <p className="text-xs text-gray-600">Recent Grade</p>
                        <p className="text-lg font-bold text-green-600">{child.recentGrade}</p>
                      </div>
                      <div className="flex-1 bg-blue-50 rounded-lg p-2">
                        <p className="text-xs text-gray-600">Attendance</p>
                        <p className="text-lg font-bold text-blue-600">{child.attendance}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mt-4">
                      <Button 
                        size="sm" 
                        onClick={() => navigate('/results')}
                        className="flex-1"
                      >
                        View Results
                      </Button>
                      <Button 
                        size="sm"
                        variant="outline"
                        onClick={() => navigate('/fees')}
                        className="flex-1"
                      >
                        Check Fees
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <section className="lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-900">Recent Announcements</h3>
              <button className="text-blue-600 text-sm hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {data.announcements.map((announcement) => (
                <Card key={announcement.id} hover>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                      announcement.priority === 'high' ? 'bg-red-500' :
                      announcement.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-green-500'
                    }`}></div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-1">
                        <h4 className="font-semibold text-gray-900">{announcement.title}</h4>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">{announcement.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed">{announcement.message}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          {/* Upcoming Events */}
          <section>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upcoming Events</h3>
            <Card>
              <div className="space-y-4">
                {data.upcomingEvents.map((event) => (
                  <div key={event.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      {event.type === 'exam' ? <FileText size={20} className="text-blue-600" /> :
                       event.type === 'meeting' ? <User size={20} className="text-blue-600" /> :
                       <Calendar size={20} className="text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm">{event.title}</h4>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <Clock size={12} />
                        {event.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button 
                variant="ghost" 
                fullWidth 
                onClick={() => navigate('/calendar')}
                className="mt-4"
              >
                View Full Calendar
              </Button>
            </Card>
          </section>
        </div>
      </div>
    </ParentLayout>
  );
}