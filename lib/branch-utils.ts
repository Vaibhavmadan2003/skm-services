/**
 * Utility functions for branch operations
 */

/**
 * Fetch branches from API
 */
export async function fetchBranches() {
  try {
    const response = await fetch('/api/branches');
    const result = await response.json();
    
    if (result.success) {
      return result.data;
    } else {
      console.error('Failed to fetch branches:', result.error);
      return [];
    }
  } catch (error) {
    console.error('Error fetching branches:', error);
    return [];
  }
}

/**
 * Update branch status (suspend/activate)
 */
export async function updateBranchStatus(branchId: string, isActive: boolean) {
  try {
    const response = await fetch(`/api/branches/${branchId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: isActive }),
    });

    const result = await response.json();
    return { success: result.success, data: result.data, error: result.error };
  } catch (error) {
    console.error('Error updating branch:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Delete a branch
 */
export async function deleteBranchById(branchId: string) {
  try {
    const response = await fetch(`/api/branches/${branchId}`, {
      method: 'DELETE',
    });

    const result = await response.json();
    return { success: result.success, error: result.error };
  } catch (error) {
    console.error('Error deleting branch:', error);
    return { success: false, error: String(error) };
  }
}

/**
 * Create a new branch
 */
export async function createBranch(branchData: {
  name: string;
  email: string;
  phone: string;
  city: string;
  address?: string;
  manager_name?: string;
  manager_id?: string;
}) {
  try {
    const response = await fetch('/api/branches', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(branchData),
    });

    const result = await response.json();
    return { success: result.success, data: result.data, error: result.error };
  } catch (error) {
    console.error('Error creating branch:', error);
    return { success: false, error: String(error) };
  }
}
