'use client';

import { useParams, useRouter } from 'next/navigation';
import { useCustomerById } from '@/hooks/useApi';
import { 
  ArrowLeft, Edit, Trash2, User, Phone, Mail, MapPin, 
  Star, Building, CreditCard, FileText, Calendar, DollarSign
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function CustomerDetailPage() {
  const params = useParams();
  const router = useRouter();
  const customerId = parseInt(params.id as string);

  const { data: customer, isLoading, error } = useCustomerById(customerId);

  const getRatingStars = (rating: number | null) => {
    if (!rating) return null;
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;
  if (error || !customer) return <div className="text-red-600">Error loading customer</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{customer.data.name}</h1>
            {customer.data.business_name && (
              <p className="text-lg text-gray-600">{customer.data.business_name}</p>
            )}
            <p className="text-gray-600 mt-1">Customer Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href={`/customers/${customerId}/edit`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Customer
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="h-5 w-5 mr-2" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
                <p className="text-gray-900">{customer.data.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Customer Type</label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  {customer.data.customer_type_display}
                </span>
              </div>
              {customer.data.business_name && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
                  <p className="text-gray-900">{customer.data.business_name}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <p className="text-gray-900">{customer.data.contact_person || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  customer.data.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {customer.data.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {customer.data.rating && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {getRatingStars(customer.data.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{customer.data.rating_display}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {customer.data.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center text-gray-900">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${customer.data.email}`} className="text-blue-600 hover:text-blue-800">
                      {customer.data.email}
                    </a>
                  </div>
                </div>
              )}
              {customer.data.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex items-center text-gray-900">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${customer.data.phone}`} className="text-blue-600 hover:text-blue-800">
                      {customer.data.phone}
                    </a>
                  </div>
                </div>
              )}
              {customer.data.address && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="flex items-start text-gray-900">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{customer.data.address}</p>
                      {customer.data.city && customer.data.state && (
                        <p>{customer.data.city}, {customer.data.state} {customer.data.postal_code}</p>
                      )}
                      {customer.data.country && <p>{customer.data.country}</p>}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Business Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h2>
            <div className="space-y-4">
              {customer.data.payment_terms && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <div className="flex items-center text-gray-900">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {customer.data.payment_terms}
                  </div>
                </div>
              )}
              {customer.data.credit_limit && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Credit Limit</label>
                  <div className="flex items-center text-gray-900">
                    <DollarSign className="h-4 w-4 mr-2" />
                    ৳{parseFloat(customer.data.credit_limit).toLocaleString()}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {customer.data.notes && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notes
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{customer.data.notes}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Customer Type</span>
                <span className="text-sm font-medium text-gray-900">{customer.data.customer_type_display}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`text-sm font-medium ${
                  customer.data.is_active ? 'text-green-600' : 'text-red-600'
                }`}>
                  {customer.data.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {customer.data.rating && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {getRatingStars(customer.data.rating)}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {customer.data.rating}/5
                    </span>
                  </div>
                </div>
              )}
              {customer.data.credit_limit && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Credit Limit</span>
                  <span className="text-sm font-medium text-gray-900">
                    ৳{parseFloat(customer.data.credit_limit).toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Timeline
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium text-gray-900">Created</p>
                <p className="text-sm text-gray-600">
                  {new Date(customer.data.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Last Updated</p>
                <p className="text-sm text-gray-600">
                  {new Date(customer.data.updated_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
