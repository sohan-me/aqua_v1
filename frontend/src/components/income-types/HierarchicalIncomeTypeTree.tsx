'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Tree, TreeNode, Breadcrumb, TreeNavigation } from '@/components/ui/tree';
import { IncomeType } from '@/lib/api';
import { apiService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HierarchicalIncomeTypeTreeProps {
  onIncomeTypeSelect?: (incomeType: IncomeType) => void;
  onAddIncomeType?: (parentId?: number) => void;
  onEditIncomeType?: (incomeType: IncomeType) => void;
  onDeleteIncomeType?: (incomeType: IncomeType) => void;
  showActions?: boolean;
  className?: string;
}

export function HierarchicalIncomeTypeTree({
  onIncomeTypeSelect,
  onAddIncomeType,
  onEditIncomeType,
  onDeleteIncomeType,
  showActions = true,
  className = ''
}: HierarchicalIncomeTypeTreeProps) {
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<IncomeType[]>([]);
  const [currentParent, setCurrentParent] = useState<number | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const deletingRef = useRef<Set<number>>(new Set());
  const router = useRouter();

  const loadIncomeTypes = async (parentId?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (parentId) {
        response = await apiService.getIncomeTypeChildren(parentId);
      } else {
        response = await apiService.getIncomeTypeRoots();
      }
      
      setIncomeTypes(response.data);
    } catch (err) {
      setError('Failed to load income types');
      console.error('Error loading income types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncomeTypes();
  }, []);

  const handleNodeClick = (node: IncomeType) => {
    onIncomeTypeSelect?.(node);
    
    // Navigate to children if they exist
    if (node.children && node.children.length > 0) {
      setCurrentPath([...currentPath, node]);
      setCurrentParent(node.id);
      loadIncomeTypes(node.id);
    }
  };

  const handleBreadcrumbClick = (node: IncomeType) => {
    const nodeIndex = currentPath.findIndex(item => item.id === node.id);
    if (nodeIndex !== -1) {
      // Navigate back to this level
      const newPath = currentPath.slice(0, nodeIndex + 1);
      setCurrentPath(newPath);
      setCurrentParent(node.id);
      loadIncomeTypes(node.id);
    } else {
      // Navigate to root
      setCurrentPath([]);
      setCurrentParent(null);
      loadIncomeTypes();
    }
  };

  const handleBackToRoot = () => {
    setCurrentPath([]);
    setCurrentParent(null);
    loadIncomeTypes();
  };

  const handleAddIncomeType = (parentId?: number) => {
    if (parentId) {
      onAddIncomeType?.(parentId);
    } else {
      onAddIncomeType?.(currentParent || undefined);
    }
  };

  const handleEditIncomeType = (incomeType: IncomeType) => {
    onEditIncomeType?.(incomeType);
  };

  const handleDeleteIncomeType = async (incomeType: IncomeType) => {
    // Use ref for immediate check to prevent race conditions
    if (deletingRef.current.has(incomeType.id)) {
      console.log('Delete already in progress for:', incomeType.id);
      return;
    }

    // Add to both ref and state immediately
    deletingRef.current.add(incomeType.id);
    setDeletingIds(prev => new Set(prev).add(incomeType.id));

    console.log('Starting delete for:', incomeType.id);

    if (window.confirm(`Are you sure you want to delete "${incomeType.name}"?`)) {
      try {
        console.log('Confirmed delete for:', incomeType.id);
        await apiService.deleteIncomeType(incomeType.id);
        // Reload the current view
        await loadIncomeTypes(currentParent || undefined);
        onDeleteIncomeType?.(incomeType);
      } catch (err) {
        console.error('Error deleting income type:', err);
        // Don't show alert for 404 errors (item already deleted)
        if (err.response?.status !== 404) {
          alert('Failed to delete income type');
        }
      }
    } else {
      console.log('Delete cancelled for:', incomeType.id);
    }
    
    // Always remove from both ref and state
    deletingRef.current.delete(incomeType.id);
    setDeletingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(incomeType.id);
      return newSet;
    });
  };

  const handleViewIncomeType = (incomeType: IncomeType) => {
    router.push(`/income-types/${incomeType.id}`);
  };

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading income types...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="text-red-600 text-center">{error}</div>
        <Button onClick={() => loadIncomeTypes(currentParent || undefined)} className="mt-2">
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
            onClick={() => handleAddIncomeType()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Income Type
          </Button>
        </div>
      </div>

      {/* Tree */}
      <Tree
        data={incomeTypes}
        onNodeClick={handleNodeClick}
        onAddChild={handleAddIncomeType}
        onEdit={handleEditIncomeType}
        onDelete={handleDeleteIncomeType}
        onView={handleViewIncomeType}
        showActions={showActions}
      />

      {incomeTypes.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            {currentParent ? 'No subcategories found' : 'No income types found'}
          </div>
          <Button
            onClick={() => handleAddIncomeType()}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add {currentParent ? 'Subcategory' : 'Income Type'}
          </Button>
        </Card>
      )}
    </div>
  );
}
