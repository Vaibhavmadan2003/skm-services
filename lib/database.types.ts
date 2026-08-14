// Auto-generated from Supabase schema
// This file contains all database table types

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          password_hash: string;
          full_name: string;
          phone: string | null;
          profile_image_url: string | null;
          role: 'super_admin' | 'branch_admin' | 'staff' | 'technician' | 'customer';
          branch_id: string | null;
          status: 'active' | 'inactive' | 'suspended';
          created_at: string;
          updated_at: string;
          last_login: string | null;
        };
        Insert: {
          id?: string;
          email: string;
          password_hash: string;
          full_name: string;
          phone?: string | null;
          profile_image_url?: string | null;
          role: 'super_admin' | 'branch_admin' | 'staff' | 'technician' | 'customer';
          branch_id?: string | null;
          status?: 'active' | 'inactive' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          password_hash?: string;
          full_name?: string;
          phone?: string | null;
          profile_image_url?: string | null;
          role?: 'super_admin' | 'branch_admin' | 'staff' | 'technician' | 'customer';
          branch_id?: string | null;
          status?: 'active' | 'inactive' | 'suspended';
          created_at?: string;
          updated_at?: string;
          last_login?: string | null;
        };
      };

      branches: {
        Row: {
          id: string;
          name: string;
          logo_url: string | null;
          email: string | null;
          phone: string | null;
          address: string | null;
          city: string | null;
          country: string | null;
          postal_code: string | null;
          manager_id: string | null;
          timezone: string;
          working_hours_start: string;
          working_hours_end: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          country?: string | null;
          postal_code?: string | null;
          manager_id?: string | null;
          timezone?: string;
          working_hours_start?: string;
          working_hours_end?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          logo_url?: string | null;
          email?: string | null;
          phone?: string | null;
          address?: string | null;
          city?: string | null;
          country?: string | null;
          postal_code?: string | null;
          manager_id?: string | null;
          timezone?: string;
          working_hours_start?: string;
          working_hours_end?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      customers: {
        Row: {
          id: string;
          user_id: string;
          phone_verified: boolean;
          email_verified: boolean;
          address: string | null;
          city: string | null;
          country: string | null;
          postal_code: string | null;
          preferred_branch_id: string | null;
          total_bookings: number;
          total_spent: string;
          loyalty_points: number;
          preferred_language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          phone_verified?: boolean;
          email_verified?: boolean;
          address?: string | null;
          city?: string | null;
          country?: string | null;
          postal_code?: string | null;
          preferred_branch_id?: string | null;
          total_bookings?: number;
          total_spent?: string;
          loyalty_points?: number;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          phone_verified?: boolean;
          email_verified?: boolean;
          address?: string | null;
          city?: string | null;
          country?: string | null;
          postal_code?: string | null;
          preferred_branch_id?: string | null;
          total_bookings?: number;
          total_spent?: string;
          loyalty_points?: number;
          preferred_language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      services: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          image_url: string | null;
          category: string | null;
          base_price: string;
          estimated_duration_minutes: number | null;
          is_active: boolean;
          requires_scheduling: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description?: string | null;
          image_url?: string | null;
          category?: string | null;
          base_price: string;
          estimated_duration_minutes?: number | null;
          is_active?: boolean;
          requires_scheduling?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          image_url?: string | null;
          category?: string | null;
          base_price?: string;
          estimated_duration_minutes?: number | null;
          is_active?: boolean;
          requires_scheduling?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };

      bookings: {
        Row: {
          id: string;
          booking_number: string;
          customer_id: string;
          branch_id: string;
          service_id: string;
          assigned_staff_id: string | null;
          scheduled_date: string;
          scheduled_time: string;
          scheduled_datetime: string;
          duration_minutes: number | null;
          service_address: string;
          service_city: string | null;
          service_postal_code: string | null;
          status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
          cancellation_reason: string | null;
          base_price: string | null;
          service_charge: string;
          tax: string;
          total_price: string | null;
          discount: string;
          customer_notes: string | null;
          staff_notes: string | null;
          created_at: string;
          updated_at: string;
          completed_at: string | null;
        };
        Insert: {
          id?: string;
          booking_number: string;
          customer_id: string;
          branch_id: string;
          service_id: string;
          assigned_staff_id?: string | null;
          scheduled_date: string;
          scheduled_time: string;
          scheduled_datetime?: string;
          duration_minutes?: number | null;
          service_address: string;
          service_city?: string | null;
          service_postal_code?: string | null;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
          cancellation_reason?: string | null;
          base_price?: string | null;
          service_charge?: string;
          tax?: string;
          total_price?: string | null;
          discount?: string;
          customer_notes?: string | null;
          staff_notes?: string | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
        Update: {
          id?: string;
          booking_number?: string;
          customer_id?: string;
          branch_id?: string;
          service_id?: string;
          assigned_staff_id?: string | null;
          scheduled_date?: string;
          scheduled_time?: string;
          scheduled_datetime?: string;
          duration_minutes?: number | null;
          service_address?: string;
          service_city?: string | null;
          service_postal_code?: string | null;
          status?: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'postponed';
          cancellation_reason?: string | null;
          base_price?: string | null;
          service_charge?: string;
          tax?: string;
          total_price?: string | null;
          discount?: string;
          customer_notes?: string | null;
          staff_notes?: string | null;
          created_at?: string;
          updated_at?: string;
          completed_at?: string | null;
        };
      };

      payments: {
        Row: {
          id: string;
          booking_id: string;
          customer_id: string;
          amount: string;
          currency: string;
          payment_method: 'card' | 'wallet' | 'bank_transfer' | 'cash' | 'upi';
          status: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial_refund';
          transaction_id: string | null;
          payment_gateway: string | null;
          gateway_response: Json | null;
          created_at: string;
          paid_at: string | null;
        };
        Insert: {
          id?: string;
          booking_id: string;
          customer_id: string;
          amount: string;
          currency?: string;
          payment_method: 'card' | 'wallet' | 'bank_transfer' | 'cash' | 'upi';
          status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial_refund';
          transaction_id?: string | null;
          payment_gateway?: string | null;
          gateway_response?: Json | null;
          created_at?: string;
          paid_at?: string | null;
        };
        Update: {
          id?: string;
          booking_id?: string;
          customer_id?: string;
          amount?: string;
          currency?: string;
          payment_method?: 'card' | 'wallet' | 'bank_transfer' | 'cash' | 'upi';
          status?: 'pending' | 'completed' | 'failed' | 'refunded' | 'partial_refund';
          transaction_id?: string | null;
          payment_gateway?: string | null;
          gateway_response?: Json | null;
          created_at?: string;
          paid_at?: string | null;
        };
      };

      reviews: {
        Row: {
          id: string;
          booking_id: string;
          customer_id: string;
          staff_id: string | null;
          rating: number;
          service_quality_rating: number;
          punctuality_rating: number;
          professionalism_rating: number;
          title: string | null;
          comment: string | null;
          admin_response: string | null;
          admin_response_at: string | null;
          status: 'pending' | 'published' | 'hidden';
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_id: string;
          customer_id: string;
          staff_id?: string | null;
          rating: number;
          service_quality_rating: number;
          punctuality_rating: number;
          professionalism_rating: number;
          title?: string | null;
          comment?: string | null;
          admin_response?: string | null;
          admin_response_at?: string | null;
          status?: 'pending' | 'published' | 'hidden';
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          booking_id?: string;
          customer_id?: string;
          staff_id?: string | null;
          rating?: number;
          service_quality_rating?: number;
          punctuality_rating?: number;
          professionalism_rating?: number;
          title?: string | null;
          comment?: string | null;
          admin_response?: string | null;
          admin_response_at?: string | null;
          status?: 'pending' | 'published' | 'hidden';
          created_at?: string;
          updated_at?: string;
        };
      };

      settings: {
        Row: {
          id: string;
          setting_type: 'global' | 'branch';
          branch_id: string | null;
          business_name: string | null;
          business_email: string | null;
          support_phone: string | null;
          business_address: string | null;
          theme: string;
          primary_color: string;
          font_size: string;
          border_radius: string;
          logo_url: string | null;
          favicon_url: string | null;
          working_hours_start: string | null;
          working_hours_end: string | null;
          booking_buffer_minutes: number;
          auto_assign_booking: boolean;
          default_booking_status: string;
          currency: string;
          tax_percentage: string;
          invoice_prefix: string;
          wallet_enabled: boolean;
          online_payments_enabled: boolean;
          cash_payments_enabled: boolean;
          email_notifications_enabled: boolean;
          sms_notifications_enabled: boolean;
          push_notifications_enabled: boolean;
          booking_alerts_enabled: boolean;
          payment_alerts_enabled: boolean;
          review_alerts_enabled: boolean;
          timezone: string;
          language: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          setting_type: 'global' | 'branch';
          branch_id?: string | null;
          business_name?: string | null;
          business_email?: string | null;
          support_phone?: string | null;
          business_address?: string | null;
          theme?: string;
          primary_color?: string;
          font_size?: string;
          border_radius?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          working_hours_start?: string | null;
          working_hours_end?: string | null;
          booking_buffer_minutes?: number;
          auto_assign_booking?: boolean;
          default_booking_status?: string;
          currency?: string;
          tax_percentage?: string;
          invoice_prefix?: string;
          wallet_enabled?: boolean;
          online_payments_enabled?: boolean;
          cash_payments_enabled?: boolean;
          email_notifications_enabled?: boolean;
          sms_notifications_enabled?: boolean;
          push_notifications_enabled?: boolean;
          booking_alerts_enabled?: boolean;
          payment_alerts_enabled?: boolean;
          review_alerts_enabled?: boolean;
          timezone?: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          setting_type?: 'global' | 'branch';
          branch_id?: string | null;
          business_name?: string | null;
          business_email?: string | null;
          support_phone?: string | null;
          business_address?: string | null;
          theme?: string;
          primary_color?: string;
          font_size?: string;
          border_radius?: string;
          logo_url?: string | null;
          favicon_url?: string | null;
          working_hours_start?: string | null;
          working_hours_end?: string | null;
          booking_buffer_minutes?: number;
          auto_assign_booking?: boolean;
          default_booking_status?: string;
          currency?: string;
          tax_percentage?: string;
          invoice_prefix?: string;
          wallet_enabled?: boolean;
          online_payments_enabled?: boolean;
          cash_payments_enabled?: boolean;
          email_notifications_enabled?: boolean;
          sms_notifications_enabled?: boolean;
          push_notifications_enabled?: boolean;
          booking_alerts_enabled?: boolean;
          payment_alerts_enabled?: boolean;
          review_alerts_enabled?: boolean;
          timezone?: string;
          language?: string;
          created_at?: string;
          updated_at?: string;
        };
      };

      staff: {
        Row: {
          id: string;
          user_id: string;
          branch_id: string;
          specializations: string[];
          hourly_rate: string | null;
          availability_status: 'available' | 'busy' | 'on_leave' | 'offline';
          rating: string;
          total_jobs_completed: number;
          bio: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          branch_id: string;
          specializations?: string[];
          hourly_rate?: string | null;
          availability_status?: 'available' | 'busy' | 'on_leave' | 'offline';
          rating?: string;
          total_jobs_completed?: number;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          branch_id?: string;
          specializations?: string[];
          hourly_rate?: string | null;
          availability_status?: 'available' | 'busy' | 'on_leave' | 'offline';
          rating?: string;
          total_jobs_completed?: number;
          bio?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };

      notifications: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          message: string | null;
          type: 'booking' | 'payment' | 'review' | 'system' | 'promotion';
          related_booking_id: string | null;
          related_payment_id: string | null;
          is_read: boolean;
          read_at: string | null;
          sent_via: 'email' | 'sms' | 'push' | 'in_app';
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          message?: string | null;
          type: 'booking' | 'payment' | 'review' | 'system' | 'promotion';
          related_booking_id?: string | null;
          related_payment_id?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          sent_via: 'email' | 'sms' | 'push' | 'in_app';
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          message?: string | null;
          type?: 'booking' | 'payment' | 'review' | 'system' | 'promotion';
          related_booking_id?: string | null;
          related_payment_id?: string | null;
          is_read?: boolean;
          read_at?: string | null;
          sent_via?: 'email' | 'sms' | 'push' | 'in_app';
          created_at?: string;
        };
      };

      audit_logs: {
        Row: {
          id: string;
          user_id: string | null;
          action: string;
          table_name: string | null;
          record_id: string | null;
          old_values: Json | null;
          new_values: Json | null;
          ip_address: string | null;
          user_agent: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          action: string;
          table_name?: string | null;
          record_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          action?: string;
          table_name?: string | null;
          record_id?: string | null;
          old_values?: Json | null;
          new_values?: Json | null;
          ip_address?: string | null;
          user_agent?: string | null;
          created_at?: string;
        };
      };
    };
    Views: {
      vw_booking_stats: {
        Row: {
          branch_id: string | null;
          branch_name: string | null;
          total_bookings: number | null;
          completed_bookings: number | null;
          cancelled_bookings: number | null;
          total_revenue: string | null;
          avg_rating: number | null;
        };
      };
      vw_staff_performance: {
        Row: {
          id: string | null;
          full_name: string | null;
          branch_id: string | null;
          branch_name: string | null;
          total_jobs_completed: number | null;
          rating: string | null;
          completed_jobs_this_month: number | null;
          avg_rating_this_month: number | null;
        };
      };
    };
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
}
