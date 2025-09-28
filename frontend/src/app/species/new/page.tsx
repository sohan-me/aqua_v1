'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCreateSpecies } from '@/hooks/useApi';
import { ArrowLeft, Save, X, Fish } from 'lucide-react';
import { toast } from 'sonner';
import { apiService } from '@/lib/api';
import { Species } from '@/lib/api';

export default function NewSpeciesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const createSpecies = useCreateSpecies();
  const parentId = searchParams.get('parent');

  const [formData, setFormData] = useState({
    name: '',
    scientific_name: '',
    description: '',
    parent: parentId ? parseInt(parentId) : undefined
  });

  const [parentSpecies, setParentSpecies] = useState<Species | null>(null);
  const [availableSpecies, setAvailableSpecies] = useState<Species[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingParent, setLoadingParent] = useState(false);
  const [loadingSpecies, setLoadingSpecies] = useState(false);

  // Load parent species if parentId is provided
  useEffect(() => {
    if (parentId) {
      setLoadingParent(true);
      apiService.getSpeciesById(parseInt(parentId))
        .then(response => {
          setParentSpecies(response.data);
        })
        .catch(error => {
          console.error('Error loading parent species:', error);
          toast.error('Failed to load parent species');
        })
        .finally(() => {
          setLoadingParent(false);
        });
    }
  }, [parentId]);

  // Load available species for parent selection
  useEffect(() => {
    setLoadingSpecies(true);
    apiService.getSpecies()
      .then(response => {
        setAvailableSpecies(response.data);
      })
      .catch(error => {
        console.error('Error loading species:', error);
        toast.error('Failed to load species');
      })
      .finally(() => {
        setLoadingSpecies(false);
      });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        name: formData.name.trim(),
        scientific_name: formData.scientific_name.trim(),
        description: formData.description.trim(),
        parent: formData.parent
      };

      await createSpecies.mutateAsync(submitData);
      router.push('/species');
    } catch (error) {
      toast.error('Failed to create species');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/species');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {parentSpecies ? `Add Subcategory to ${parentSpecies.name}` : 'Add New Species'}
            </h1>
            <p className="text-gray-600 mt-1">
              {parentSpecies 
                ? `Add a new subcategory under ${parentSpecies.name}` 
                : 'Add a new fish species to your farming system'
              }
            </p>
          </div>
        </div>
      </div>

      {/* Parent Species Info */}
      {parentSpecies && (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <Fish className="h-5 w-5 text-blue-600 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-blue-900">Parent Species</h3>
              <p className="text-sm text-blue-700">{parentSpecies.name}</p>
              {parentSpecies.scientific_name && (
                <p className="text-xs text-blue-600 italic">{parentSpecies.scientific_name}</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Fish className="h-5 w-5 mr-2" />
            Species Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Common Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., Tilapia"
              />
            </div>

            <div>
              <label htmlFor="scientific_name" className="block text-sm font-medium text-gray-700 mb-2">
                Scientific Name 
              </label>
              <input
                type="text"
                id="scientific_name"
                name="scientific_name"
                value={formData.scientific_name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., Oreochromis niloticus"
              />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="parent" className="block text-sm font-medium text-gray-700 mb-2">
              Parent Category (Optional)
            </label>
            <select
              id="parent"
              name="parent"
              value={formData.parent || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, parent: e.target.value ? parseInt(e.target.value) : undefined }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
            >
              <option value="">Select a parent category (optional)</option>
              {availableSpecies.map((species) => (
                <option key={species.id} value={species.id}>
                  {species.name} {species.scientific_name && `(${species.scientific_name})`}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 mt-1">
              Leave empty to create a root category, or select a parent to create a subcategory
            </p>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Brief description of the species..."
            />
          </div>
        </div>


        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: 'white !important' }}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Species'}
          </button>
        </div>
      </form>
    </div>
  );
}
