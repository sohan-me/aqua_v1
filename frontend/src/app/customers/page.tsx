'use client';

import { useState } from 'react';
import { useCustomers, useDeleteCustomer } from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { Customer } from '@/lib/api';
import { 
  Plus, Search, Filter, Edit, Trash2, Eye, 
  User, Phone, Mail, MapPin, Star,
  Users, Building, CreditCard, DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const { data: customersData, isLoading, error } = useCustomers();
  const deleteCustomer = useDeleteCustomer();

  const customers = extractApiData<Customer>(customersData);

  const handleDelete = async (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete customer "${name}"?`)) {
      try {
        await deleteCustomer.mutateAsync(id);
      } catch (error) {
        toast.error('Failed to delete customer');
      }
    }
  };

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.contact_person.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || customer.customer_type === filterType;
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && customer.is_active) ||
                         (filterStatus === 'inactive' && !customer.is_active);

    return matchesSearch && matchesType && matchesStatus;
  });

  const getCustomerTypeColor = (type: string) => {
    const colors = {
      individual: 'bg-blue-100 text-blue-800',
      retailer: 'bg-green-100 text-green-800',
      wholesaler: 'bg-purple-100 text-purple-800',
      restaurant: 'bg-orange-100 text-orange-800',
      hotel: 'bg-indigo-100 text-indigo-800',
      distributor: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800',
    };
    return colors[type as keyof typeof colors] || colors.other;
  };

  const getRatingStars = (rating: number | null) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error) return <div className="text-red-600">Error loading customers</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customers and buyers</p>
        </div>
        <Link
          href="/customers/new"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Customer
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Customer Type</label>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="individual">Individual</option>
              <option value="retailer">Retailer</option>
              <option value="wholesaler">Wholesaler</option>
              <option value="restaurant">Restaurant</option>
              <option value="hotel">Hotel</option>
              <option value="distributor">Distributor</option>
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
            </select>
          </div>
        </div>
      </div>

      {/* Customers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{customer.name}</h3>
                  {customer.business_name && (
                    <p className="text-sm text-gray-600">{customer.business_name}</p>
                  )}
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCustomerTypeColor(customer.customer_type)}`}>
                    {customer.customer_type_display}
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {customer.is_active ? (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Inactive
                  </span>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-2 mb-4">
              {customer.contact_person && (
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  {customer.contact_person}
                </div>
              )}
              {customer.email && (
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="h-4 w-4 mr-2" />
                  {customer.email}
                </div>
              )}
              {customer.phone && (
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  {customer.phone}
                </div>
              )}
              {customer.address && (
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {customer.city && customer.state ? `${customer.city}, ${customer.state}` : customer.address}
                </div>
              )}
            </div>

            {/* Rating */}
            {customer.rating && (
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {getRatingStars(customer.rating)}
                </div>
                <span className="ml-2 text-sm text-gray-600">{customer.rating_display}</span>
              </div>
            )}

            {/* Business Info */}
            <div className="space-y-2 mb-4">
              {customer.payment_terms && (
                <div className="flex items-center text-sm text-gray-600">
                  <CreditCard className="h-4 w-4 mr-2" />
                  {customer.payment_terms}
                </div>
              )}
              {customer.credit_limit && (
                <div className="flex items-center text-sm text-gray-600">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Credit Limit: ৳{parseFloat(customer.credit_limit).toLocaleString()}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Link
                  href={`/customers/${customer.id}`}
                  className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  title="View Details"
                >
                  <Eye className="h-4 w-4" />
                </Link>
                <Link
                  href={`/customers/${customer.id}/edit`}
                  className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  title="Edit Customer"
                >
                  <Edit className="h-4 w-4" />
                </Link>
                <button
                  onClick={() => handleDelete(customer.id, customer.name)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  title="Delete Customer"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <span className="text-xs text-gray-500">
                Created {new Date(customer.created_at).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredCustomers.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No customers found</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filterType !== 'all' || filterStatus !== 'all'
              ? 'Try adjusting your search or filters.'
              : 'Get started by creating your first customer.'}
          </p>
          {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
            <div className="mt-6">
              <Link
                href="/customers/new"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="h-5 w-5 mr-2" />
                Add Customer
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
