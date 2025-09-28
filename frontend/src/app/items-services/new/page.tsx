'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCreateItemService, useVendors } from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { Vendor } from '@/lib/api';
import { ArrowLeft, Save, X, Package } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function NewItemServicePage() {
  const router = useRouter();
  const createItemService = useCreateItemService();
  const { data: vendorsData } = useVendors();
  const vendors = extractApiData<Vendor>(vendorsData);

  const [formData, setFormData] = useState({
    vendor: '',
    name: '',
    description: '',
    item_type: 'product',
    unit: '',
    unit_price: '',
    currency: 'BDT',
    stock_quantity: '',
    minimum_stock: '',
    is_active: true,
    is_available: true,
    specifications: '',
    usage_instructions: '',
    storage_requirements: '',
    expiry_date: '',
    tax_rate: '',
    discount_percentage: '',
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
        vendor: formData.vendor ? parseInt(formData.vendor) : null,
        unit_price: formData.unit_price ? parseFloat(formData.unit_price) : null,
        stock_quantity: formData.stock_quantity ? parseFloat(formData.stock_quantity) : null,
        minimum_stock: formData.minimum_stock ? parseFloat(formData.minimum_stock) : null,
        expiry_date: formData.expiry_date || null,
        tax_rate: formData.tax_rate ? parseFloat(formData.tax_rate) : null,
        discount_percentage: formData.discount_percentage ? parseFloat(formData.discount_percentage) : null,
      };

      await createItemService.mutateAsync(submitData);
      router.push('/items-services');
    } catch (error) {
      toast.error('Failed to create item/service');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/items-services');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center space-x-4">
          <Link
            href="/items-services"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Items & Services
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Add New Item/Service</h1>
            <p className="text-gray-600 mt-1">Create a new item or service record</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Basic Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., Premium Fish Feed"
              />
            </div>

            <div>
              <label htmlFor="item_type" className="block text-sm font-medium text-gray-700 mb-2">
                Type *
              </label>
              <select
                id="item_type"
                name="item_type"
                required
                value={formData.item_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
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
              <label htmlFor="vendor" className="block text-sm font-medium text-gray-700 mb-2">
                Vendor
              </label>
              <select
                id="vendor"
                name="vendor"
                value={formData.vendor}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="">Select a vendor (optional)</option>
                {vendors.map((vendor) => (
                  <option key={vendor.id} value={vendor.id}>
                    {vendor.name}
                  </option>
                ))}
              </select>
            </div>


            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unit
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., kg, liter, piece"
              />
            </div>

            <div>
              <label htmlFor="currency" className="block text-sm font-medium text-gray-700 mb-2">
                Currency
              </label>
              <select
                id="currency"
                name="currency"
                value={formData.currency}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              >
                <option value="BDT">BDT (৳)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
              </select>
            </div>

            <div className="md:col-span-2 flex items-center space-x-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_active"
                  name="is_active"
                  checked={formData.is_active}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_active" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="is_available"
                  name="is_available"
                  checked={formData.is_available}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="is_available" className="ml-2 block text-sm text-gray-900">
                  Available
                </label>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Detailed description of the item or service..."
            />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Inventory</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="unit_price" className="block text-sm font-medium text-gray-700 mb-2">
                Unit Price
              </label>
              <input
                type="number"
                id="unit_price"
                name="unit_price"
                min="0"
                step="0.01"
                value={formData.unit_price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 50.00"
              />
            </div>

            <div>
              <label htmlFor="stock_quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                min="0"
                step="0.001"
                value={formData.stock_quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 100"
              />
            </div>

            <div>
              <label htmlFor="minimum_stock" className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Stock Level
              </label>
              <input
                type="number"
                id="minimum_stock"
                name="minimum_stock"
                min="0"
                step="0.001"
                value={formData.minimum_stock}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 10"
              />
            </div>

            <div>
              <label htmlFor="tax_rate" className="block text-sm font-medium text-gray-700 mb-2">
                Tax Rate (%)
              </label>
              <input
                type="number"
                id="tax_rate"
                name="tax_rate"
                min="0"
                max="100"
                step="0.01"
                value={formData.tax_rate}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 15.00"
              />
            </div>

            <div>
              <label htmlFor="discount_percentage" className="block text-sm font-medium text-gray-700 mb-2">
                Discount (%)
              </label>
              <input
                type="number"
                id="discount_percentage"
                name="discount_percentage"
                min="0"
                max="100"
                step="0.01"
                value={formData.discount_percentage}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 5.00"
              />
            </div>

            <div>
              <label htmlFor="expiry_date" className="block text-sm font-medium text-gray-700 mb-2">
                Expiry Date
              </label>
              <input
                type="date"
                id="expiry_date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 bg-white"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h2>
          
          <div className="space-y-6">
            <div>
              <label htmlFor="specifications" className="block text-sm font-medium text-gray-700 mb-2">
                Technical Specifications
              </label>
              <textarea
                id="specifications"
                name="specifications"
                rows={3}
                value={formData.specifications}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Technical specifications..."
              />
            </div>

            <div>
              <label htmlFor="usage_instructions" className="block text-sm font-medium text-gray-700 mb-2">
                Usage Instructions
              </label>
              <textarea
                id="usage_instructions"
                name="usage_instructions"
                rows={3}
                value={formData.usage_instructions}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="How to use this item/service..."
              />
            </div>

            <div>
              <label htmlFor="storage_requirements" className="block text-sm font-medium text-gray-700 mb-2">
                Storage Requirements
              </label>
              <textarea
                id="storage_requirements"
                name="storage_requirements"
                rows={3}
                value={formData.storage_requirements}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="Storage requirements..."
              />
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
                placeholder="Any additional notes..."
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
            {isSubmitting ? 'Creating...' : 'Create Item/Service'}
          </button>
        </div>
      </form>
    </div>
  );
}
