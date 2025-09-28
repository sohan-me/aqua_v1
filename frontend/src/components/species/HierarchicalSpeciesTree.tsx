'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Tree, TreeNode, Breadcrumb, TreeNavigation } from '@/components/ui/tree';
import { Species } from '@/lib/api';
import { apiService } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Plus, ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface HierarchicalSpeciesTreeProps {
  onSpeciesSelect?: (species: Species) => void;
  onAddSpecies?: (parentId?: number) => void;
  onEditSpecies?: (species: Species) => void;
  onDeleteSpecies?: (species: Species) => void;
  showActions?: boolean;
  className?: string;
}

export function HierarchicalSpeciesTree({
  onSpeciesSelect,
  onAddSpecies,
  onEditSpecies,
  onDeleteSpecies,
  showActions = true,
  className = ''
}: HierarchicalSpeciesTreeProps) {
  const [species, setSpecies] = useState<Species[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPath, setCurrentPath] = useState<Species[]>([]);
  const [currentParent, setCurrentParent] = useState<number | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const deletingRef = useRef<Set<number>>(new Set());
  const router = useRouter();

  const loadSpecies = async (parentId?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      if (parentId) {
        response = await apiService.getSpeciesChildren(parentId);
      } else {
        response = await apiService.getSpeciesRoots();
      }
      
      setSpecies(response.data);
    } catch (err) {
      setError('Failed to load species');
      console.error('Error loading species:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSpecies();
  }, []);

  const handleNodeClick = (node: Species) => {
    onSpeciesSelect?.(node);
    
    // Navigate to children if they exist
    if (node.children && node.children.length > 0) {
      setCurrentPath([...currentPath, node]);
      setCurrentParent(node.id);
      loadSpecies(node.id);
    }
  };

  const handleBreadcrumbClick = (node: Species) => {
    const nodeIndex = currentPath.findIndex(item => item.id === node.id);
    if (nodeIndex !== -1) {
      // Navigate back to this level
      const newPath = currentPath.slice(0, nodeIndex + 1);
      setCurrentPath(newPath);
      setCurrentParent(node.id);
      loadSpecies(node.id);
    } else {
      // Navigate to root
      setCurrentPath([]);
      setCurrentParent(null);
      loadSpecies();
    }
  };

  const handleBackToRoot = () => {
    setCurrentPath([]);
    setCurrentParent(null);
    loadSpecies();
  };

  const handleAddSpecies = (parentId?: number) => {
    if (parentId) {
      onAddSpecies?.(parentId);
    } else {
      onAddSpecies?.(currentParent || undefined);
    }
  };

  const handleEditSpecies = (species: Species) => {
    onEditSpecies?.(species);
  };

  const handleDeleteSpecies = async (species: Species) => {
    // Use ref for immediate check to prevent race conditions
    if (deletingRef.current.has(species.id)) {
      console.log('Delete already in progress for:', species.id);
      return;
    }

    // Add to both ref and state immediately
    deletingRef.current.add(species.id);
    setDeletingIds(prev => new Set(prev).add(species.id));

    console.log('Starting delete for:', species.id);

    if (window.confirm(`Are you sure you want to delete "${species.name}"?`)) {
      try {
        console.log('Confirmed delete for:', species.id);
        await apiService.deleteSpecies(species.id);
        // Reload the current view
        await loadSpecies(currentParent || undefined);
        onDeleteSpecies?.(species);
      } catch (err) {
        console.error('Error deleting species:', err);
        // Don't show alert for 404 errors (item already deleted)
        if (err.response?.status !== 404) {
          alert('Failed to delete species');
        }
      }
    } else {
      console.log('Delete cancelled for:', species.id);
    }
    
    // Always remove from both ref and state
    deletingRef.current.delete(species.id);
    setDeletingIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(species.id);
      return newSet;
    });
  };

  const handleViewSpecies = (species: Species) => {
    router.push(`/species/${species.id}`);
  };

  if (loading) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-500">Loading species...</div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={`p-4 ${className}`}>
        <div className="text-red-600 text-center">{error}</div>
        <Button onClick={() => loadSpecies(currentParent || undefined)} className="mt-2">
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
            onClick={() => handleAddSpecies()}
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Species
          </Button>
        </div>
      </div>

      {/* Tree */}
      <Tree
        data={species}
        onNodeClick={handleNodeClick}
        onAddChild={handleAddSpecies}
        onEdit={handleEditSpecies}
        onDelete={handleDeleteSpecies}
        onView={handleViewSpecies}
        showActions={showActions}
      />

      {species.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            {currentParent ? 'No subcategories found' : 'No species found'}
          </div>
          <Button
            onClick={() => handleAddSpecies()}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add {currentParent ? 'Subcategory' : 'Species'}
          </Button>
        </Card>
      )}
    </div>
  );
}
