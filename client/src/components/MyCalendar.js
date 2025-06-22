import React, { useState, useCallback, useContext, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import JurisdictionContext from '../context/jurisdiction/jurisdictionContext';
import AllocatedDayContext from '../context/allocatedDay/allocatedDayContext';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const MyCalendar = () => {
  const jurisdictionContext = useContext(JurisdictionContext);
  const { draggedJurisdiction } = jurisdictionContext;

  const allocatedDayContext = useContext(AllocatedDayContext);
  const { allocatedDays, getAllocatedDays, addAllocatedDay } = allocatedDayContext;

  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllocatedDays();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (allocatedDays) {
      const calendarEvents = allocatedDays.map((day) => ({
        id: day._id,
        title: day.jurisdiction.name,
        start: new Date(day.date),
        end: new Date(day.date),
        allDay: true,
      }));
      setEvents(calendarEvents);
    }
  }, [allocatedDays]);

  const onEventDrop = useCallback(
    ({ event, start, end, allDay }) => {
      // This functionality is not yet implemented in the backend
      // For now, it will only update the local state
      setEvents((prev) => {
        const existing = prev.find((ev) => ev.id === event.id) ?? {};
        const filtered = prev.filter((ev) => ev.id !== event.id);
        return [...filtered, { ...existing, start, end, allDay }];
      });
    },
    [setEvents]
  );

  const onDropFromOutside = useCallback(
    ({ start }) => {
      if (!draggedJurisdiction) return;

      const newAllocatedDay = {
        jurisdiction: draggedJurisdiction._id,
        date: start,
      };
      addAllocatedDay(newAllocatedDay);
    },
    [addAllocatedDay, draggedJurisdiction]
  );

  return (
    <div>
      <DnDCalendar
        localizer={localizer}
        events={events}
        onEventDrop={onEventDrop}
        onDropFromOutside={onDropFromOutside}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        resizable
        selectable
      />
    </div>
  );
};

export default MyCalendar;
