'use client';

import { useParams, useRouter } from 'next/navigation';
import { useVendorById } from '@/hooks/useApi';
import { 
  ArrowLeft, Edit, Trash2, Building2, Phone, Mail, MapPin, 
  Star, Package, CreditCard, FileText, Calendar, Tag
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function VendorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const vendorId = parseInt(params.id as string);

  const { data: vendor, isLoading, error } = useVendorById(vendorId);

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
  if (error || !vendor) return <div className="text-red-600">Error loading vendor</div>;

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
            <h1 className="text-3xl font-bold text-gray-900">{vendor.data.name}</h1>
            <p className="text-gray-600 mt-1">Vendor Details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href={`/vendors/${vendorId}/edit`}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit className="h-5 w-5 mr-2" />
            Edit Vendor
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Building2 className="h-5 w-5 mr-2" />
              Basic Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vendor Name</label>
                <p className="text-gray-900">{vendor.data.name}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Business Type</label>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {vendor.data.business_type_display}
                </span>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
                <p className="text-gray-900">{vendor.data.contact_person || 'Not specified'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  vendor.data.is_active 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {vendor.data.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {vendor.data.rating && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {getRatingStars(vendor.data.rating)}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{vendor.data.rating_display}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {vendor.data.email && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="flex items-center text-gray-900">
                    <Mail className="h-4 w-4 mr-2" />
                    <a href={`mailto:${vendor.data.email}`} className="text-blue-600 hover:text-blue-800">
                      {vendor.data.email}
                    </a>
                  </div>
                </div>
              )}
              {vendor.data.phone && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="flex items-center text-gray-900">
                    <Phone className="h-4 w-4 mr-2" />
                    <a href={`tel:${vendor.data.phone}`} className="text-blue-600 hover:text-blue-800">
                      {vendor.data.phone}
                    </a>
                  </div>
                </div>
              )}
              {vendor.data.address && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <div className="flex items-start text-gray-900">
                    <MapPin className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <div>
                      <p>{vendor.data.address}</p>
                      {vendor.data.city && vendor.data.state && (
                        <p>{vendor.data.city}, {vendor.data.state} {vendor.data.postal_code}</p>
                      )}
                      {vendor.data.country && <p>{vendor.data.country}</p>}
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
              {vendor.data.services_provided && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Services/Products Provided</label>
                  <div className="flex items-start text-gray-900">
                    <Package className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="whitespace-pre-line">{vendor.data.services_provided}</p>
                  </div>
                </div>
              )}
              {vendor.data.payment_terms && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Terms</label>
                  <div className="flex items-center text-gray-900">
                    <CreditCard className="h-4 w-4 mr-2" />
                    {vendor.data.payment_terms}
                  </div>
                </div>
              )}
              {vendor.data.tax_id && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tax ID</label>
                  <div className="flex items-center text-gray-900">
                    <Tag className="h-4 w-4 mr-2" />
                    {vendor.data.tax_id}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Notes */}
          {vendor.data.notes && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Notes
              </h2>
              <p className="text-gray-700 whitespace-pre-line">{vendor.data.notes}</p>
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
                <span className="text-sm text-gray-600">Business Type</span>
                <span className="text-sm font-medium text-gray-900">{vendor.data.business_type_display}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Status</span>
                <span className={`text-sm font-medium ${
                  vendor.data.is_active ? 'text-green-600' : 'text-red-600'
                }`}>
                  {vendor.data.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
              {vendor.data.rating && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Rating</span>
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {getRatingStars(vendor.data.rating)}
                    </div>
                    <span className="ml-2 text-sm font-medium text-gray-900">
                      {vendor.data.rating}/5
                    </span>
                  </div>
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
                  {new Date(vendor.data.created_at).toLocaleDateString('en-US', {
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
                  {new Date(vendor.data.updated_at).toLocaleDateString('en-US', {
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
