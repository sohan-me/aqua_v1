'use client';

import { useState, useEffect } from 'react';
import { 
  useFeedTypes, 
  useCreateFeedType, 
  useUpdateFeedType, 
  useDeleteFeedType 
} from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { FeedType } from '@/lib/api';
import { HierarchicalFeedTypeTree } from '@/components/feed-types/HierarchicalFeedTypeTree';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Package, 
  Save,
  X,
  Fish,
  Wheat,
  Leaf,
  Droplets,
  Zap
} from 'lucide-react';

export default function FeedTypesPage() {
  const { data: feedTypesData, isLoading } = useFeedTypes();
  const createFeedType = useCreateFeedType();
  const updateFeedType = useUpdateFeedType();
  const deleteFeedType = useDeleteFeedType();

  const feedTypes = extractApiData<FeedType>(feedTypesData);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const [availableParents, setAvailableParents] = useState<FeedType[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    protein_content: '',
    description: '',
    parent: undefined as number | undefined
  });

  const iconOptions = [
    { value: 'package', label: 'Package', icon: Package },
    { value: 'fish', label: 'Fish', icon: Fish },
    { value: 'wheat', label: 'Wheat', icon: Wheat },
    { value: 'leaf', label: 'Leaf', icon: Leaf },
    { value: 'droplets', label: 'Droplets', icon: Droplets },
    { value: 'zap', label: 'Zap', icon: Zap },
  ];

  // Update available parents when feed types change
  useEffect(() => {
    if (feedTypes.length > 0) {
      // Filter out the current editing item and its descendants to prevent circular references
      const filteredParents = feedTypes.filter(feedType => 
        feedType.id !== editingId && 
        !isDescendant(feedType, editingId, feedTypes)
      );
      setAvailableParents(filteredParents);
    }
  }, [feedTypes, editingId]);

  // Helper function to check if a feed type is a descendant of another
  const isDescendant = (feedType: FeedType, ancestorId: number | null, allFeedTypes: FeedType[]): boolean => {
    if (!ancestorId || !feedType.parent) return false;
    if (feedType.parent === ancestorId) return true;
    
    const parent = allFeedTypes.find(ft => ft.id === feedType.parent);
    return parent ? isDescendant(parent, ancestorId, allFeedTypes) : false;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        protein_content: formData.protein_content ? parseFloat(formData.protein_content) : null,
        parent: formData.parent || parentId // Use formData.parent first, fallback to parentId
      };

      if (editingId) {
        await updateFeedType.mutateAsync({ id: editingId, data: submitData });
        setEditingId(null);
      } else {
        await createFeedType.mutateAsync(submitData);
        setIsAdding(false);
      }
      setFormData({ name: '', protein_content: '', description: '', parent: undefined });
      setParentId(undefined);
    } catch (error) {
      console.error('Error saving feed type:', error);
    }
  };

  const handleEdit = (feedType: FeedType) => {
    setFormData({
      name: feedType.name,
      protein_content: feedType.protein_content?.toString() || '',
      description: feedType.description,
      parent: feedType.parent
    });
    setEditingId(feedType.id);
    setParentId(feedType.parent);
    setIsAdding(false);
  };

  const handleDelete = async (feedType: FeedType) => {
    if (window.confirm(`Are you sure you want to delete the feed type "${feedType.name}"? This will also delete all child feed types.`)) {
      try {
        await deleteFeedType.mutateAsync(feedType.id);
      } catch (error) {
        console.error('Error deleting feed type:', error);
        alert('Failed to delete feed type. Please try again.');
        throw error; // Re-throw to let the tree component handle it
      }
    } else {
      // If user cancels, throw an error to prevent reload
      throw new Error('User cancelled deletion');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setParentId(undefined);
    setFormData({ name: '', protein_content: '', description: '', parent: undefined });
  };

  const handleAddFeedType = (parentId?: number) => {
    setParentId(parentId);
    setIsAdding(true);
    setEditingId(null);
    setFormData({ name: '', protein_content: '', description: '', parent: parentId });
  };

  const handleFeedTypeSelect = (feedType: FeedType) => {
    // Optional: Handle selection for viewing details
    console.log('Selected feed type:', feedType);
  };

  const getProteinColor = (protein: number | null) => {
    if (!protein) return 'bg-gray-100 text-gray-800';
    if (protein >= 40) return 'bg-red-100 text-red-800';
    if (protein >= 30) return 'bg-orange-100 text-orange-800';
    if (protein >= 20) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  const getProteinLabel = (protein: number | null) => {
    if (!protein) return 'Not specified';
    if (protein >= 40) return 'High Protein';
    if (protein >= 30) return 'Medium-High Protein';
    if (protein >= 20) return 'Medium Protein';
    return 'Low Protein';
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

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Feed Type' : parentId ? 'Add Subcategory Feed Type' : 'Add New Root Feed Type'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Feed Type Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="e.g., Starter Feed, Grower Feed, Finisher Feed"
                />
              </div>

              <div>
                <label htmlFor="protein_content" className="block text-sm font-medium text-gray-700 mb-2">
                  Protein Content (%)
                </label>
                <input
                  type="number"
                  id="protein_content"
                  name="protein_content"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.protein_content}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="e.g., 32.5"
                />
                <p className="mt-1 text-sm text-gray-500">Optional: Protein percentage in the feed</p>
              </div>
            </div>

            <div>
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
                placeholder="Describe the feed type, its purpose, and any special characteristics..."
              />
            </div>

            <div>
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
                {availableParents.map((feedType) => (
                  <option key={feedType.id} value={feedType.id}>
                    {feedType.name}
                  </option>
                ))}
              </select>
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to create a root category, or select a parent to create a subcategory
              </p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <X className="h-4 w-4 mr-2 inline" />
                Cancel
              </button>
              <button
                type="submit"
                disabled={createFeedType.isPending || updateFeedType.isPending}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                style={{ color: 'white !important' }}
              >
                <Save className="h-4 w-4 mr-2 inline" />
                {editingId ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Hierarchical Feed Types Tree */}
      <HierarchicalFeedTypeTree
        onFeedTypeSelect={handleFeedTypeSelect}
        onAddFeedType={handleAddFeedType}
        onEditFeedType={handleEdit}
        onDeleteFeedType={handleDelete}
        showActions={true}
        className="w-full"
      />

      {/* Feed Type Categories Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Feed Type Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">By Protein Content:</h4>
            <ul className="space-y-1 text-blue-700">
              <li><span className="inline-block w-3 h-3 bg-red-100 rounded-full mr-2"></span>High Protein (40%+): Fry feeds, high-performance feeds</li>
              <li><span className="inline-block w-3 h-3 bg-orange-100 rounded-full mr-2"></span>Medium-High (30-39%): Grower feeds, juvenile feeds</li>
              <li><span className="inline-block w-3 h-3 bg-yellow-100 rounded-full mr-2"></span>Medium (20-29%): Maintenance feeds, adult feeds</li>
              <li><span className="inline-block w-3 h-3 bg-green-100 rounded-full mr-2"></span>Low (Below 20%): Supplementary feeds, treats</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Common Feed Types:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• Starter Feed: High protein for young fish</li>
              <li>• Grower Feed: Balanced nutrition for growth</li>
              <li>• Finisher Feed: Optimized for final growth phase</li>
              <li>• Maintenance Feed: For adult fish maintenance</li>
              <li>• Medicated Feed: With health supplements</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
