import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import ActivityCard from './ActivityCard';

const DaySection = ({ day }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in">
      {/* Day Header */}
      <div className="flex items-center mb-6 pb-4 border-b border-gray-100">
        <div className="bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-lg mr-4">
          {day.dayNumber}
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800">{day.title}</h3>
          <div className="flex items-center text-gray-600 mt-1">
            <Calendar className="w-4 h-4 mr-1" />
            <span className="text-sm">{day.date}</span>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="space-y-4">
        {day.activities.map((activity) => (
          <ActivityCard 
            key={activity.id} 
            activity={activity}
            isDragging={false}
          />
        ))}
      </div>
    </div>
  );
};

export default DaySection;