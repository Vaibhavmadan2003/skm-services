'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  Button,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Alert,
  Grid,
  Typography,
  Paper,
  Stack,
  InputAdornment,
  FormHelperText,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import AdminLayout from '../components/AdminLayout';
import { supabase } from '@/lib/supabase';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

interface FormData {
  name: string;
  email: string;
  phone: string;
  category: string;
  description: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  category?: string;
  description?: string;
}

const COMPANY_INFO = {
  email: 'support@homeserviceqatar.com',
  phone: '+974 4413 2000',
  address: 'Doha, Qatar',
};

const CATEGORIES = [
  { label: 'Booking Issue', value: 'booking' },
  { label: 'Payment Issue', value: 'payment' },
  { label: 'Technical Issue', value: 'technical' },
  { label: 'Other', value: 'other' },
];

export default function HelpSupportPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    category: 'booking',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [ticketNumber, setTicketNumber] = useState('');
  const [userLoading, setUserLoading] = useState(true);

  /**
   * Load initial user data
   */
  useEffect(() => {
    const loadUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          setFormData((prev) => ({
            ...prev,
            name: user.user_metadata?.full_name || user.email?.split('@')[0] || '',
            email: user.email || '',
            phone: user.user_metadata?.phone || '',
          }));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setUserLoading(false);
      }
    };

    loadUserData();
  }, []);

  /**
   * Validate form
   */
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters';

    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';

    if (!formData.phone.trim()) newErrors.phone = 'Phone is required';
    else if (formData.phone.replace(/\D/g, '').length < 7) newErrors.phone = 'Phone must have at least 7 digits';

    if (!formData.category) newErrors.category = 'Category is required';

    if (!formData.description.trim()) newErrors.description = 'Description is required';
    else if (formData.description.trim().length < 20) newErrors.description = 'Description must be at least 20 characters';
    else if (formData.description.trim().length > 1000) newErrors.description = 'Description must not exceed 1000 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handle field change
   */
  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  /**
   * Handle submit
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setSuccessMessage('');

      // Get session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.access_token) {
        throw new Error('Not authenticated');
      }

      // Call API
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({
          source: 'branch_admin',
          user_name: formData.name,
          user_email: formData.email,
          user_phone: formData.phone,
          issue_category: formData.category,
          issue_description: formData.description,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create ticket');
      }

      const result = await response.json();
      setTicketNumber(result.ticket_number);
      setSuccessMessage(`Your support ticket ${result.ticket_number} has been submitted successfully. We will contact you soon.`);

      // Reset form
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: 'booking',
          description: '',
        });
        setTicketNumber('');
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error('Submit error:', error);
      setErrors({ description: error instanceof Error ? error.message : 'Failed to submit ticket' });
    } finally {
      setIsLoading(false);
    }
  };

  if (userLoading) {
    return (
      <AdminLayout>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
          <CircularProgress />
        </Box>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <Box sx={{ maxWidth: 900, mx: 'auto', py: 4 }}>
        <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold' }}>
          Help & Support
        </Typography>
        <Typography variant="body1" color="textSecondary" sx={{ mb: 3 }}>
          Submit support tickets for any issues or operational concerns
        </Typography>

        <Stack spacing={3}>
          {/* Company Info Section */}
          <Card sx={{ p: 3, backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
              Contact Information
            </Typography>

            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <EmailIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{COMPANY_INFO.email}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <PhoneIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{COMPANY_INFO.phone}</Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <LocationOnIcon color="primary" />
                <Box>
                  <Typography variant="caption" color="textSecondary">
                    Address
                  </Typography>
                  <Typography variant="body1">{COMPANY_INFO.address}</Typography>
                </Box>
              </Box>
            </Stack>
          </Card>

          {/* Support Form Section */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold' }}>
              Submit a Support Ticket
            </Typography>

            {successMessage && (
              <Alert severity="success" sx={{ mb: 2 }}>
                {successMessage}
              </Alert>
            )}

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {/* Name */}
              <TextField
                label="Name"
                value={formData.name}
                onChange={(e) => handleFieldChange('name', e.target.value)}
                error={!!errors.name}
                helperText={errors.name}
                disabled={isLoading}
                fullWidth
                size="small"
              />

              {/* Email */}
              <TextField
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => handleFieldChange('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
                disabled={isLoading}
                fullWidth
                size="small"
              />

              {/* Phone */}
              <TextField
                label="Phone"
                value={formData.phone}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={isLoading}
                fullWidth
                size="small"
              />

              {/* Category */}
              <Select
                value={formData.category}
                onChange={(e) => handleFieldChange('category', e.target.value)}
                disabled={isLoading}
                size="small"
              >
                {CATEGORIES.map((cat) => (
                  <MenuItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && <FormHelperText error>{errors.category}</FormHelperText>}

              {/* Description */}
              <TextField
                label="Issue Description"
                value={formData.description}
                onChange={(e) => {
                  if (e.target.value.length <= 1000) {
                    handleFieldChange('description', e.target.value);
                  }
                }}
                error={!!errors.description}
                helperText={errors.description || `${formData.description.length}/1000`}
                disabled={isLoading}
                multiline
                rows={5}
                fullWidth
                size="small"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                sx={{ mt: 2 }}
              >
                {isLoading ? <CircularProgress size={24} sx={{ mr: 1 }} /> : null}
                Submit Support Ticket
              </Button>
            </Box>
          </Card>
        </Stack>
      </Box>
    </AdminLayout>
  );
}
