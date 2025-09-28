'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Tree, TreeNode, Breadcrumb, TreeNavigation } from '@/components/ui/tree';
import { ExpenseType } from '@/lib/api';
import { apiService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HierarchicalExpenseTypeTreeProps {
  onExpenseTypeSelect?: (expenseType: ExpenseType) => void;
  onAddExpenseType?: (parentId?: number) => void;
  onEditExpenseType?: (expenseType: ExpenseType) => void;
  onDeleteExpenseType?: (expenseType: ExpenseType) => void;
  showActions?: boolean;
  className?: string;
}

export function HierarchicalExpenseTypeTree({
  onExpenseTypeSelect,
  onAddExpenseType,
  onEditExpenseType,
  onDeleteExpenseType,
  showActions = true,
  className = ''
}: HierarchicalExpenseTypeTreeProps) {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<ExpenseType[]>([]);
  const [currentParent, setCurrentParent] = useState<number | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const deletingRef = useRef<Set<number>>(new Set());
  const router = useRouter();

  const loadExpenseTypes = async (parentId?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (parentId) {
        response = await apiService.getExpenseTypeChildren(parentId);
      } else {
        response = await apiService.getExpenseTypeRoots();
      }
      
      setExpenseTypes(response.data);
    } catch (err) {
      setError('Failed to load expense types');
      console.error('Error loading expense types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenseTypes();
  }, []);

  const handleNodeClick = (node: ExpenseType) => {
    onExpenseTypeSelect?.(node);
    
    // Navigate to children if they exist
    if (node.children && node.children.length > 0) {
      setCurrentPath([...currentPath, node]);
      setCurrentParent(node.id);
      loadExpenseTypes(node.id);
    }
  };

  const handleBreadcrumbClick = (node: ExpenseType) => {
    const nodeIndex = currentPath.findIndex(item => item.id === node.id);
    if (nodeIndex !== -1) {
      // Navigate back to this level
      const newPath = currentPath.slice(0, nodeIndex + 1);
      setCurrentPath(newPath);
      setCurrentParent(node.id);
      loadExpenseTypes(node.id);
    } else {
      // Navigate to root
      setCurrentPath([]);
      setCurrentParent(null);
      loadExpenseTypes();
    }
  };

  const handleBackToRoot = () => {
    setCurrentPath([]);
    setCurrentParent(null);
    loadExpenseTypes();
  };

  const handleAddExpenseType = (parentId?: number) => {
    if (parentId) {
      onAddExpenseType?.(parentId);
    } else {
      onAddExpenseType?.(currentParent || undefined);
    }
  };

  const handleEditExpenseType = (expenseType: ExpenseType) => {
    onEditExpenseType?.(expenseType);
  };

  const handleDeleteExpenseType = async (expenseType: ExpenseType) => {
    // Use ref for immediate check to prevent race conditions
    if (deletingRef.current.has(expenseType.id)) {
      console.log('Delete already in progress for:', expenseType.id);
      return;
    }

    // Add to both ref and state immediately
    deletingRef.current.add(expenseType.id);
    setDeletingIds(prev => new Set(prev).add(expenseType.id));

    console.log('Starting delete for:', expenseType.id);

    if (window.confirm(`Are you sure you want to delete "${expenseType.name}"?`)) {
      try {
        console.log('Confirmed delete for:', expenseType.id);
        await apiService.deleteExpenseType(expenseType.id);
        // Reload the current view
        await loadExpenseTypes(currentParent || undefined);
        onDeleteExpenseType?.(expenseType);
      } catch (err) {
        console.error('Error deleting expense type:', err);
        // Don't show alert for 404 errors (item already deleted)
        if (err.response?.status !== 404) {
          alert('Failed to delete expense type');
        }
      }
    } else {
      console.log('Delete cancelled for:', expenseType.id);
    }
    
    // Always remove from both ref and state
    deletingRef.current.delete(expenseType.id);
    setDeletingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(expenseType.id);
      return newSet;
    });
  };

  const handleViewExpenseType = (expenseType: ExpenseType) => {
    router.push(`/expense-types/${expenseType.id}`);
  };

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading expense types...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="text-red-600 text-center">{error}</div>
        <Button onClick={() => loadExpenseTypes(currentParent || undefined)} className="mt-2">
          Retry
        </Button>
      </Card>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <TreeNavigation
          currentPath={currentPath}
          onNavigate={handleBreadcrumbClick}
        />
        
        <div className="flex items-center space-x-2">
          {currentParent && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleBackToRoot}
            >
              <Home className="h-4 w-4 mr-1" />
              Root
            </Button>
          )}
          
          <Button
            onClick={() => handleAddExpenseType()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Expense Type
          </Button>
        </div>
      </div>

      {/* Tree */}
      <Tree
        data={expenseTypes}
        onNodeClick={handleNodeClick}
        onAddChild={handleAddExpenseType}
        onEdit={handleEditExpenseType}
        onDelete={handleDeleteExpenseType}
        onView={handleViewExpenseType}
        showActions={showActions}
      />

      {expenseTypes.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            {currentParent ? 'No subcategories found' : 'No expense types found'}
          </div>
          <Button
            onClick={() => handleAddExpenseType()}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add {currentParent ? 'Subcategory' : 'Expense Type'}
          </Button>
        </Card>
      )}
    </div>
  );
}
