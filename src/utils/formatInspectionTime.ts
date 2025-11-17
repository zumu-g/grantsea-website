import { InspectionTime } from '@/services/api';

export function formatNextInspection(inspectionTimes?: InspectionTime[]): string | null {
  if (!inspectionTimes || inspectionTimes.length === 0) {
    return null;
  }

  // Get the next upcoming inspection
  const now = new Date();
  const upcomingInspections = inspectionTimes
    .filter(inspection => new Date(inspection.startTime) > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  if (upcomingInspections.length === 0) {
    return null;
  }

  const nextInspection = upcomingInspections[0];
  const startDate = new Date(nextInspection.startTime);
  const endDate = new Date(nextInspection.endTime);

  // Format day
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const day = days[startDate.getDay()];

  // Format time
  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes === 0 ? '' : `:${minutes.toString().padStart(2, '0')}`;
    return `${displayHours}${displayMinutes}${ampm}`;
  };

  const startTime = formatTime(startDate);
  const endTime = formatTime(endDate);

  // Check if it's today or tomorrow
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const isToday = startDate.toDateString() === today.toDateString();
  const isTomorrow = startDate.toDateString() === tomorrow.toDateString();

  if (isToday) {
    return `Open today ${startTime}-${endTime}`;
  } else if (isTomorrow) {
    return `Open tomorrow ${startTime}-${endTime}`;
  } else {
    return `Open ${day} ${startTime}-${endTime}`;
  }
}