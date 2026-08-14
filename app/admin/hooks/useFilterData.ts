'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';

interface FilterData {
  branches: { id: string; name: string }[];
  services: { id: string; name: string }[];
  cities: string[];
  managers: { id: string; name: string }[];
  bookingStatuses: { value: string; label: string }[];
  paymentStatuses: { value: string; label: string }[];
  loading: boolean;
  error: string | null;
}

export const useFilterData = () => {
  const [data, setData] = useState<FilterData>({
    branches: [],
    services: [],
    cities: [],
    managers: [],
    bookingStatuses: [
      { value: 'pending', label: 'Pending' },
      { value: 'confirmed', label: 'Confirmed' },
      { value: 'assigned', label: 'Assigned' },
      { value: 'in_progress', label: 'In Progress' },
      { value: 'completed', label: 'Completed' },
      { value: 'cancelled', label: 'Cancelled' },
    ],
    paymentStatuses: [
      { value: 'pending', label: 'Pending' },
      { value: 'completed', label: 'Completed' },
      { value: 'failed', label: 'Failed' },
      { value: 'refunded', label: 'Refunded' },
    ],
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchFilterData = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL || '',
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
        );

        console.log('[useFilterData] Starting to fetch filter data...');

        // Fetch branches
        const { data: branchesData, error: branchesError } = await supabase
          .from('branches')
          .select('id, name')
          .eq('is_active', true)
          .order('name');

        console.log('[useFilterData] Branches fetched:', { count: branchesData?.length, error: branchesError?.message });

        // Fetch services - Get DISTINCT service_name from customer app bookings
        // This ensures filter shows actual services being used by customers
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('service_name')
          .not('service_name', 'is', null);

        // Extract unique service names and create service objects
        const uniqueServices = Array.from(
          new Set(bookingsData?.map((b: any) => b.service_name).filter(Boolean) || [])
        );
        
        const servicesData = uniqueServices.map((name: string, index: number) => ({
          id: `service-${index}`, // Generate ID based on index
          name: name,
        }));

        const servicesError = bookingsError;

        console.log('[useFilterData] Services fetched from bookings:', { 
          count: servicesData.length, 
          error: servicesError?.message, 
          services: servicesData 
        });

        // Fetch unique cities from branches
        const { data: citiesData, error: citiesError } = await supabase
          .from('branches')
          .select('city')
          .eq('is_active', true)
          .not('city', 'is', null);

        console.log('[useFilterData] Cities fetched:', { count: citiesData?.length, error: citiesError?.message });

        // Fetch managers from users table where role = 'branch_admin'
        const { data: managersData, error: managersError } = await supabase
          .from('users')
          .select('id, full_name')
          .eq('role', 'branch_admin')
          .order('full_name');

        console.log('[useFilterData] Managers fetched:', { count: managersData?.length, error: managersError?.message });

        const uniqueCities = Array.from(new Set(citiesData?.map((c: any) => c.city).filter(Boolean) || []));

        if (branchesError || servicesError || citiesError || managersError) {
          const errorMsg = `Failed to fetch filter data - Branches: ${branchesError?.message}, Services: ${servicesError?.message}, Cities: ${citiesError?.message}, Managers: ${managersError?.message}`;
          console.error('[useFilterData]', errorMsg);
          throw new Error(errorMsg);
        }

        setData((prev) => ({
          ...prev,
          branches: branchesData || [],
          services: servicesData || [],
          cities: uniqueCities as string[],
          managers: managersData?.map((m: any) => ({ id: m.id, name: m.full_name })) || [],
          loading: false,
        }));

        console.log('[useFilterData] Data loaded successfully');
      } catch (err) {
        console.error('[useFilterData] Error fetching filter data:', err);
        setData((prev) => ({
          ...prev,
          error: 'Failed to load filter options',
          loading: false,
        }));
      }
    };

    fetchFilterData();
  }, []);

  return data;
};
