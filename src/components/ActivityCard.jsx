import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, MapPin, DollarSign, GripVertical, Camera, Utensils, Car, Building } from 'lucide-react';

const ActivityCard = ({ activity, isDragging, isOverlay = false }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ 
    id: activity.id,
    disabled: isOverlay,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
    opacity: isSortableDragging ? 0.5 : 1,
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sightseeing':
        return <Camera className="w-4 h-4" />;
      case 'dining':
        return <Utensils className="w-4 h-4" />;
      case 'transport':
        return <Car className="w-4 h-4" />;
      case 'accommodation':
        return <Building className="w-4 h-4" />;
      default:
        return <MapPin className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'sightseeing':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'dining':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'transport':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'accommodation':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing ${
        isDragging || isSortableDragging ? 'shadow-xl scale-105 rotate-1' : ''
      } ${isOverlay ? 'shadow-2xl z-50' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="flex">
        {/* Image Section */}
        <div className="relative w-24 h-24 flex-shrink-0">
          <img 
            src={activity.image} 
            alt={activity.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=300&h=200&fit=crop&crop=center';
            }}
          />
          {/* Drag Handle Overlay */}
          <div className="absolute top-1 left-1 opacity-0 group-hover:opacity-100 transition-opacity bg-black/20 rounded p-1">
            <GripVertical className="w-3 h-3 text-white" />
          </div>
          
          {/* Activity Type Badge */}
          <div className="absolute bottom-1 right-1">
            <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium border ${getTypeColor(activity.type)}`}>
              {getActivityIcon(activity.type)}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-grow p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex-grow">
              <h4 className="font-semibold text-gray-800 text-base leading-tight mb-1">
                {activity.title}
              </h4>
              <div className="flex items-center space-x-3 text-xs text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{activity.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate max-w-20">{activity.location}</span>
                </div>
              </div>
            </div>
            
            {activity.cost && (
              <div className="flex items-center text-green-600 font-semibold text-sm ml-2">
                <DollarSign className="w-3 h-3" />
                <span>{activity.cost}</span>
              </div>
            )}
          </div>

          {activity.description && (
            <p className="text-gray-600 text-xs leading-relaxed line-clamp-2 mb-2">
              {activity.description}
            </p>
          )}

          <div className="flex items-center justify-between">
            {activity.duration && (
              <div className="text-xs text-gray-500">
                Duration: {activity.duration}
              </div>
            )}
            
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getTypeColor(activity.type)}`}>
              {activity.type}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;