'use client';

import { useState, useEffect } from 'react';
import { Bell, CheckCircle2, ChevronRight } from 'lucide-react';

interface Notification {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
  [key: string]: any;
}

interface NotificationCenterProps {
  onApplicationsChange?: () => void;
}

export default function NotificationCenter({ onApplicationsChange }: NotificationCenterProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadNotifications = async () => {
    try {
      console.log('[NotificationCenter] Fetching notifications...');
      const response = await fetch('/api/admin/notifications/list?unreadOnly=false&limit=100');
      if (response.ok) {
        const data = await response.json();
        console.log('[NotificationCenter] ✅ Notifications loaded:', {
          total: data.data?.length || 0,
          data: data.data,
        });
        
        // Log by type
        if (data.data?.length > 0) {
          const byType = data.data.reduce((acc: any, n: any) => {
            if (!acc[n.type]) acc[n.type] = 0;
            acc[n.type]++;
            return acc;
          }, {});
          console.log('[NotificationCenter] Notifications by type:', byType);
        }
        
        const allNotifications = (data.data || []).map((n: any) => ({
          ...n,
          metadata: typeof n.metadata === 'string' ? JSON.parse(n.metadata) : n.metadata,
        }));
        
        setNotifications(allNotifications);
        const unread = allNotifications.filter((n: Notification) => !n.is_read).length;
        setUnreadCount(unread);
        console.log('[NotificationCenter] State updated - unreadCount:', unread);
      } else {
        console.error('[NotificationCenter] ❌ Failed to load notifications:', response.status, response.statusText);
      }
    } catch (err) {
      console.error('[NotificationCenter] ❌ Error loading notifications:', err);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      console.log('[NotificationCenter] Marking as read:', notificationId);
      const response = await fetch(`/api/admin/notifications/${notificationId}/mark-read`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        console.error('[NotificationCenter] ❌ Failed to mark as read:', response.status);
        throw new Error('Failed to mark as read');
      }

      console.log('[NotificationCenter] ✅ Marked as read:', notificationId);
      setNotifications(
        notifications.map(n =>
          n.id === notificationId ? { ...n, is_read: true } : n
        )
      );
      setUnreadCount(Math.max(0, unreadCount - 1));
    } catch (err) {
      console.error('[NotificationCenter] ❌ Error marking notification as read:', err);
    }
  };

  const handleRemoveNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
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
        title="Admin Notifications"
      >
        <Bell size={20} style={{ color: '#6b7280' }} />
        {unreadCount > 0 && (
          <span
            style={{
              position: 'absolute',
              top: '-4px',
              right: '-4px',
              background: '#ef4444',
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
              Admin Notifications
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
                {/* Partner Applications - Only Pending */}
                {notifications.filter(n => 
                  n.type === 'setting_change' && 
                  n.message?.includes('partner application')
                ).length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        Partner Applications
                      </p>
                    </div>
                    {notifications.filter(n => 
                      n.type === 'setting_change' && 
                      n.message?.includes('partner application')
                    ).map((notif) => (
                      <ApplicationNotification 
                        key={notif.id} 
                        notif={notif} 
                        onAction={loadNotifications} 
                        onMarkAsRead={handleMarkAsRead}
                        onRemove={handleRemoveNotification}
                      />
                    ))}
                  </>
                )}

                {/* System Notifications - Exclude Partner Applications */}
                {notifications.filter(n => n.type === 'setting_change' && !n.message?.includes('partner application')).length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        System Updates
                      </p>
                    </div>
                    {notifications.filter(n => n.type === 'setting_change' && !n.message?.includes('partner application')).map((notif) => (
                      <div
                        key={notif.id}
                        style={{
                          padding: '14px 20px',
                          borderBottom: '1px solid #f3f4f6',
                          background: notif.is_read ? 'transparent' : '#eff6ff',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = notif.is_read ? '#f9fafb' : '#dbeafe';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = notif.is_read ? 'transparent' : '#eff6ff';
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

                {/* Booking Cancellations */}
                {notifications.filter(n => n.type === 'booking_cancelled').length > 0 && (
                  <>
                    <div style={{ padding: '12px 20px', background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                      <p style={{ fontSize: '11px', fontWeight: '700', color: '#6b7280', margin: 0, textTransform: 'uppercase' }}>
                        Booking Cancellations
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
              </>
            )}
          </div>

          {notifications.length > 0 && (
            <div style={{ padding: '14px 20px', borderTop: '1px solid #e5e7eb', background: '#f9fafb', textAlign: 'center' }}>
              <a
                href="/admin/branches"
                onClick={() => setIsOpen(false)}
                style={{
                  fontSize: '12px',
                  color: '#0052cc',
                  textDecoration: 'none',
                  fontWeight: '600',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = '#0047b2'}
                onMouseLeave={(e) => e.currentTarget.style.color = '#0052cc'}
              >
                View All Branches →
              </a>
            </div>
          )}
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

interface ApplicationNotificationProps {
  notif: Notification;
  onAction: () => void;
  onMarkAsRead: (id: string) => void;
  onRemove?: (id: string) => void;
}

function ApplicationNotification({ notif, onAction, onMarkAsRead, onRemove }: ApplicationNotificationProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showCredentialsModal, setShowCredentialsModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [credentials, setCredentials] = useState<{ email: string; password: string } | null>(null);
  const [isRemoved, setIsRemoved] = useState(false);

  // Extract application ID from message or notification
  const appId = notif.application_id;
  const email = notif.message?.match(/Email: ([^\s]+)/)?.[1] || '';
  const businessName = notif.message?.match(/from ([^(]+)/)?.[1]?.trim() || '';

  // Don't render if notification is already removed
  if (isRemoved) {
    return null;
  }

  const removeNotification = () => {
    setIsRemoved(true);
    onRemove?.(notif.id);
  };

  const handleApprove = async () => {
    if (!appId) {
      alert('Application ID not found');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`/api/partner-applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      if (!response.ok) throw new Error('Failed to approve');
      const result = await response.json();

      console.log('Approve response:', result);

      setCredentials({
        email: result.temporary_credentials?.email || email,
        password: result.temporary_credentials?.password || '',
      });
      setShowCredentialsModal(true);
    } catch (err) {
      console.error('Approve error:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Failed to approve'}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCredentialsModalClose = async () => {
    setShowCredentialsModal(false);
    
    // Delete notification from database
    const deleteResponse = await fetch(`/api/admin/notifications/${notif.id}`, {
      method: 'DELETE',
    });
    
    const deleteData = await deleteResponse.json();
    console.log('Delete notification response:', deleteResponse.status, deleteData);
    
    if (deleteResponse.ok) {
      removeNotification();
    } else {
      console.error('Failed to delete notification:', deleteData);
    }
  };

  const handleRejectSubmit = async () => {
    if (!rejectionReason.trim()) {
      alert('Please enter rejection reason');
      return;
    }

    if (!appId) {
      alert('Application ID not found');
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch(`/api/partner-applications/${appId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', rejection_reason: rejectionReason }),
      });

      if (!response.ok) throw new Error('Failed to reject');

      alert('✅ Application rejected');
      setShowRejectModal(false);
      
      // Mark for removal immediately
      removeNotification();
      
      // Delete notification from database
      const deleteResponse = await fetch(`/api/admin/notifications/${notif.id}`, {
        method: 'DELETE',
      });
      
      const deleteData = await deleteResponse.json();
      console.log('Delete notification response:', deleteResponse.status, deleteData);
      
      if (!deleteResponse.ok) {
        console.error('Failed to delete notification:', deleteData);
      }
    } catch (err) {
      console.error('Reject error:', err);
      alert(`Error: ${err instanceof Error ? err.message : 'Failed to reject'}`);
      setIsRemoved(false); // Restore if error
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div
        style={{
          padding: '14px 20px',
          borderBottom: '1px solid #f3f4f6',
          background: notif.is_read ? 'transparent' : '#fef3c7',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = notif.is_read ? '#f9fafb' : '#fcd34d';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = notif.is_read ? 'transparent' : '#fef3c7';
        }}
      >
        <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', marginBottom: '12px' }}>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: '13px',
                color: '#111827',
                margin: 0,
                marginBottom: '4px',
                fontWeight: notif.is_read ? 'normal' : '600',
              }}
            >
              📋 {businessName || 'New Application'}
            </p>
            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, marginBottom: '4px' }}>
              {email}
            </p>
            <p style={{ fontSize: '11px', color: '#9ca3af', margin: 0 }}>
              {new Date(notif.created_at).toLocaleString()}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleApprove}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
            }}
          >
            {isProcessing ? '...' : '✓ Approve'}
          </button>
          <button
            onClick={() => setShowRejectModal(true)}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: '8px 12px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '600',
              cursor: isProcessing ? 'not-allowed' : 'pointer',
              opacity: isProcessing ? 0.7 : 1,
            }}
          >
            ✗ Reject
          </button>
        </div>
      </div>

      {/* Credentials Modal */}
      {showCredentialsModal && credentials && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '32px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 20px 25px rgba(0,0,0,0.15)',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: '24px' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>✅</div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '6px' }}>
                Application Approved!
              </h2>
              <p style={{ fontSize: '13px', color: '#6b7280', margin: 0 }}>
                {businessName}
              </p>
            </div>

            <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #d1fae5' }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#059669', margin: '0 0 8px 0', textTransform: 'uppercase' }}>
                📧 Login Credentials
              </p>
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Email</p>
                <div style={{
                  background: 'white',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#111827',
                  fontFamily: 'monospace',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {credentials.email}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(credentials.email);
                      alert('Copied!');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0052cc',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
              <div>
                <p style={{ fontSize: '11px', color: '#6b7280', margin: '0 0 4px 0' }}>Password</p>
                <div style={{
                  background: 'white',
                  padding: '10px 12px',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  color: '#111827',
                  fontFamily: 'monospace',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  {credentials.password}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(credentials.password);
                      alert('Copied!');
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#0052cc',
                      cursor: 'pointer',
                      fontSize: '11px',
                      fontWeight: '600',
                    }}
                  >
                    Copy
                  </button>
                </div>
              </div>
            </div>

            <div style={{ background: '#fef3c7', padding: '12px', borderRadius: '8px', marginBottom: '24px', border: '1px solid #fcd34d' }}>
              <p style={{ fontSize: '12px', color: '#92400e', margin: 0 }}>
                ⚠️ Partner must change password on first login
              </p>
            </div>

            <button
              onClick={handleCredentialsModalClose}
              style={{
                width: '100%',
                padding: '12px',
                background: '#0052cc',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#0047b2'}
              onMouseLeave={(e) => e.currentTarget.style.background = '#0052cc'}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {showRejectModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
          onClick={() => !isProcessing && setShowRejectModal(false)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              maxWidth: '400px',
              width: '90%',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#111827', margin: 0, marginBottom: '12px' }}>
              Reject Application
            </h2>
            <p style={{ fontSize: '13px', color: '#6b7280', margin: 0, marginBottom: '12px' }}>
              Reason for rejection:
            </p>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Enter reason..."
              disabled={isProcessing}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '12px',
                fontFamily: 'inherit',
                resize: 'vertical',
                minHeight: '80px',
                marginBottom: '12px',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setShowRejectModal(false)}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#f3f4f6',
                  color: '#111827',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={isProcessing}
                style={{
                  flex: 1,
                  padding: '10px',
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600',
                  cursor: isProcessing ? 'not-allowed' : 'pointer',
                  opacity: isProcessing ? 0.7 : 1,
                }}
              >
                {isProcessing ? 'Processing...' : 'Confirm Reject'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
