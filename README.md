# Y2Z Travel Itinerary Planner

The **Y2Z Travel Itinerary Planner** is a responsive React application that helps users visualize and organize their travel plans with an intuitive drag-and-drop interface.

---

##  Overview

This app allows travelers to organize daily activities like sightseeing, dining, and more using drag-and-drop cards. Each day’s itinerary is shown with detailed activity cards that can be reordered smoothly.

---

##  Features

-  **Daily Itinerary Organization** – View and manage travel plans by day  
-  **Activity Cards** – Show time, location, cost, and duration  
-  **Drag-and-Drop Reordering** – Smooth reordering of activities using @dnd-kit  
-  **Fully Responsive Design** – Works on all screen sizes  
-  **Loading States** – Skeleton screens while loading  
-  **Error Handling** – User-friendly error messages with retry options  
-  **Visual Feedback** – Visual indicators and overlays during drag  
-  **Activity Types** – Color-coded for sightseeing, dining, transport, and more  

---

## 🔗 [Live Demo](#)  
*()*

---

##  Technologies Used

| Tool               | Purpose                                 |
|--------------------|-----------------------------------------|
| React 19           | Frontend Framework                      |
| Tailwind CSS       | Styling                                 |
| @dnd-kit           | Drag-and-drop functionality             |
| Lucide React       | Icons                                   |
| Vite               | Build Tool                              |
| Vercel             | Deployment                              |

---

##  Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/y2z-travel-itinerary-planner.git

# Navigate into the project directory
cd y2z-travel-itinerary-planner

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── ActivityCard.jsx        # Draggable activity component
│   ├── DaySection.jsx          # Daily itinerary section
│   ├── ItineraryPlanner.jsx    # Main app logic
│   └── LoadingSpinner.jsx      # Loader and skeletons
├── data/
│   └── mockData.js             # Sample itinerary data
├── App.jsx                     # Root app component
└── main.jsx                    # App entry point
```

---

## 🔄 Key Implementation Details

### Drag-and-Drop (`@dnd-kit`)

```jsx
<DndContext
  sensors={sensors}
  collisionDetection={closestCenter}
  onDragStart={handleDragStart}
  onDragEnd={handleDragEnd}
>
  <SortableContext
    items={day.activities.map(activity => activity.id)}
    strategy={verticalListSortingStrategy}
  >
    <DaySection day={day} />
  </SortableContext>

  <DragOverlay>
    {activeId && draggedItem && (
      <ActivityCard
        activity={draggedItem}
        isDragging={true}
        isOverlay={true}
      />
    )}
  </DragOverlay>
</DndContext>
```

### Activity Card (`useSortable`)

```jsx
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
```

---

## 📱 Responsive Design

```jsx
<div className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-200 cursor-grab active:cursor-grabbing">
  <div className="flex">
    <div className="relative w-24 h-24 flex-shrink-0">
      {/* Image */}
    </div>
    <div className="flex-grow p-4">
      {/* Content */}
    </div>
  </div>
</div>
```

---

## 🧩 Challenges & Solutions

| Challenge | Solution |
|----------|----------|
| **Smooth Drag Transitions** | Used CSS transitions + `@dnd-kit`'s transform utilities |
| **Mobile Responsiveness** | Added touch sensors with custom activation constraints |
| **Visual Feedback** | Used drag overlays and reduced opacity |
| **Loading States** | Created custom skeleton loaders |

---

## 🔮 Future Improvements

- Cross-day activity movement  
- Activity editing  
- Backend API integration for saving itineraries  
- User authentication  
- Trip sharing feature  
- Map integration for activity locations  

---


> Made with ❤️ using React and Tailwind CSS
