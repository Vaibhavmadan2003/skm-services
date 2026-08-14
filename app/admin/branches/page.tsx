'use client';

import React, { useState } from 'react';
import AdminLayout from '../components/AdminLayout';
import BranchesModule from '../components/BranchesModule';
import { Branch } from '../lib/mock-branches';

export default function BranchesPage() {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null);

  return (
    <AdminLayout>
      <BranchesModule onBranchSelect={setSelectedBranch} />
    </AdminLayout>
  );
}
