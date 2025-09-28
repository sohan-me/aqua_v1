'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tree } from '@/components/ui/tree';
import { apiService, FeedType } from '@/lib/api';
import { Plus } from 'lucide-react';

interface HierarchicalFeedTypeTreeProps {
  onFeedTypeSelect?: (feedType: FeedType) => void;
  onAddFeedType?: (parentId?: number) => void;
  onEditFeedType?: (feedType: FeedType) => void;
  onDeleteFeedType?: (feedType: FeedType) => void;
  showActions?: boolean;
  className?: string;
}

export function HierarchicalFeedTypeTree({
  onFeedTypeSelect,
  onAddFeedType,
  onEditFeedType,
  onDeleteFeedType,
  showActions = true,
  className = ''
}: HierarchicalFeedTypeTreeProps) {
  const [feedTypes, setFeedTypes] = useState<FeedType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());
  const deletingRef = useRef<Set<number>>(new Set());

  const loadFeedTypes = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load only root feed types - the Tree component will handle children
      const response = await apiService.getFeedTypeRoots();
      setFeedTypes(response.data);
    } catch (err) {
      setError('Failed to load feed types');
      console.error('Error loading feed types:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFeedTypes();
  }, []);

  const handleNodeClick = (node: FeedType) => {
    onFeedTypeSelect?.(node);
  };

  const handleDelete = async (feedType: FeedType) => {
    if (deletingRef.current.has(feedType.id)) {
      return;
    }

    try {
      deletingRef.current.add(feedType.id);
      setDeletingIds(new Set(deletingRef.current));

      // Call the parent's delete handler which will handle confirmation and deletion
      await onDeleteFeedType?.(feedType);
      
      // Reload the entire tree after successful deletion
      loadFeedTypes();
    } catch (err) {
      console.error('Error deleting feed type:', err);
    } finally {
      deletingRef.current.delete(feedType.id);
      setDeletingIds(new Set(deletingRef.current));
    }
  };

  if (loading) {
    return (
      <div className={className}>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading feed types...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={className}>
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => loadFeedTypes()}>
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feed Types</h2>
          <p className="text-gray-600">Manage hierarchical feed types and their nutritional properties</p>
        </div>
        {showActions && (
          <Button
            onClick={() => onAddFeedType?.()}
            className="h-10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Feed Type
          </Button>
        )}
      </div>

      {/* Tree */}
      <Tree
        data={feedTypes}
        onNodeClick={handleNodeClick}
        onAddChild={onAddFeedType}
        onEdit={onEditFeedType}
        onDelete={handleDelete}
        onView={onFeedTypeSelect}
        showActions={showActions}
      />

      {feedTypes.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-gray-500">
            No feed types found. Create your first feed type to get started.
          </div>
          <Button
            onClick={() => onAddFeedType?.()}
            className="mt-4"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Feed Type
          </Button>
        </Card>
      )}
    </div>
  );
}
