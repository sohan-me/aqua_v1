'use client';

import { useState } from 'react';
import { useItemServices, useDeleteItemService } from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { ItemService } from '@/lib/api';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  Package, DollarSign, AlertTriangle, Calendar, Building2,
  ShoppingCart, Wrench, Pill, Box
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ItemsServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: itemsData, isLoading, error } = useItemServices();
  const deleteItemService = useDeleteItemService();

  const items = extractApiData<ItemService>(itemsData);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      try {
        await deleteItemService.mutateAsync(id);
      } catch (error) {
        toast.error('Failed to delete item/service');
      }
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.vendor_name && item.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesType = filterType === 'all' || item.item_type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && item.is_active) ||
                         (filterStatus === 'inactive' && !item.is_active) ||
                         (filterStatus === 'available' && item.is_available) ||
                         (filterStatus === 'unavailable' && !item.is_available);

    return matchesSearch && matchesType && matchesStatus;
  });

  const getItemTypeIcon = (type: string) => {
    const icons = {
      product: Package,
      service: ShoppingCart,
      equipment: Wrench,
      feed: Package,
      medicine: Pill,
      chemical: Box,
      other: Box,
    };
    return icons[type as keyof typeof icons] || Box;
  };

  const getItemTypeColor = (type: string) => {
    const colors = {
      product: 'bg-blue-100 text-blue-800',
      service: 'bg-green-100 text-green-800',
      equipment: 'bg-purple-100 text-purple-800',
      feed: 'bg-orange-100 text-orange-800',
      medicine: 'bg-red-100 text-red-800',
      chemical: 'bg-yellow-100 text-yellow-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const isLowStock = (item: ItemService) => {
    if (!item.stock_quantity || !item.minimum_stock) return false;
    return parseFloat(item.stock_quantity) <= parseFloat(item.minimum_stock);
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-600">Error loading items/services</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Items & Services</h1>
          <p className="text-gray-600 mt-1">Manage your inventory of products and services</p>
        </div>
        <Link
          href="/items-services/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Item/Service
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search items/services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="product">Product</option>
              <option value="service">Service</option>
              <option value="equipment">Equipment</option>
              <option value="feed">Feed</option>
              <option value="medicine">Medicine</option>
              <option value="chemical">Chemical</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredItems.map((item) => {
          const ItemIcon = getItemTypeIcon(item.item_type);
          return (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                    <ItemIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getItemTypeColor(item.item_type)}`}>
                      {item.item_type_display}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end space-y-1 ml-2">
                  {item.is_active ? (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Inactive
                    </span>
                  )}
                  {isLowStock(item) && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                      Low Stock
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              {item.description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
              )}

              {/* Information Grid */}
              <div className="space-y-2 mb-4">
                {/* Vendor */}
                {item.vendor_name && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">{item.vendor_name}</span>
                  </div>
                )}

                {/* Price */}
                {item.unit_price && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{item.currency} {parseFloat(item.unit_price).toLocaleString()} per {item.unit}</span>
                  </div>
                )}

                {/* Stock */}
                {item.stock_quantity && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Package className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Stock: {parseFloat(item.stock_quantity).toLocaleString()} {item.unit}</span>
                  </div>
                )}

                {/* Expiry Date */}
                {item.expiry_date && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>Expires: {new Date(item.expiry_date).toLocaleDateString()}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-gray-200 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2">
                  <Link
                    href={`/items-services/${item.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50"
                    title="View Details"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link
                    href={`/items-services/${item.id}/edit`}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors rounded-md hover:bg-green-50"
                    title="Edit Item/Service"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(item.id, item.name)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors rounded-md hover:bg-red-50"
                    title="Delete Item/Service"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500">
                  Created {new Date(item.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No items/services found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Get started by creating your first item or service.'}
          </p>
          {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
            <div className="mt-6">
              <Link
                href="/items-services/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Item/Service
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
