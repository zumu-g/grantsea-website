// Utility functions for formatting auction dates and times
// Based on formatInspectionTime.ts but adapted for auction functionality

export function formatAuctionDateTime(auctionDate: string, auctionTime?: string): string {
  try {
    const dateTimeString = auctionTime ? `${auctionDate} ${auctionTime}` : auctionDate;
    const date = new Date(dateTimeString);
    
    if (isNaN(date.getTime())) {
      return 'Date TBA';
    }
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    const timeStr = date.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
    
    if (isToday) return `Today ${timeStr}`;
    if (isTomorrow) return `Tomorrow ${timeStr}`;
    
    return date.toLocaleDateString('en-AU', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Error formatting auction date time:', error);
    return 'Date TBA';
  }
}

export function formatAuctionDateOnly(auctionDate: string): string {
  try {
    const date = new Date(auctionDate);
    
    if (isNaN(date.getTime())) {
      return 'Date TBA';
    }
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const isToday = date.toDateString() === today.toDateString();
    const isTomorrow = date.toDateString() === tomorrow.toDateString();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    
    return date.toLocaleDateString('en-AU', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long', 
      day: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting auction date:', error);
    return 'Date TBA';
  }
}

export function formatAuctionTimeOnly(auctionTime: string): string {
  try {
    // Handle time string like "10:00 AM" or "14:30"
    let date: Date;
    
    if (auctionTime.includes('AM') || auctionTime.includes('PM')) {
      // 12-hour format
      date = new Date(`1970-01-01 ${auctionTime}`);
    } else {
      // 24-hour format, convert to 12-hour
      date = new Date(`1970-01-01 ${auctionTime}:00`);
    }
    
    if (isNaN(date.getTime())) {
      return auctionTime; // Return original if can't parse
    }
    
    return date.toLocaleTimeString('en-AU', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  } catch (error) {
    console.error('Error formatting auction time:', error);
    return auctionTime || 'Time TBA';
  }
}

export function getAuctionTimeCategory(auctionDate: string): string {
  try {
    const date = new Date(auctionDate);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return 'today';
    if (date.toDateString() === tomorrow.toDateString()) return 'tomorrow';
    
    return date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  } catch (error) {
    return 'upcoming';
  }
}

export function getTimeUntilAuction(auctionDate: string, auctionTime?: string): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalMilliseconds: number;
  isToday: boolean;
  isTomorrow: boolean;
  isThisWeek: boolean;
} {
  try {
    const dateTimeString = auctionTime ? `${auctionDate} ${auctionTime}` : auctionDate;
    const auctionDateTime = new Date(dateTimeString);
    const now = new Date();
    
    const diff = auctionDateTime.getTime() - now.getTime();
    
    if (diff <= 0) {
      return { 
        days: 0, 
        hours: 0, 
        minutes: 0, 
        seconds: 0, 
        totalMilliseconds: 0,
        isToday: false,
        isTomorrow: false,
        isThisWeek: false
      };
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    const isToday = auctionDateTime.toDateString() === today.toDateString();
    const isTomorrow = auctionDateTime.toDateString() === tomorrow.toDateString();
    const isThisWeek = auctionDateTime >= today && auctionDateTime <= oneWeekFromNow;
    
    return { 
      days, 
      hours, 
      minutes, 
      seconds, 
      totalMilliseconds: diff,
      isToday,
      isTomorrow,
      isThisWeek
    };
  } catch (error) {
    console.error('Error calculating time until auction:', error);
    return { 
      days: 0, 
      hours: 0, 
      minutes: 0, 
      seconds: 0, 
      totalMilliseconds: 0,
      isToday: false,
      isTomorrow: false,
      isThisWeek: false
    };
  }
}

export function formatCountdown(timeUntil: ReturnType<typeof getTimeUntilAuction>): string {
  const { days, hours, minutes, seconds, isToday, isTomorrow } = timeUntil;
  
  if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
    return 'Auction has started';
  }
  
  if (isToday) {
    if (hours === 0) {
      return `${minutes}m ${seconds}s`;
    }
    return `${hours}h ${minutes}m`;
  }
  
  if (isTomorrow) {
    return 'Tomorrow';
  }
  
  if (days === 1) {
    return '1 day';
  }
  
  if (days > 1) {
    return `${days} days`;
  }
  
  return `${hours}h ${minutes}m`;
}

export function getAuctionStatus(auctionDate: string, auctionTime?: string): 'upcoming' | 'today' | 'live' | 'ended' {
  try {
    const dateTimeString = auctionTime ? `${auctionDate} ${auctionTime}` : auctionDate;
    const auctionDateTime = new Date(dateTimeString);
    const now = new Date();
    
    const hourBefore = new Date(auctionDateTime.getTime() - 60 * 60 * 1000);
    const hourAfter = new Date(auctionDateTime.getTime() + 60 * 60 * 1000);
    
    if (now < hourBefore) {
      const today = new Date();
      if (auctionDateTime.toDateString() === today.toDateString()) {
        return 'today';
      }
      return 'upcoming';
    }
    
    if (now >= hourBefore && now <= hourAfter) {
      return 'live';
    }
    
    return 'ended';
  } catch (error) {
    return 'upcoming';
  }
}