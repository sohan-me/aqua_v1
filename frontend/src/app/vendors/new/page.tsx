'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateVendor } from '@/hooks/useApi';
import { ArrowLeft, Save, X, Building2 } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewVendorPage() {
  const router = useRouter();
  const createVendor = useCreateVendor();

  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'Bangladesh',
    postal_code: '',
    business_type: 'supplier',
    services_provided: '',
    payment_terms: '',
    tax_id: '',
    is_active: true,
    rating: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        rating: formData.rating ? parseInt(formData.rating) : null,
      };

      await createVendor.mutateAsync(submitData);
      router.push('/vendors');
    } catch (error) {
      toast.error('Failed to create vendor');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/vendors');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/vendors"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Vendors
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Vendor</h1>
            <p className="text-gray-600 mt-1">Create a new vendor or supplier record</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Building2 className="h-5 w-5 mr-2" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Vendor Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., ABC Feed Company"
              />
            </div>

            <div>
              <label htmlFor="business_type" className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                id="business_type"
                name="business_type"
                required
                value={formData.business_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="supplier">Supplier</option>
                <option value="manufacturer">Manufacturer</option>
                <option value="distributor">Distributor</option>
                <option value="service_provider">Service Provider</option>
                <option value="consultant">Consultant</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700 mb-2">
                Contact Person
              </label>
              <input
                type="text"
                id="contact_person"
                name="contact_person"
                value={formData.contact_person}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., John Smith"
              />
            </div>

            <div>
              <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
                Rating
              </label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">No Rating</option>
                <option value="1">Poor</option>
                <option value="2">Fair</option>
                <option value="3">Good</option>
                <option value="4">Very Good</option>
                <option value="5">Excellent</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-center">
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                Active Vendor
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., contact@company.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., +880 1234 567890"
              />
            </div>

            <div className="md:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Address
              </label>
              <textarea
                id="address"
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Street address, building number, etc."
              />
            </div>

            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., Dhaka"
              />
            </div>

            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                State/Province
              </label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., Dhaka"
              />
            </div>

            <div>
              <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., Bangladesh"
              />
            </div>

            <div>
              <label htmlFor="postal_code" className="block text-sm font-medium text-gray-700 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 1000"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="services_provided" className="block text-sm font-medium text-gray-700 mb-2">
                Services/Products Provided
              </label>
              <textarea
                id="services_provided"
                name="services_provided"
                rows={4}
                value={formData.services_provided}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Describe the services or products this vendor provides..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="payment_terms" className="block text-sm font-medium text-gray-700 mb-2">
                  Payment Terms
                </label>
                <input
                  type="text"
                  id="payment_terms"
                  name="payment_terms"
                  value={formData.payment_terms}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="e.g., Net 30, Cash on Delivery"
                />
              </div>

              <div>
                <label htmlFor="tax_id" className="block text-sm font-medium text-gray-700 mb-2">
                  Tax ID / Registration Number
                </label>
                <input
                  type="text"
                  id="tax_id"
                  name="tax_id"
                  value={formData.tax_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                  placeholder="e.g., VAT-123456789"
                />
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                Additional Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Any additional notes about this vendor..."
              />
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md shadow-sm text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Vendor'}
          </button>
        </div>
      </form>
    </div>
  );
}
