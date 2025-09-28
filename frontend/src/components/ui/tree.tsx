'use client';

import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Plus, Edit, Trash2, Eye } from 'lucide-react';
import { Button } from './button';
import { Card } from './card';

export interface TreeNode {
  id: number;
  name: string;
  description?: string;
  children?: TreeNode[];
  level: number;
  parent?: number;
  parent_name?: string;
}

interface TreeProps {
  data: TreeNode[];
  onNodeClick?: (node: TreeNode) => void;
  onAddChild?: (parentId: number) => void;
  onEdit?: (node: TreeNode) => void;
  onDelete?: (node: TreeNode) => void;
  onView?: (node: TreeNode) => void;
  showActions?: boolean;
  className?: string;
}

export function Tree({
  data,
  onNodeClick,
  onAddChild,
  onEdit,
  onDelete,
  onView,
  showActions = true,
  className = ''
}: TreeProps) {
  const [expandedNodes, setExpandedNodes] = useState<Set<number>>(new Set());

  const toggleExpanded = (nodeId: number) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(nodeId)) {
      newExpanded.delete(nodeId);
    } else {
      newExpanded.add(nodeId);
    }
    setExpandedNodes(newExpanded);
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedNodes.has(node.id);
    const hasChildren = node.children && node.children.length > 0;

    return (
      <div key={node.id} className="select-none">
        <div
          className={`
            flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer
            ${depth > 0 ? 'ml-4' : ''}
          `}
          style={{ paddingLeft: `${depth * 20 + 8}px` }}
        >
          <div className="flex items-center flex-1" onClick={() => onNodeClick?.(node)}>
            {hasChildren ? (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpanded(node.id);
                }}
                className="mr-2 p-1 hover:bg-gray-200 rounded"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
            ) : (
              <div className="w-6 mr-2" />
            )}
            
            <div className="flex-1">
              <div className="font-medium text-gray-900">{node.name}</div>
              {node.description && (
                <div className="text-sm text-gray-500">{node.description}</div>
              )}
            </div>
          </div>

          {showActions && (
            <div className="flex items-center space-x-1">
              {onView && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onView(node);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              )}
              
              {onEdit && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit(node);
                  }}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              
              {onAddChild && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddChild(node.id);
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
              
              {onDelete && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete(node);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
        </div>

        {hasChildren && isExpanded && (
          <div>
            {node.children!.map((child) => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <Card className={`p-4 ${className}`}>
      <div className="space-y-1">
        {data.map((node) => renderNode(node))}
      </div>
    </Card>
  );
}

// Breadcrumb component for navigation
interface BreadcrumbProps {
  items: TreeNode[];
  onItemClick?: (node: TreeNode) => void;
  className?: string;
}

export function Breadcrumb({ items, onItemClick, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`}>
      {items.map((item, index) => (
        <React.Fragment key={item.id}>
          <button
            onClick={() => onItemClick?.(item)}
            className="text-blue-600 hover:text-blue-800 hover:underline"
          >
            {item.name}
          </button>
          {index < items.length - 1 && (
            <span className="text-gray-400">/</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

// Tree navigation component
interface TreeNavigationProps {
  currentPath: TreeNode[];
  onNavigate: (node: TreeNode) => void;
  className?: string;
}

export function TreeNavigation({ currentPath, onNavigate, className = '' }: TreeNavigationProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Breadcrumb items={currentPath} onItemClick={onNavigate} />
    </div>
  );
}
