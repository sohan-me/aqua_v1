'use client';

import { useState, useEffect } from 'react';
import {
  useAccountTypes,
  useCreateAccountType,
  useUpdateAccountType,
  useDeleteAccountType
} from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { AccountType } from '@/lib/api';
import { HierarchicalAccountTypeTree } from '@/components/account-types/HierarchicalAccountTypeTree';
import {
  Plus,
  Save,
  X,
  Filter
} from 'lucide-react';

export default function AccountTypesPage() {
  const { data: accountTypesData, isLoading } = useAccountTypes();
  const createAccountType = useCreateAccountType();
  const updateAccountType = useUpdateAccountType();
  const deleteAccountType = useDeleteAccountType();

  const accountTypes = extractApiData<AccountType>(accountTypesData);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [parentId, setParentId] = useState<number | undefined>(undefined);
  const [availableParents, setAvailableParents] = useState<AccountType[]>([]);
  const [typeFilter, setTypeFilter] = useState<'expense' | 'income' | 'loan' | 'bank' | 'equity' | 'credit_card' | 'others' | 'all'>('all');
  const [formData, setFormData] = useState({
    name: '',
    type: 'expense' as 'expense' | 'income' | 'loan' | 'bank' | 'equity' | 'credit_card' | 'others',
    description: '',
    parent: undefined as number | undefined
  });

  // Helper to prevent circular references in parent selection
  const isDescendant = (accountType: AccountType, ancestorId: number | null, allAccountTypes: AccountType[]): boolean => {
    if (!ancestorId || !accountType.parent) return false;
    if (accountType.parent === ancestorId) return true;
    const parent = allAccountTypes.find(at => at.id === accountType.parent);
    return parent ? isDescendant(parent, ancestorId, allAccountTypes) : false;
  };

  // Update available parents when account types change or editingId changes
  useEffect(() => {
    if (accountTypes.length > 0) {
      const filteredParents = accountTypes.filter(accountType =>
        accountType.id !== editingId &&
        !isDescendant(accountType, editingId, accountTypes) &&
        accountType.type === formData.type // Only show parents of the same type
      );
      setAvailableParents(filteredParents);
    }
  }, [accountTypes, editingId, formData.type]);

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
        parent: formData.parent || parentId
      };

      if (editingId) {
        await updateAccountType.mutateAsync({ id: editingId, data: submitData });
        setEditingId(null);
      } else {
        await createAccountType.mutateAsync(submitData);
        setIsAdding(false);
      }
      setFormData({ name: '', type: 'expense', description: '', parent: undefined });
      setParentId(undefined);
    } catch (error) {
      console.error('Error saving account type:', error);
    }
  };

  const handleEdit = (accountType: AccountType) => {
    setFormData({
      name: accountType.name,
      type: accountType.type,
      description: accountType.description,
      parent: accountType.parent
    });
    setEditingId(accountType.id);
    setParentId(accountType.parent);
    setIsAdding(false);
  };

  const handleDelete = async (accountType: AccountType) => {
    if (window.confirm(`Are you sure you want to delete the account type "${accountType.name}"? This will also delete all child account types.`)) {
      try {
        await deleteAccountType.mutateAsync(accountType.id);
      } catch (error) {
        console.error('Error deleting account type:', error);
        alert('Failed to delete account type. Please try again.');
        throw error;
      }
    } else {
      throw new Error('User cancelled deletion');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setParentId(undefined);
    setFormData({ name: '', type: 'expense', description: '', parent: undefined });
  };

  const handleAddAccountType = (parentId?: number) => {
    setParentId(parentId);
    setIsAdding(true);
    setEditingId(null);
    setFormData({ 
      name: '', 
      type: 'expense', 
      description: '', 
      parent: parentId 
    });
  };

  const handleAccountTypeSelect = (accountType: AccountType) => {
    console.log('Selected account type:', accountType);
  };


  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500">Loading account types...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {(isAdding || editingId) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {editingId ? 'Edit Account Type' : parentId ? 'Add Subcategory Account Type' : 'Add New Root Account Type'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Account Type Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="e.g., Commercial Feed, Market Sales, Labor Costs"
                />
              </div>

              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                  Type *
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                  <option value="loan">Loan</option>
                  <option value="bank">Bank</option>
                  <option value="equity">Equity</option>
                  <option value="credit_card">Credit Card</option>
                  <option value="others">Others</option>
                </select>
              </div>
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
                {availableParents.map((accountType) => (
                  <option key={accountType.id} value={accountType.id}>
                    {accountType.name}
                  </option>
                ))}
              </select>
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
                placeholder="Describe the account type, its purpose, and any special characteristics..."
              />
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
                disabled={createAccountType.isPending || updateAccountType.isPending}
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

      {/* Hierarchical Account Types Tree */}
      <HierarchicalAccountTypeTree
        onAccountTypeSelect={handleAccountTypeSelect}
        onAddAccountType={handleAddAccountType}
        onEditAccountType={handleEdit}
        onDeleteAccountType={handleDelete}
        showActions={true}
        className="w-full"
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
      />

      {/* Account Type Categories Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Comprehensive Financial Account Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Financial Account Types:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• <span className="font-medium">Expense:</span> Feed, medicine, equipment, labor, utilities</li>
              <li>• <span className="font-medium">Income:</span> Harvest sales, consulting, services</li>
              <li>• <span className="font-medium">Loan:</span> Bank loans, personal loans, credit facilities</li>
              <li>• <span className="font-medium">Bank:</span> Checking, savings, and other bank accounts</li>
              <li>• <span className="font-medium">Equity:</span> Owner's equity, retained earnings, capital</li>
              <li>• <span className="font-medium">Credit Card:</span> Credit card payments and expenses</li>
              <li>• <span className="font-medium">Others:</span> Miscellaneous accounts and transactions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Usage Examples:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• <span className="font-medium">Expenses → Feed Expenses → Commercial Feed</span></li>
              <li>• <span className="font-medium">Income → Harvest Sales → Market Sales</span></li>
              <li>• <span className="font-medium">Bank → Bank Accounts → Checking Account</span></li>
              <li>• <span className="font-medium">Loan → Bank Loans → Equipment Loan</span></li>
              <li>• <span className="font-medium">Equity → Owner's Equity → Initial Investment</span></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
