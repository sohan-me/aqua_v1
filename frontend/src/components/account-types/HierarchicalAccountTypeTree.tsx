'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tree } from '@/components/ui/tree';
import { apiService, AccountType } from '@/lib/api';
import { Plus, Filter } from 'lucide-react';

interface HierarchicalAccountTypeTreeProps {
  onAccountTypeSelect?: (accountType: AccountType) => void;
  onAddAccountType?: (parentId?: number) => void;
  onEditAccountType?: (accountType: AccountType) => void;
  onDeleteAccountType?: (accountType: AccountType) => void;
  showActions?: boolean;
  className?: string;
  typeFilter?: 'expense' | 'income' | 'loan' | 'bank' | 'equity' | 'credit_card' | 'others' | 'all';
  onTypeFilterChange?: (type: 'expense' | 'income' | 'loan' | 'bank' | 'equity' | 'credit_card' | 'others' | 'all') => void;
}

export function HierarchicalAccountTypeTree({
  onAccountTypeSelect,
  onAddAccountType,
  onEditAccountType,
  onDeleteAccountType,
  showActions = true,
  className = '',
  typeFilter = 'all',
  onTypeFilterChange
}: HierarchicalAccountTypeTreeProps) {
  const [accountTypes, setAccountTypes] = useState<AccountType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const deletingRef = useRef<Set<number>>(new Set());

  const loadAccountTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      switch (typeFilter) {
        case 'expense':
          response = await apiService.getAccountTypeExpenses();
          break;
        case 'income':
          response = await apiService.getAccountTypeIncomes();
          break;
        case 'loan':
          response = await apiService.getAccountTypeLoans();
          break;
        case 'bank':
          response = await apiService.getAccountTypeBanks();
          break;
        case 'equity':
          response = await apiService.getAccountTypeEquity();
          break;
        case 'credit_card':
          response = await apiService.getAccountTypeCreditCards();
          break;
        case 'others':
          response = await apiService.getAccountTypeOthers();
          break;
        default:
          response = await apiService.getAccountTypeRoots();
      }
      
      setAccountTypes(response.data);
    } catch (err) {
      setError('Failed to load account types');
      console.error('Error loading account types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAccountTypes();
  }, [typeFilter]);

  const handleNodeClick = (node: AccountType) => {
    onAccountTypeSelect?.(node);
  };

  const handleDelete = async (accountType: AccountType) => {
    if (deletingRef.current.has(accountType.id)) {
      return;
    }
    try {
      deletingRef.current.add(accountType.id);
      await onDeleteAccountType?.(accountType); // Parent handles confirmation and actual deletion
      loadAccountTypes(); // Reload after successful deletion
    } catch (err) {
      console.error('Error deleting account type:', err);
    } finally {
      deletingRef.current.delete(accountType.id);
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'expense':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'income':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'loan':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'bank':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'equity':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'credit_card':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'others':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (loading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading account types...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <Button onClick={loadAccountTypes} variant="outline">
            Try Again
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* Header with Type Filter */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Account Types</h2>
          <p className="text-gray-600">Manage unified expense and income categories with hierarchical structure</p>
        </div>
        <div className="flex items-center space-x-3">
          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={typeFilter}
              onChange={(e) => onTypeFilterChange?.(e.target.value as 'expense' | 'income' | 'loan' | 'bank' | 'equity' | 'credit_card' | 'others' | 'all')}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="expense">Expenses</option>
              <option value="income">Income</option>
              <option value="loan">Loans</option>
              <option value="bank">Bank Accounts</option>
              <option value="equity">Equity</option>
              <option value="credit_card">Credit Cards</option>
              <option value="others">Others</option>
            </select>
          </div>
          {showActions && (
            <Button onClick={() => onAddAccountType?.()} className="h-10">
              <Plus className="h-4 w-4 mr-2" />
              Add Account Type
            </Button>
          )}
        </div>
      </div>

      {/* Account Types Tree */}
      <Tree
        data={accountTypes}
        onNodeClick={handleNodeClick}
        onAddChild={onAddAccountType}
        onEdit={onEditAccountType}
        onDelete={handleDelete}
        onView={onAccountTypeSelect}
        showActions={showActions}
        renderNodeContent={(node: AccountType) => (
          <div className="flex items-center space-x-2">
            <span className="font-medium">{node.name}</span>
            <span className={`px-2 py-1 text-xs rounded-full border ${getTypeBadgeColor(node.type)}`}>
              {node.type_display || node.type}
            </span>
          </div>
        )}
      />

      {accountTypes.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500 mb-4">
            <div className="text-lg font-medium mb-2">No account types found</div>
            <div className="text-sm">
              {typeFilter === 'all' 
                ? 'Get started by creating your first account type.'
                : `No ${typeFilter} account types found. Try creating one or switch to "All Types".`
              }
            </div>
          </div>
          {showActions && (
            <Button onClick={() => onAddAccountType?.()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Account Type
            </Button>
          )}
        </Card>
      )}

      {/* Account Type Categories Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-3">Financial Account Types</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Expense & Liability Types:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• <span className="font-medium">Expense:</span> Feed, medicine, equipment, labor, utilities</li>
              <li>• <span className="font-medium">Credit Card:</span> Credit card payments and expenses</li>
              <li>• <span className="font-medium">Loan:</span> Bank loans, personal loans, credit facilities</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-800 mb-2">Asset & Equity Types:</h4>
            <ul className="space-y-1 text-blue-700">
              <li>• <span className="font-medium">Income:</span> Harvest sales, consulting, services</li>
              <li>• <span className="font-medium">Bank:</span> Checking, savings, and other bank accounts</li>
              <li>• <span className="font-medium">Equity:</span> Owner's equity, retained earnings, capital</li>
              <li>• <span className="font-medium">Others:</span> Miscellaneous accounts and transactions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
