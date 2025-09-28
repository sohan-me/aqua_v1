'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useIncomeById, useUpdateIncome, usePonds, useIncomeTypes } from '@/hooks/useApi';
import { extractApiData } from '@/lib/utils';
import { Pond, IncomeType } from '@/lib/api';
import { ArrowLeft, Save, X, DollarSign, Receipt, Users } from 'lucide-react';
import { toast } from 'sonner';

export default function EditIncomePage() {
  const params = useParams();
  const router = useRouter();
  const incomeId = parseInt(params.id as string);
  
  const { data: income, isLoading: incomeLoading } = useIncomeById(incomeId);
  const { data: pondsData } = usePonds();
  const { data: incomeTypesData } = useIncomeTypes();
  const updateIncome = useUpdateIncome();
  
  const ponds = extractApiData<Pond>(pondsData);
  const incomeTypes = extractApiData<IncomeType>(incomeTypesData);

  const [formData, setFormData] = useState({
    pond: '',
    income_type: '',
    date: '',
    amount: '',
    quantity: '',
    unit: '',
    customer: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Populate form when income data loads
  useEffect(() => {
    if (income) {
      setFormData({
        pond: income.data.pond?.toString() || '',
        income_type: income.data.income_type?.toString() || '',
        date: income.data.date || '',
        amount: income.data.amount || '',
        quantity: income.data.quantity || '',
        unit: income.data.unit || '',
        customer: income.data.customer || '',
        notes: income.data.notes || ''
      });
    }
  }, [income]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        pond: formData.pond ? parseInt(formData.pond) : null,
        income_type: parseInt(formData.income_type),
        date: formData.date,
        amount: parseFloat(formData.amount),
        quantity: formData.quantity ? parseFloat(formData.quantity) : null,
        unit: formData.unit,
        customer: formData.customer,
        notes: formData.notes
      };

      await updateIncome.mutateAsync({ id: incomeId, data: submitData });
      router.push('/income');
    } catch (error) {
      toast.error('Failed to update income record');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/income');
  };

  if (incomeLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!income) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Income Record Not Found</h2>
        <p className="text-gray-600 mb-6">The income record you&apos;re looking for doesn&apos;t exist.</p>
        <button
          onClick={() => router.push('/income')}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Income
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>
        
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Edit Income Record</h1>
            <p className="text-gray-600 mt-1">
              {income.data.income_type_name} - {income.data.date}
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="income_type" className="block text-sm font-medium text-gray-700 mb-2">
                Income Type *
              </label>
              <select
                id="income_type"
                name="income_type"
                required
                value={formData.income_type}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              >
                <option value="">Select income type</option>
                {incomeTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name} ({type.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="pond" className="block text-sm font-medium text-gray-700 mb-2">
                Pond (Optional)
              </label>
              <select
                id="pond"
                name="pond"
                value={formData.pond}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              >
                <option value="">Select a pond (optional)</option>
                {ponds.map((pond) => (
                  <option key={pond.id} value={pond.id}>
                    {pond.name} ({pond.area_decimal} decimal)
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Income Date *
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              />
            </div>

            <div>
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
                Amount (৳) *
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                required
                min="0.01"
                step="0.01"
                value={formData.amount}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 500.00"
              />
            </div>
          </div>
        </div>

        {/* Quantity and Unit */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Receipt className="h-5 w-5 mr-2 text-blue-600" />
            Quantity & Unit Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                Quantity (Optional)
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="0"
                step="0.01"
                value={formData.quantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., 50"
              />
            </div>

            <div>
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700 mb-2">
                Unit (Optional)
              </label>
              <input
                type="text"
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
                placeholder="e.g., kg, pieces, feet"
              />
            </div>
          </div>
        </div>

        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 mr-2 text-blue-600" />
            Customer Information
          </h2>
          
          <div>
            <label htmlFor="customer" className="block text-sm font-medium text-gray-700 mb-2">
              Customer (Optional)
            </label>
            <input
              type="text"
              id="customer"
              name="customer"
              value={formData.customer}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              placeholder="e.g., Local Market, Restaurant Chain"
            />
          </div>
        </div>

        {/* Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
          <div>
            <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
              Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              rows={4}
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder-gray-500 bg-white"
              placeholder="Record any additional information about this income..."
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <X className="h-4 w-4 mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ color: 'white !important' }}
          >
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Updating...' : 'Update Income Record'}
          </button>
        </div>
      </form>
    </div>
  );
}
