// Tracking utility for Google Sheets via Apps Script
// Replace SCRIPT_URL with your actual Google Apps Script web app URL

const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

interface TrackingEvent {
  event_type: 'page_view' | 'page_leave' | 'click';
  event_name: string;
  page: string;
  timestamp: string;
  session_id: string;
  meta?: Record<string, unknown>;
}

// Generate a simple session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('tracking_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('tracking_session_id', sessionId);
  }
  return sessionId;
};

// Send event to Google Sheets
const sendToGoogleSheets = async (event: TrackingEvent): Promise<void> => {
  if (SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
    // Log to console for development
    console.log('[Tracking]', event);
    return;
  }

  try {
    await fetch(SCRIPT_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
  } catch (error) {
    console.error('[Tracking Error]', error);
  }
};

// Track page view
export const trackPageView = (pageName: string): void => {
  const event: TrackingEvent = {
    event_type: 'page_view',
    event_name: `view_${pageName}`,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
  };
  sendToGoogleSheets(event);
};

// Track page leave
export const trackPageLeave = (pageName: string): void => {
  const event: TrackingEvent = {
    event_type: 'page_leave',
    event_name: `leave_${pageName}`,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
  };
  sendToGoogleSheets(event);
};

// Track click events
export const trackClick = (
  elementName: string,
  meta?: Record<string, unknown>
): void => {
  const event: TrackingEvent = {
    event_type: 'click',
    event_name: elementName,
    page: window.location.pathname,
    timestamp: new Date().toISOString(),
    session_id: getSessionId(),
    meta,
  };
  sendToGoogleSheets(event);
};

// Hook for tracking page lifecycle
export const usePageTracking = (pageName: string): (() => void) => {
  // Track page view
  trackPageView(pageName);
  
  // Return cleanup function for page leave
  return () => {
    trackPageLeave(pageName);
  };
};
