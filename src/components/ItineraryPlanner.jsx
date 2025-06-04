// components/ItineraryPlanner.jsx (Enhanced with Loading States)
import React, { useState, useCallback, useEffect } from 'react';
import { DndContext, DragOverlay, closestCenter, PointerSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import { Calendar, MapPin, Plane, RefreshCw } from 'lucide-react';
import DaySection from './DaySection';
import ActivityCard from './ActivityCard';
import LoadingSpinner, { DaySectionSkeleton, FullPageLoader } from './LoadingSpinner';
import { mockItineraryData } from '../data/mockData';

const ItineraryPlanner = () => {
  const [itinerary, setItinerary] = useState(null);
  const [activeId, setActiveId] = useState(null);
  const [draggedItem, setDraggedItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    })
  );

  // Simulate API call for loading data
  useEffect(() => {
    const loadItinerary = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Simulate potential error (uncomment to test error state)
        // if (Math.random() > 0.8) {
        //   throw new Error('Failed to load itinerary');
        // }
        
        setItinerary(mockItineraryData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    loadItinerary();
  }, []);

  // Simulate saving changes
  const saveChanges = async (newItinerary) => {
    try {
      setIsSaving(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      console.log('Itinerary saved:', newItinerary);
      
      // Show success feedback (you could add a toast notification here)
      setTimeout(() => setIsSaving(false), 500);
      
    } catch (err) {
      console.error('Failed to save:', err);
      setIsSaving(false);
    }
  };

  const handleDragStart = useCallback((event) => {
    const { active } = event;
    setActiveId(active.id);
    
    // Find the dragged item
    if (itinerary) {
      for (const day of itinerary.days) {
        const activity = day.activities.find(act => act.id === active.id);
        if (activity) {
          setDraggedItem(activity);
          break;
        }
      }
    }
  }, [itinerary]);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    
    if (!over || active.id === over.id || !itinerary) {
      setActiveId(null);
      setDraggedItem(null);
      return;
    }

    const newItinerary = { ...itinerary };
    
    // Find source and destination
    let sourceDay = null;
    let destDay = null;
    let sourceIndex = -1;
    let destIndex = -1;
    
    // Find source
    for (const day of newItinerary.days) {
      const index = day.activities.findIndex(act => act.id === active.id);
      if (index !== -1) {
        sourceDay = day;
        sourceIndex = index;
        break;
      }
    }
    
    // Find destination
    for (const day of newItinerary.days) {
      const index = day.activities.findIndex(act => act.id === over.id);
      if (index !== -1) {
        destDay = day;
        destIndex = index;
        break;
      }
    }
    
    if (sourceDay && destDay && sourceDay.id === destDay.id) {
      // Same day reordering
      const newActivities = arrayMove(sourceDay.activities, sourceIndex, destIndex);
      sourceDay.activities = newActivities;
      
      setItinerary(newItinerary);
      
      // Auto-save changes
      saveChanges(newItinerary);
    }
    
    setActiveId(null);
    setDraggedItem(null);
  }, [itinerary]);

  const handleRetry = () => {
    setError(null);
    setIsLoading(true);
    // Trigger reload
    window.location.reload();
  };

  // Loading state
  if (isLoading) {
    return <FullPageLoader text="Loading your amazing itinerary..." />;
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
        <div className="text-center bg-white rounded-2xl shadow-lg p-8 max-w-md">
          <div className="text-red-500 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Oops! Something went wrong</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={handleRetry}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // No data state
  if (!itinerary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-8 px-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">No itinerary found</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Plane className="w-8 h-8 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Y2Z Travel</h1>
          </div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">
            {itinerary.destination}
          </h2>
          <div className="flex items-center justify-center text-gray-600">
            <Calendar className="w-5 h-5 mr-2" />
            <span>{itinerary.dateRange}</span>
          </div>
          
          {/* Save indicator */}
          {isSaving && (
            <div className="mt-4 flex items-center justify-center text-blue-600">
              <LoadingSpinner variant="minimal" size="sm" text="Saving changes..." />
            </div>
          )}
        </div>

        {/* Itinerary */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="space-y-8">
            {itinerary.days.map((day) => (
              <SortableContext
                key={day.id}
                items={day.activities.map(activity => activity.id)}
                strategy={verticalListSortingStrategy}
              >
                <DaySection day={day} />
              </SortableContext>
            ))}
          </div>
          
          <DragOverlay>
            {activeId && draggedItem ? (
              <ActivityCard 
                activity={draggedItem} 
                isDragging={true}
                isOverlay={true}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        {/* Footer */}
        <div className="text-center mt-12 py-8 border-t border-gray-200">
          <p className="text-gray-500 text-sm">
            Drag and drop activities to reorder your itinerary
          </p>
        </div>
      </div>
    </div>
  );
};

export default ItineraryPlanner;