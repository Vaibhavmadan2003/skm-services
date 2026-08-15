'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, Settings, ChevronRight } from 'lucide-react';
import BookingAssignmentNotification from './BookingAssignmentNotification';
import WorkAssignmentNotification from './WorkAssignmentNotification';

interface Notification {
  id: string;
  type: string;
  message: string;
  title?: string;
  is_read: boolean;
  created_at: string;
  booking_number?: string;
  metadata?: any;
  [key: string]: any;
}

interface BranchNotificationCenterProps {
  branchId: string;
}

export default function BranchNotificationCenter({ branchId }: BranchNotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!branchId) {
      return;
    }
    
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, [branchId]);

  const loadNotifications = async () => {
    try {
      if (!branchId) {
        console.warn('🔔 Cannot load notifications: branchId is not set');
        return;
      }

      // Validate branchId is a non-empty string
      if (typeof branchId !== 'string' || branchId.trim().length === 0) {
        console.error('🔔 Invalid branchId format:', branchId);
        return;
      }

      const url = `/api/branch/notifications/list?branch_id=${encodeURIComponent(branchId)}&unreadOnly=false&limit=100`;
      console.log('🔔 Fetching notifications from:', url);
      
      const response = await fetch(url);
      console.log('🔔 API Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('🔔 Failed to load notifications:', {
          status: response.status,
          error: errorData.error,
        });
        return;
      }

      const data = await response.json();
      console.log('🔔 API Response data:', data);
      
      if (!data.success || !Array.isArray(data.data)) {
        console.error('🔔 Invalid API response format:', data);
        return;
      }

      const allNotifications = (data.data || []).map((n: any) => ({
        ...n,
        metadata: typeof n.metadata === 'string' ? JSON.parse(n.metadata) : n.metadata,
      }));

      console.log('🔔 Parsed notifications:', allNotifications);
      setNotifications(allNotifications);
      const unread = allNotifications.filter((n: Notification) => !n.is_read).length;
      setUnreadCount(unread);
      console.log('🔔 Unread count:', unread, 'Total:', allNotifications.length);
    } catch (err) {
      console.error('🔔 Error loading branch notifications:', {
        error: (err as any)?.message,
        branchId,
      });
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      const response = await fetch(`/api/branch/notifications/${notificationId}/mark-read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const error = await response.json().catch(() => ({}));
        console.error('Failed to mark notification as read:', error);
        return;
      }

      setNotifications(
        notifications.map(n =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err) {
      console.error('Error marking notification as read:', (err as any)?.message);
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'relative',
          padding: '10px 12px',
          background: isOpen ? '#f3f4f6' : 'transparent',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onMouseEnter={(e) => {
          if (!isOpen) e.currentTarget.style.background = '#f3f4f6';
        }}
        onMouseLeave={(e) => {
          if (!isOpen) e.currentTarget.style.background = 'transparent';
        }}
        title="Branch Notifications"
      >
        <Bell size={20} style={{ color: '#6b7280' }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#f59e0b',
              color: 'white',
              fontSize: '11px',
              fontWeight: '700',
              borderRadius: '9999px',
              width: '20px',
              height: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid white',
            }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: 'absolute',
            right: '0',
            marginTop: '8px',
            width: '480px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 20px 25px rgba(0, 0, 0, 0.15)',
            zIndex: 50,
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column',
            maxHeight: '700px',
          }}
        >
          <div style={{ padding: '20px', borderBottom: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0 }}>
              Branch Notifications
            </h3>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: '6px 0 0 0' }}>
              {unreadCount === 0 ? 'All caught up' : `${unreadCount} unread`}
            </p>
          </div>

          <div style={{ flex: 1, overflowY: 'auto' }}>
            {notifications.length === 0 ? (
              <div
                style={{
                  padding: '40px 24px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <CheckCircle2 size={32} style={{ color: '#d1d5db' }} />
                <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
                  No notifications
                </p>
              </div>
            ) : (
              <>
                {/* Booking Assignments */}
                {notifications.filter(n => n.type === 'booking_assignment').length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        📌 Booking Assignments
                      </p>
                    </div>
                    {notifications.filter(n => n.type === 'booking_assignment').map((notif) => (
                      <BookingAssignmentNotification
                        key={notif.id}
                        notif={notif}
                        onAction={loadNotifications}
                        onMarkAsRead={handleMarkAsRead}
                        onRemove={() => {
                          setNotifications(notifications.filter(n => n.id !== notif.id));
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Booking Cancellations */}
                {notifications.filter(n => n.type === 'booking_cancelled').length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        ❌ Booking Cancellations
                      </p>
                    </div>
                    {notifications.filter(n => n.type === 'booking_cancelled').map((notif) => (
                      <div
                        key={notif.id}
                        style={{
                          padding: '14px 20px',
                          borderBottom: '1px solid #f3f4f6',
                          background: notif.is_read ? 'transparent' : '#fee2e2',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = notif.is_read ? '#f9fafb' : '#fecaca';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = notif.is_read ? 'transparent' : '#fee2e2';
                        }}
                      >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: '13px',
                              color: '#111827',
                              margin: 0,
                              marginBottom: '4px',
                              fontWeight: notif.is_read ? 'normal' : '600'
                            }}>
                              {notif.title || 'Booking Cancelled'}
                            </p>
                            <p style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              margin: 0,
                              marginBottom: '6px',
                              lineHeight: '1.4'
                            }}>
                              {notif.booking_number && `Booking: ${notif.booking_number}`}
                            </p>
                            <p style={{
                              fontSize: '12px',
                              color: '#6b7280',
                              margin: 0,
                              marginBottom: '6px',
                              lineHeight: '1.4'
                            }}>
                              {notif.message}
                            </p>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                              {new Date(notif.created_at).toLocaleString()}
                            </p>
                          </div>
                          {!notif.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(notif.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                color: '#dc2626',
                                fontSize: '11px',
                                fontWeight: '600',
                                flexShrink: 0,
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#b91c1c'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#dc2626'}
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {/* Work Assignments */}
                {notifications.filter(n => n.type === 'work_assignment').length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        Work Assignments
                      </p>
                    </div>
                    {notifications.filter(n => n.type === 'work_assignment').map((notif) => (
                      <WorkAssignmentNotification
                        key={notif.id}
                        notif={notif}
                        onAction={loadNotifications}
                        onMarkAsRead={handleMarkAsRead}
                        onRemove={() => {
                          setNotifications(notifications.filter(n => n.id !== notif.id));
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Branch Status Updates */}
                {notifications.filter(n => ['suspended', 'deleted'].includes(n.type)).length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        Branch Status
                      </p>
                    </div>
                    {notifications.filter(n => ['suspended', 'deleted'].includes(n.type)).map((notif) => (
                      <div
                        key={notif.id}
                        style={{
                          padding: '14px 20px',
                          borderBottom: '1px solid #f3f4f6',
                          background: notif.is_read ? 'transparent' : '#fef3c7',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = notif.is_read ? '#f9fafb' : '#fde68a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = notif.is_read ? 'transparent' : '#fef3c7';
                        }}
                      >
                        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <Settings size={16} style={{ color: '#f59e0b', marginTop: '2px', flexShrink: 0 }} />
                          <div style={{ flex: 1 }}>
                            <p style={{
                              fontSize: '13px',
                              color: '#111827',
                              margin: 0,
                              marginBottom: '6px',
                              fontWeight: notif.is_read ? 'normal' : '600'
                            }}>
                              {notif.message}
                            </p>
                            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
                              {new Date(notif.created_at).toLocaleString()}
                            </p>
                          </div>
                          {!notif.is_read && (
                            <button
                              onClick={() => handleMarkAsRead(notif.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '4px 8px',
                                color: '#0052cc',
                                fontSize: '11px',
                                fontWeight: '600',
                                flexShrink: 0,
                              }}
                              onMouseEnter={(e) => e.currentTarget.style.color = '#0047b2'}
                              onMouseLeave={(e) => e.currentTarget.style.color = '#0052cc'}
                            >
                              Mark as read
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div
          style={{
            position: 'fixed',
            inset: '0',
            zIndex: 40,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
