'use client';

import { useState, useEffect } from 'react';
import { 
  useExpenseTypes, 
  useCreateExpenseType, 
  useUpdateExpenseType, 
  useDeleteExpenseType 
} from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { ExpenseType } from '@/lib/api';
import { 
  Plus, 
  Edit, 
  Trash2, 
  DollarSign, 
  Save,
  X,
  Package,
  Heart,
  Wrench,
  Users,
  Zap,
  Settings,
  MoreHorizontal
} from 'lucide-react';
import { HierarchicalExpenseTypeTree } from '@/components/expense-types/HierarchicalExpenseTypeTree';
import { useRouter } from 'next/navigation';

export default function ExpenseTypesPage() {
  const { data: expenseTypesData, isLoading } = useExpenseTypes();
  const createExpenseType = useCreateExpenseType();
  const updateExpenseType = useUpdateExpenseType();
  const deleteExpenseType = useDeleteExpenseType();
  const router = useRouter();

  const expenseTypes = extractApiData<ExpenseType>(expenseTypesData);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [availableParents, setAvailableParents] = useState<ExpenseType[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    category: 'other',
    description: '',
    parent: undefined as number | undefined
  });

  const categoryOptions = [
    { value: 'feed', label: 'Feed', icon: Package, color: 'bg-green-100 text-green-800' },
    { value: 'medicine', label: 'Medicine', icon: Heart, color: 'bg-red-100 text-red-800' },
    { value: 'equipment', label: 'Equipment', icon: Wrench, color: 'bg-blue-100 text-blue-800' },
    { value: 'labor', label: 'Labor', icon: Users, color: 'bg-purple-100 text-purple-800' },
    { value: 'utilities', label: 'Utilities', icon: Zap, color: 'bg-yellow-100 text-yellow-800' },
    { value: 'maintenance', label: 'Maintenance', icon: Settings, color: 'bg-orange-100 text-orange-800' },
    { value: 'other', label: 'Other', icon: MoreHorizontal, color: 'bg-gray-100 text-gray-800' },
  ];

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
      if (editingId) {
        await updateExpenseType.mutateAsync({ id: editingId, data: formData });
        setEditingId(null);
      } else {
        await createExpenseType.mutateAsync(formData);
        setIsAdding(false);
      }
      setFormData({ name: '', category: 'other', description: '', parent: undefined });
    } catch (error) {
      console.error('Error saving expense type:', error);
    }
  };

  const handleEdit = (expenseType: any) => {
    setFormData({
      name: expenseType.name,
      category: expenseType.category,
      description: expenseType.description,
      parent: expenseType.parent
    });
    setEditingId(expenseType.id);
    setIsAdding(false);
  };

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete the expense type "${name}"? This action cannot be undone.`)) {
      try {
        await deleteExpenseType.mutateAsync(id);
      } catch (error) {
        console.error('Error deleting expense type:', error);
      }
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ name: '', category: 'other', description: '', parent: undefined });
  };

  const getCategoryInfo = (category: string) => {
    return categoryOptions.find(option => option.value === category) || categoryOptions[6];
  };

  const getCategoryIcon = (category: string) => {
    const categoryInfo = getCategoryInfo(category);
    const IconComponent = categoryInfo.icon;
    return <IconComponent className="h-4 w-4" />;
  };

  const getCategoryColor = (category: string) => {
    const categoryInfo = getCategoryInfo(category);
    return categoryInfo.color;
  };

  // Load available parents when expense types change
  useEffect(() => {
    if (expenseTypes && expenseTypes.length > 0) {
      setAvailableParents(expenseTypes);
    }
  }, [expenseTypes.length]);

  // Handler functions for hierarchical tree
  const handleExpenseTypeSelect = (expenseType: ExpenseType) => {
    console.log('Selected expense type:', expenseType);
  };

  const handleAddExpenseType = (parentId?: number) => {
    // For now, just show the add form
    setIsAdding(true);
    if (parentId) {
      // Set parent in form data
      setFormData(prev => ({ ...prev, parent: parentId }));
    }
  };

  const handleEditExpenseType = (expenseType: ExpenseType) => {
    setEditingId(expenseType.id);
    setFormData({
      name: expenseType.name,
      category: expenseType.category,
      description: expenseType.description,
      parent: expenseType.parent
    });
  };

  const handleDeleteExpenseType = (expenseType: ExpenseType) => {
    // The Tree component handles its own delete logic
    // No need to duplicate the delete handler here
    console.log('Delete expense type:', expenseType.name);
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
          <h1 className="text-3xl font-bold text-gray-900">Expense Types</h1>
          <p className="text-gray-600">Manage hierarchical expense categories and types for better financial tracking</p>
        </div>
        <button
          style={{color: "white"}}
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Expense Type
        </button>
      </div>

      {/* Hierarchical Expense Type Tree */}
      <HierarchicalExpenseTypeTree
        onExpenseTypeSelect={handleExpenseTypeSelect}
        onAddExpenseType={handleAddExpenseType}
        onEditExpenseType={handleEditExpenseType}
        onDeleteExpenseType={handleDeleteExpenseType}
        showActions={true}
      />

      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Expense Type' : 'Add New Expense Type'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Expense Type Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="e.g., Premium Feed, Water Pump, Labor Cost"
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                  Category *
                </label>
                <select
                  id="category"
                  name="category"
                  required
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                >
                  {categoryOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
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
                placeholder="Describe the expense type and its purpose..."
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
                {availableParents.map((expenseType) => (
                  <option key={expenseType.id} value={expenseType.id}>
                    {expenseType.name}
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
                disabled={createExpenseType.isPending || updateExpenseType.isPending}
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

      {/* Summary Card */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Total Expense Types</h3>
            <p className="text-3xl font-bold text-blue-600">{expenseTypes.length}</p>
          </div>
          <div className="rounded-full bg-blue-100 p-3">
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>
      </div>


      {/* Expense Categories Info */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-red-900 mb-3">Expense Categories</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-red-800 mb-2">Operational Expenses:</h4>
            <ul className="space-y-1 text-red-700">
              <li><span className="inline-block w-3 h-3 bg-green-100 rounded-full mr-2"></span>Feed: Fish feed, supplements, nutrition</li>
              <li><span className="inline-block w-3 h-3 bg-red-100 rounded-full mr-2"></span>Medicine: Health treatments, vaccines, medications</li>
              <li><span className="inline-block w-3 h-3 bg-blue-100 rounded-full mr-2"></span>Equipment: Pumps, aerators, monitoring devices</li>
              <li><span className="inline-block w-3 h-3 bg-purple-100 rounded-full mr-2"></span>Labor: Wages, contractor fees, services</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-red-800 mb-2">Infrastructure Expenses:</h4>
            <ul className="space-y-1 text-red-700">
              <li><span className="inline-block w-3 h-3 bg-yellow-100 rounded-full mr-2"></span>Utilities: Electricity, water, gas bills</li>
              <li><span className="inline-block w-3 h-3 bg-orange-100 rounded-full mr-2"></span>Maintenance: Repairs, cleaning, upkeep</li>
              <li><span className="inline-block w-3 h-3 bg-gray-100 rounded-full mr-2"></span>Other: Miscellaneous expenses</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
