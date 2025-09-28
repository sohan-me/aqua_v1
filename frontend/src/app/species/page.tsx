'use client';

import { useState } from 'react';
import { useSpecies, useDeleteSpecies } from '@/hooks/useApi';
import { Species } from '@/lib/api';
import { formatDate, extractApiData } from '@/lib/utils';
import { Fish, Plus, Edit, Trash2, Eye } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';
import { HierarchicalSpeciesTree } from '@/components/species/HierarchicalSpeciesTree';
import { useRouter } from 'next/navigation';

export default function SpeciesPage() {
  const { data: speciesData, isLoading } = useSpecies();
  const deleteSpecies = useDeleteSpecies();
  const router = useRouter();
  
  const species = extractApiData<Species>(speciesData);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the species "${name}"? This action cannot be undone and will affect all related stocking records.`)) {
      try {
        await deleteSpecies.mutateAsync(id);
      } catch (error) {
        toast.error('Failed to delete species. It may be in use by existing stocking records.');
      }
    }
  };

  const handleSpeciesSelect = (species: Species) => {
    // Navigate to species details or handle selection
    console.log('Selected species:', species);
  };

  const handleAddSpecies = (parentId?: number) => {
    const url = parentId ? `/species/new?parent=${parentId}` : '/species/new';
    router.push(url);
  };

  const handleEditSpecies = (species: Species) => {
    router.push(`/species/${species.id}/edit`);
  };

  const handleDeleteSpecies = (species: Species) => {
    // The Tree component handles its own delete logic
    // No need to duplicate the delete handler here
    console.log('Delete species:', species.name);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="md:flex space-y-3 md:space-y-0 items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Fish Species</h1>
          <p className="text-gray-600">Manage hierarchical fish species for your farming operations</p>
        </div>
        <Link
          style={{color: "white"}}
          href="/species/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Species
        </Link>
      </div>

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Total Species</h3>
            <p className="text-3xl font-bold text-blue-600">{species.length}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <Fish className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Hierarchical Species Tree */}
      <HierarchicalSpeciesTree
        onSpeciesSelect={handleSpeciesSelect}
        onAddSpecies={handleAddSpecies}
        onEditSpecies={handleEditSpecies}
        onDeleteSpecies={handleDeleteSpecies}
        showActions={true}
      />
    </div>
  );
}
