import axios from 'axios';

import { API_CONFIG } from '@/config/api';

// API Configuration
const API_BASE_URL = API_CONFIG.BASE_URL;

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Pagination Types
export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface PaginationParams {
  page?: number;
  page_size?: number;
}

// API Types
export interface Species {
  id: number;
  user: number;
  user_username: string;
  name: string;
  scientific_name: string;
  description: string;
  optimal_temp_min?: number;
  optimal_temp_max?: number;
  optimal_ph_min?: number;
  optimal_ph_max?: number;
  parent?: number;
  parent_name?: string;
  children?: Species[];
  level: number;
  lft: number;
  rght: number;
  tree_id: number;
  created_at: string;
}

export interface Pond {
  id: number;
  name: string;
  area_decimal: string;
  depth_ft: string;
  volume_m3: string;
  location: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  user_username: string;
}

export interface MedicalDiagnostic {
  id: number;
  pond: number;
  pond_name: string;
  pond_area: string;
  pond_location: string;
  disease_name: string;
  confidence_percentage: string;
  recommended_treatment: string;
  dosage_application: string;
  selected_organs: any[];
  selected_symptoms: any[];
  notes: string;
  is_applied: boolean;
  applied_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Stocking {
  stocking_id: number;
  pond: number;
  species: number;
  date: string;
  pcs: number;
  total_weight_kg: string;
  cost: string | null;
  pieces_per_kg: string | null;
  initial_avg_weight_kg: string;
  pieces_per_kg_display?: string;
  initial_avg_weight_kg_display?: string;
  notes: string;
  created_at: string;
  pond_name: string;
  species_name: string;
}

export interface SampleType {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  is_active: boolean;
  created_at: string;
}

export interface Sampling {
  id: number;
  pond: number;
  date: string;
  sample_type: number;
  ph: string;
  temperature_c: string;
  dissolved_oxygen: string;
  ammonia: string;
  nitrite: string;
  nitrate: string;
  alkalinity: string;
  hardness: string;
  turbidity: string;
  fish_weight_g: string;
  fish_length_cm: string;
  notes: string;
  created_at: string;
  pond_name: string;
  sample_type_name: string;
  sample_type_icon: string;
  sample_type_color: string;
}

export interface Feed {
  id: number;
  pond: number;
  feed_type: number;
  date: string;
  amount_kg: string;
  feeding_time: string;
  packet_size_kg: string | null;
  cost_per_packet: string | null;
  cost_per_kg: string | null;
  total_cost: string | null;
  consumption_rate_kg_per_day: string | null;
  biomass_at_feeding_kg: string | null;
  feeding_rate_percent: string | null;
  notes: string;
  created_at: string;
  pond_name: string;
  feed_type_name: string;
}

export interface InventoryFeed {
  id: number;
  feed_type: number;
  quantity_kg: string;
  unit_price: string;
  expiry_date: string;
  supplier: string;
  batch_number: string;
  notes: string;
  created_at: string;
  updated_at: string;
  feed_type_name: string;
}

export interface FeedingBand {
  id: number;
  name: string;
  min_weight_g: string;
  max_weight_g: string;
  feeding_rate_percent: string;
  frequency_per_day: number;
  notes: string;
  created_at: string;
}

export interface Mortality {
  id: number;
  pond: number;
  date: string;
  count: number;
  avg_weight_g: string;
  cause: string;
  notes: string;
  created_at: string;
  pond_name: string;
}

export interface ExpenseType {
  id: number;
  name: string;
  category: string;
  description: string;
  parent?: number;
  parent_name?: string;
  children?: ExpenseType[];
  level: number;
  lft: number;
  rght: number;
  tree_id: number;
  created_at: string;
}

export interface IncomeType {
  id: number;
  name: string;
  category: string;
  description: string;
  parent?: number;
  parent_name?: string;
  children?: IncomeType[];
  level: number;
  lft: number;
  rght: number;
  tree_id: number;
  created_at: string;
}

export interface Expense {
  id: number;
  user: number;
  pond: number | null;
  expense_type: number;
  date: string;
  amount: string;
  quantity: string | null;
  unit: string;
  supplier: string;
  notes: string;
  created_at: string;
  user_username: string;
  pond_name: string;
  expense_type_name: string;
}

export interface Income {
  id: number;
  user: number;
  pond: number | null;
  income_type: number;
  date: string;
  amount: string;
  quantity: string | null;
  unit: string;
  customer: string;
  notes: string;
  created_at: string;
  user_username: string;
  pond_name: string;
  income_type_name: string;
}

export interface FeedType {
  id: number;
  name: string;
  protein_content: string | null;
  description: string;
  parent?: number;
  parent_name?: string;
  children?: FeedType[];
  level: number;
  lft: number;
  rght: number;
  tree_id: number;
  user: number;
  user_username?: string;
  created_at: string;
}

export interface AccountType {
  id: number;
  name: string;
  type: 'expense' | 'income' | 'loan' | 'bank' | 'equity' | 'credit_card' | 'others';
  type_display?: string;
  description: string;
  parent?: number;
  parent_name?: string;
  children?: AccountType[];
  level: number;
  lft: number;
  rght: number;
  tree_id: number;
  user: number;
  user_username?: string;
  created_at: string;
}

export interface FeedingBand {
  id: number;
  name: string;
  min_weight_g: string;
  max_weight_g: string;
  feeding_rate_percent: string;
  frequency_per_day: number;
  notes: string;
  created_at: string;
}

export interface Alert {
  id: number;
  pond: number;
  alert_type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  is_resolved: boolean;
  resolved_at: string | null;
  resolved_by: number | null;
  created_at: string;
  pond_name: string;
  resolved_by_username: string;
}

export interface FishSampling {
  id: number;
  pond: number;
  species: number | null;
  user: number;
  date: string;
  sample_size: number;
  total_weight_kg: string;
  average_weight_kg: string;
  fish_per_kg: string;
  growth_rate_kg_per_day: string | null;
  biomass_difference_kg: string | null;
  condition_factor: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
  pond_name: string;
  species_name: string | null;
  user_username: string;
}

export interface FeedingAdvice {
  id: number;
  pond: number;
  user: number;
  date: string;
  estimated_fish_count: number;
  average_fish_weight_kg: string;
  total_biomass_kg: string;
  recommended_feed_kg: string;
  feeding_rate_percent: string;
  feeding_frequency: number;
  water_temp_c: string | null;
  season: 'spring' | 'summer' | 'autumn' | 'winter';
  feed_type: number | null;
  feed_cost_per_kg: string | null;
  daily_feed_cost: string | null;
  is_applied: boolean;
  applied_date: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
  pond_name: string;
  user_username: string;
  feed_type_name: string | null;
  medical_considerations: string;
  medical_warnings: string[];
  medical_diagnostics_data: MedicalDiagnostic[];
  analysis_data?: {
    fish_count_analysis: {
      total_stocked: number;
      total_mortality: number;
      recent_mortality_30d: number;
      total_harvested: number;
      current_count: number;
      survival_rate: number;
      mortality_trend: string;
    };
    water_quality_analysis: {
      temperature: number | null;
      ph: number | null;
      dissolved_oxygen: number | null;
      turbidity: number | null;
      ammonia: number | null;
      nitrite: number | null;
      quality_score: number;
      quality_status: string;
    };
    mortality_analysis: {
      total_recent_deaths: number;
      mortality_events: number;
      avg_deaths_per_event: number;
      mortality_trend: string;
      risk_factors: string[];
      causes: Array<{
        cause: string;
        total_deaths: number;
        event_count: number;
      }>;
    };
    feeding_analysis: {
      total_feed_30d: number;
      avg_daily_feed: number;
      feeding_consistency: string;
      feed_efficiency: number;
      cost_analysis: Record<string, any>;
      feed_types_used: Array<{
        feed_type__name: string;
        total_amount: number;
        usage_count: number;
      }>;
    };
    environmental_analysis: {
      season: string;
      temperature_trend: string;
      weather_conditions: string;
      seasonal_factors: string[];
    };
    growth_analysis: {
      growth_rate_kg_per_day: number;
      growth_trend: string;
      weight_gain_90d: number;
      growth_consistency: string;
      growth_quality: string;
    };
    feeding_recommendations: {
      base_rate: number;
      final_rate: number;
      recommended_feed_kg: number;
      feeding_frequency: number;
      protein_requirement: number;
      pellet_size: string;
      feeding_stage: string;
      pcs_per_kg: number;
      feeding_times: string;
      feeding_split: string;
      adjustments: {
        water_quality: number;
        temperature: number;
        mortality: number;
        growth: number;
        seasonal: number;
        feeding_consistency: number;
        total_adjustment: number;
      };
      total_biomass_kg: number;
      base_daily_feed_kg: number;
    };
  };
}

export interface BiomassAnalysis {
  summary: {
    total_biomass_gain_kg: number;
    total_biomass_loss_kg: number;
    net_biomass_change_kg: number;
    total_current_biomass_kg: number;
    total_samplings: number;
    samplings_with_biomass_data: number;
  };
  pond_summary: Record<string, {
    total_gain: number;
    total_loss: number;
    net_change: number;
    sampling_count: number;
  }>;
  species_summary: Record<string, {
    total_gain: number;
    total_loss: number;
    net_change: number;
    sampling_count: number;
  }>;
  biomass_changes: Array<{
    id: number;
    pond_name: string;
    species_name: string;
    date: string;
    biomass_difference_kg: number;
    growth_rate_kg_per_day: number | null;
    average_weight_kg: number;
    sample_size: number;
  }>;
  pond_species_biomass: Record<string, {
    initial_biomass: number;
    growth_biomass: number;
    current_biomass: number;
  }>;
  filters_applied: {
    pond_id: string | null;
    species_id: string | null;
    start_date: string | null;
    end_date: string | null;
  };
}

export interface FcrAnalysis {
  summary: {
    total_feed_kg: number;
    total_weight_gain_kg: number;
    overall_fcr: number;
    fcr_status: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
    total_combinations: number;
    date_range: {
      start_date: string;
      end_date: string;
    };
  };
  fcr_data: Array<{
    pond_id: number;
    pond_name: string;
    species_id: number;
    species_name: string;
    start_date: string;
    end_date: string;
    days: number;
    estimated_fish_count: number;
    initial_weight_kg: number;
    final_weight_kg: number;
    weight_gain_per_fish_kg: number;
    total_weight_gain_kg: number;
    total_feed_kg: number;
    avg_daily_feed_kg: number;
    avg_daily_weight_gain_kg: number;
    fcr: number;
    fcr_status: 'Excellent' | 'Good' | 'Needs Improvement' | 'Poor';
    sampling_count: number;
    feeding_days: number;
  }>;
}

export interface DailyLog {
  id: number;
  pond: number;
  date: string;
  weather: string;
  water_temp_c: string | null;
  ph: string | null;
  dissolved_oxygen: string | null;
  ammonia: string | null;
  nitrite: string | null;
  notes: string;
  created_at: string;
  pond_name: string;
}

export interface Harvest {
  id: number;
  pond: number;
  date: string;
  total_weight_kg: string;
  total_count: number | null;
  pieces_per_kg: string | null;
  price_per_kg: string | null;
  avg_weight_kg: string;
  total_revenue: string | null;
  notes: string;
  created_at: string;
  pond_name: string;
  species_name: string;
}

export interface PondSummary {
  id: number;
  name: string;
  user_username: string;
  area_decimal: string;
  depth_ft: string;
  volume_m3: string;
  location: string;
  is_active: boolean;
  latest_stocking: Stocking | null;
  latest_daily_log: DailyLog | null;
  latest_harvest: Harvest | null;
  total_expenses: number;
  total_income: number;
  active_alerts_count: number;
  created_at: string;
  updated_at: string;
}

export interface FinancialSummary {
  total_expenses: number;
  total_income: number;
  profit_loss: number;
  expenses_by_category: Record<string, number>;
  income_by_category: Record<string, number>;
  monthly_trends: Record<string, {
    expenses: number;
    income: number;
    profit_loss: number;
  }>;
}

export interface Vendor {
  id: number;
  user: number;
  user_username?: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  business_type: 'supplier' | 'manufacturer' | 'distributor' | 'service_provider' | 'consultant' | 'other';
  business_type_display?: string;
  services_provided: string;
  payment_terms: string;
  tax_id: string;
  is_active: boolean;
  rating: number | null;
  rating_display?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface Customer {
  id: number;
  user: number;
  user_username?: string;
  name: string;
  contact_person: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  postal_code: string;
  customer_type: 'individual' | 'retailer' | 'wholesaler' | 'restaurant' | 'hotel' | 'distributor' | 'other';
  customer_type_display?: string;
  business_name: string;
  payment_terms: string;
  credit_limit: string | null;
  is_active: boolean;
  rating: number | null;
  rating_display?: string;
  notes: string;
  created_at: string;
  updated_at: string;
}

export interface ItemService {
  id: number;
  user: number;
  user_username?: string;
  vendor: number | null;
  vendor_name?: string;
  feed_type: number | null;
  feed_type_name?: string;
  name: string;
  description: string;
  item_type: 'product' | 'service' | 'equipment' | 'feed' | 'medicine' | 'chemical' | 'other';
  item_type_display?: string;
  category: string;
  unit: string;
  unit_price: string | null;
  currency: string;
  stock_quantity: string | null;
  minimum_stock: string | null;
  is_active: boolean;
  is_available: boolean;
  specifications: string;
  usage_instructions: string;
  storage_requirements: string;
  expiry_date: string | null;
  tax_rate: string | null;
  discount_percentage: string | null;
  notes: string;
  created_at: string;
  updated_at: string;
}

// API Functions
export const apiService = {
  // Authentication
  login: async (username: string, password: string) => {
    const response = await axios.post(`${API_CONFIG.AUTH_URL}/login/`, {
      username,
      password,
    });
    return response.data;
  },

  changePassword: async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    const response = await axios.post(`${API_CONFIG.AUTH_URL}/change-password/`, {
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }, {
      headers: {
        'Authorization': `Token ${localStorage.getItem('authToken')}`,
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  },

  // Species
  getSpecies: (params?: PaginationParams) => api.get<PaginatedResponse<Species>>('/species/', { params }),
  getSpeciesById: (id: number) => api.get<Species>(`/species/${id}/`),
  createSpecies: (data: Partial<Species>) => api.post<Species>('/species/', data),
  updateSpecies: (id: number, data: Partial<Species>) => api.put<Species>(`/species/${id}/`, data),
  deleteSpecies: (id: number) => api.delete(`/species/${id}/`),
  
  // Species Hierarchical
  getSpeciesRoots: () => api.get<Species[]>('/species/roots/'),
  getSpeciesChildren: (id: number) => api.get<Species[]>(`/species/${id}/children/`),
  getSpeciesDescendants: (id: number) => api.get<Species[]>(`/species/${id}/descendants/`),
  getSpeciesAncestors: (id: number) => api.get<Species[]>(`/species/${id}/ancestors/`),

  // Ponds
  getPonds: (params?: PaginationParams) => api.get<PaginatedResponse<Pond>>('/ponds/', { params }),
  getPondById: (id: number) => api.get<Pond>(`/ponds/${id}/`),
  getPondSummary: (id: number) => api.get<PondSummary>(`/ponds/${id}/summary/`),
  getPondFinancialSummary: (id: number) => api.get<FinancialSummary>(`/ponds/${id}/financial_summary/`),
  createPond: (data: Partial<Pond>) => api.post<Pond>('/ponds/', data),
  updatePond: (id: number, data: Partial<Pond>) => api.put<Pond>(`/ponds/${id}/`, data),
  deletePond: (id: number) => api.delete(`/ponds/${id}/`),

  // Stocking
  getStocking: (params?: PaginationParams) => api.get<PaginatedResponse<Stocking>>('/stocking/', { params }),
  getStockingById: (id: number) => api.get<Stocking>(`/stocking/${id}/`),
  createStocking: (data: Partial<Stocking>) => api.post<Stocking>('/stocking/', data),
  updateStocking: (id: number, data: Partial<Stocking>) => api.put<Stocking>(`/stocking/${id}/`, data),
  deleteStocking: (id: number) => api.delete(`/stocking/${id}/`),

  // Daily Logs
  getDailyLogs: (params?: PaginationParams) => api.get<PaginatedResponse<DailyLog>>('/daily-logs/', { params }),
  getDailyLogById: (id: number) => api.get<DailyLog>(`/daily-logs/${id}/`),
  createDailyLog: (data: Partial<DailyLog>) => api.post<DailyLog>('/daily-logs/', data),
  updateDailyLog: (id: number, data: Partial<DailyLog>) => api.put<DailyLog>(`/daily-logs/${id}/`, data),
  deleteDailyLog: (id: number) => api.delete(`/daily-logs/${id}/`),

  // Sample Types
  getSampleTypes: () => api.get<SampleType[]>('/sample-types/'),
  getSampleTypeById: (id: number) => api.get<SampleType>(`/sample-types/${id}/`),
  createSampleType: (data: Partial<SampleType>) => api.post<SampleType>('/sample-types/', data),
  updateSampleType: (id: number, data: Partial<SampleType>) => api.put<SampleType>(`/sample-types/${id}/`, data),
  deleteSampleType: (id: number) => api.delete(`/sample-types/${id}/`),

  // Water Quality Sampling
  getSamplings: (params?: PaginationParams) => api.get<PaginatedResponse<Sampling>>('/sampling/', { params }),
  getSamplingById: (id: number) => api.get<Sampling>(`/sampling/${id}/`),
  createSampling: (data: Partial<Sampling>) => api.post<Sampling>('/sampling/', data),
  updateSampling: (id: number, data: Partial<Sampling>) => api.put<Sampling>(`/sampling/${id}/`, data),
  deleteSampling: (id: number) => api.delete(`/sampling/${id}/`),

  // Mortality Tracking
  getMortalities: (params?: PaginationParams) => api.get<PaginatedResponse<Mortality>>('/mortality/', { params }),
  getMortalityById: (id: number) => api.get<Mortality>(`/mortality/${id}/`),
  createMortality: (data: Partial<Mortality>) => api.post<Mortality>('/mortality/', data),
  updateMortality: (id: number, data: Partial<Mortality>) => api.put<Mortality>(`/mortality/${id}/`, data),
  deleteMortality: (id: number) => api.delete(`/mortality/${id}/`),

  // Feed Types
  getFeedTypes: (params?: PaginationParams) => api.get<PaginatedResponse<FeedType>>('/feed-types/', { params }),
  getFeedTypeById: (id: number) => api.get<FeedType>(`/feed-types/${id}/`),
  createFeedType: (data: Partial<FeedType>) => api.post<FeedType>('/feed-types/', data),
  updateFeedType: (id: number, data: Partial<FeedType>) => api.put<FeedType>(`/feed-types/${id}/`, data),
  deleteFeedType: (id: number) => api.delete(`/feed-types/${id}/`),
  
  // FeedType hierarchical operations
  getFeedTypeRoots: () => api.get<FeedType[]>('/feed-types/roots/'),
  getFeedTypeChildren: (id: number) => api.get<FeedType[]>(`/feed-types/${id}/children/`),
  getFeedTypeDescendants: (id: number) => api.get<FeedType[]>(`/feed-types/${id}/descendants/`),
  getFeedTypeAncestors: (id: number) => api.get<FeedType[]>(`/feed-types/${id}/ancestors/`),

  // Account Types
  getAccountTypes: () => api.get<AccountType[]>('/account-types/'),
  getAccountTypeById: (id: number) => api.get<AccountType>(`/account-types/${id}/`),
  createAccountType: (data: Partial<AccountType>) => api.post<AccountType>('/account-types/', data),
  updateAccountType: (id: number, data: Partial<AccountType>) => api.put<AccountType>(`/account-types/${id}/`, data),
  deleteAccountType: (id: number) => api.delete(`/account-types/${id}/`),
  
  // Account Types hierarchical operations
  getAccountTypeRoots: () => api.get<AccountType[]>('/account-types/roots/'),
  getAccountTypeExpenses: () => api.get<AccountType[]>('/account-types/expenses/'),
  getAccountTypeIncomes: () => api.get<AccountType[]>('/account-types/incomes/'),
  getAccountTypeLoans: () => api.get<AccountType[]>('/account-types/loans/'),
  getAccountTypeBanks: () => api.get<AccountType[]>('/account-types/banks/'),
  getAccountTypeEquity: () => api.get<AccountType[]>('/account-types/equity/'),
  getAccountTypeCreditCards: () => api.get<AccountType[]>('/account-types/credit_cards/'),
  getAccountTypeOthers: () => api.get<AccountType[]>('/account-types/others/'),
  getAccountTypeChildren: (id: number) => api.get<AccountType[]>(`/account-types/${id}/children/`),
  getAccountTypeDescendants: (id: number) => api.get<AccountType[]>(`/account-types/${id}/descendants/`),
  getAccountTypeAncestors: (id: number) => api.get<AccountType[]>(`/account-types/${id}/ancestors/`),

  // Feeds
  getFeeds: (params?: PaginationParams) => api.get<PaginatedResponse<Feed>>('/feeds/', { params }),
  getFeedById: (id: number) => api.get<Feed>(`/feeds/${id}/`),
  createFeed: (data: Partial<Feed>) => api.post<Feed>('/feeds/', data),
  updateFeed: (id: number, data: Partial<Feed>) => api.put<Feed>(`/feeds/${id}/`, data),
  deleteFeed: (id: number) => api.delete(`/feeds/${id}/`),

  // Feed Inventory
  getInventoryFeeds: () => api.get<InventoryFeed[]>('/inventory-feed/'),
  getInventoryFeedById: (id: number) => api.get<InventoryFeed>(`/inventory-feed/${id}/`),
  createInventoryFeed: (data: Partial<InventoryFeed>) => api.post<InventoryFeed>('/inventory-feed/', data),
  updateInventoryFeed: (id: number, data: Partial<InventoryFeed>) => api.put<InventoryFeed>(`/inventory-feed/${id}/`, data),
  deleteInventoryFeed: (id: number) => api.delete(`/inventory-feed/${id}/`),

  // Feeding Bands
  getFeedingBands: () => api.get<FeedingBand[]>('/feeding-bands/'),
  getFeedingBandById: (id: number) => api.get<FeedingBand>(`/feeding-bands/${id}/`),
  createFeedingBand: (data: Partial<FeedingBand>) => api.post<FeedingBand>('/feeding-bands/', data),
  updateFeedingBand: (id: number, data: Partial<FeedingBand>) => api.put<FeedingBand>(`/feeding-bands/${id}/`, data),
  deleteFeedingBand: (id: number) => api.delete(`/feeding-bands/${id}/`),

  // Harvests
  getHarvests: (params?: PaginationParams) => api.get<PaginatedResponse<Harvest>>('/harvests/', { params }),
  getHarvestById: (id: number) => api.get<Harvest>(`/harvests/${id}/`),
  createHarvest: (data: Partial<Harvest>) => api.post<Harvest>('/harvests/', data),
  updateHarvest: (id: number, data: Partial<Harvest>) => api.put<Harvest>(`/harvests/${id}/`, data),
  deleteHarvest: (id: number) => api.delete(`/harvests/${id}/`),

  // Expenses
  getExpenses: (params?: PaginationParams) => api.get<PaginatedResponse<Expense>>('/expenses/', { params }),
  getExpenseById: (id: number) => api.get<Expense>(`/expenses/${id}/`),
  createExpense: (data: Partial<Expense>) => api.post<Expense>('/expenses/', data),
  updateExpense: (id: number, data: Partial<Expense>) => api.put<Expense>(`/expenses/${id}/`, data),
  deleteExpense: (id: number) => api.delete(`/expenses/${id}/`),

  // Income
  getIncomes: (params?: PaginationParams) => api.get<PaginatedResponse<Income>>('/incomes/', { params }),
  getIncomeById: (id: number) => api.get<Income>(`/incomes/${id}/`),
  createIncome: (data: Partial<Income>) => api.post<Income>('/incomes/', data),
  updateIncome: (id: number, data: Partial<Income>) => api.put<Income>(`/incomes/${id}/`, data),
  deleteIncome: (id: number) => api.delete(`/incomes/${id}/`),

  // Expense Types
  getExpenseTypes: () => api.get<ExpenseType[]>('/expense-types/'),
  getExpenseTypeById: (id: number) => api.get<ExpenseType>(`/expense-types/${id}/`),
  createExpenseType: (data: Partial<ExpenseType>) => api.post<ExpenseType>('/expense-types/', data),
  updateExpenseType: (id: number, data: Partial<ExpenseType>) => api.put<ExpenseType>(`/expense-types/${id}/`, data),
  deleteExpenseType: (id: number) => api.delete(`/expense-types/${id}/`),
  
  // Expense Types Hierarchical
  getExpenseTypeRoots: () => api.get<ExpenseType[]>('/expense-types/roots/'),
  getExpenseTypeChildren: (id: number) => api.get<ExpenseType[]>(`/expense-types/${id}/children/`),
  getExpenseTypeDescendants: (id: number) => api.get<ExpenseType[]>(`/expense-types/${id}/descendants/`),
  getExpenseTypeAncestors: (id: number) => api.get<ExpenseType[]>(`/expense-types/${id}/ancestors/`),

  // Income Types
  getIncomeTypes: () => api.get<IncomeType[]>('/income-types/'),
  getIncomeTypeById: (id: number) => api.get<IncomeType>(`/income-types/${id}/`),
  createIncomeType: (data: Partial<IncomeType>) => api.post<IncomeType>('/income-types/', data),
  updateIncomeType: (id: number, data: Partial<IncomeType>) => api.put<IncomeType>(`/income-types/${id}/`, data),
  deleteIncomeType: (id: number) => api.delete(`/income-types/${id}/`),
  
  // Income Types Hierarchical
  getIncomeTypeRoots: () => api.get<IncomeType[]>('/income-types/roots/'),
  getIncomeTypeChildren: (id: number) => api.get<IncomeType[]>(`/income-types/${id}/children/`),
  getIncomeTypeDescendants: (id: number) => api.get<IncomeType[]>(`/income-types/${id}/descendants/`),
  getIncomeTypeAncestors: (id: number) => api.get<IncomeType[]>(`/income-types/${id}/ancestors/`),

  // Alerts
  getAlerts: () => api.get<Alert[]>('/alerts/'),
  getAlertById: (id: number) => api.get<Alert>(`/alerts/${id}/`),
  resolveAlert: (id: number) => api.post(`/alerts/${id}/resolve/`),

  // Fish Sampling
  getFishSampling: (params?: PaginationParams) => api.get<PaginatedResponse<FishSampling>>('/fish-sampling/', { params }),
  getFishSamplingById: (id: number) => api.get<FishSampling>(`/fish-sampling/${id}/`),
  createFishSampling: (data: Partial<FishSampling>) => api.post<FishSampling>('/fish-sampling/', data),
  updateFishSampling: (id: number, data: Partial<FishSampling>) => api.put<FishSampling>(`/fish-sampling/${id}/`, data),
  deleteFishSampling: (id: number) => api.delete(`/fish-sampling/${id}/`),
  getBiomassAnalysis: (params?: { pond?: number; species?: number; start_date?: string; end_date?: string }) => 
    api.get<BiomassAnalysis>('/fish-sampling/biomass_analysis/', { params }),
  getFcrAnalysis: (params?: { pond?: number; species?: number; start_date?: string; end_date?: string }) => {
    console.log('API getFcrAnalysis called with params:', params);
    return api.get<FcrAnalysis>('/fish-sampling/fcr_analysis/', { params });
  },

  // Feeding Advice
  getFeedingAdvice: (params?: PaginationParams) => api.get<PaginatedResponse<FeedingAdvice>>('/feeding-advice/', { params }),
  getFeedingAdviceById: (id: number) => api.get<FeedingAdvice>(`/feeding-advice/${id}/`),
  createFeedingAdvice: (data: Partial<FeedingAdvice>) => api.post<FeedingAdvice>('/feeding-advice/', data),
  generateFeedingAdvice: (data: { pond_id: number }) => api.post<FeedingAdvice>('/feeding-advice/generate_advice/', data),
  autoGenerateFeedingAdvice: (data: { pond: number }) => {
    console.log('API Debug - Sending request to:', '/feeding-advice/auto_generate/');
    console.log('API Debug - Request data:', data);
    console.log('API Debug - Full URL:', `${API_BASE_URL}/feeding-advice/auto_generate/`);
    return api.post<{ message: string; advice: FeedingAdvice[]; warnings?: { species_without_sampling?: string[]; failed_species?: string[] } }>('/feeding-advice/auto_generate/', data);
  },
  updateFeedingAdvice: (id: number, data: Partial<FeedingAdvice>) => api.put<FeedingAdvice>(`/feeding-advice/${id}/`, data),
  deleteFeedingAdvice: (id: number) => api.delete(`/feeding-advice/${id}/`),
  applyFeedingAdvice: (id: number) => api.post(`/feeding-advice/${id}/apply_advice/`),

  // Medical Diagnostic
  getMedicalDiagnostics: (params?: PaginationParams) => api.get<PaginatedResponse<MedicalDiagnostic>>('/medical-diagnostics/', { params }),
  getMedicalDiagnosticById: (id: number) => api.get<MedicalDiagnostic>(`/medical-diagnostics/${id}/`),
  createMedicalDiagnostic: (data: Partial<MedicalDiagnostic>) => api.post<MedicalDiagnostic>('/medical-diagnostics/', data),
  updateMedicalDiagnostic: (id: number, data: Partial<MedicalDiagnostic>) => api.put<MedicalDiagnostic>(`/medical-diagnostics/${id}/`, data),
  deleteMedicalDiagnostic: (id: number) => api.delete(`/medical-diagnostics/${id}/`),
  applyTreatment: (id: number) => api.post(`/medical-diagnostics/${id}/apply_treatment/`),
  getMedicalDiagnosticsByPond: (pondId: number) => api.get<MedicalDiagnostic[]>(`/medical-diagnostics/by_pond/?pond_id=${pondId}`),
  getRecentMedicalDiagnostics: () => api.get<MedicalDiagnostic[]>('/medical-diagnostics/recent/'),

  // Vendors
  getVendors: (params?: PaginationParams) => api.get<PaginatedResponse<Vendor>>('/vendors/', { params }),
  getVendorById: (id: number) => api.get<Vendor>(`/vendors/${id}/`),
  createVendor: (data: Partial<Vendor>) => api.post<Vendor>('/vendors/', data),
  updateVendor: (id: number, data: Partial<Vendor>) => api.put<Vendor>(`/vendors/${id}/`, data),
  deleteVendor: (id: number) => api.delete(`/vendors/${id}/`),
  getActiveVendors: () => api.get<Vendor[]>('/vendors/active/'),
  getVendorsByType: (type: string) => api.get<Vendor[]>(`/vendors/by_type/?type=${type}`),

  // Customers
  getCustomers: (params?: PaginationParams) => api.get<PaginatedResponse<Customer>>('/customers/', { params }),
  getCustomerById: (id: number) => api.get<Customer>(`/customers/${id}/`),
  createCustomer: (data: Partial<Customer>) => api.post<Customer>('/customers/', data),
  updateCustomer: (id: number, data: Partial<Customer>) => api.put<Customer>(`/customers/${id}/`, data),
  deleteCustomer: (id: number) => api.delete(`/customers/${id}/`),
  getActiveCustomers: () => api.get<Customer[]>('/customers/active/'),
  getCustomersByType: (type: string) => api.get<Customer[]>(`/customers/by_type/?type=${type}`),

  // Item Services
  getItemServices: (params?: PaginationParams) => api.get<PaginatedResponse<ItemService>>('/item-services/', { params }),
  getItemServiceById: (id: number) => api.get<ItemService>(`/item-services/${id}/`),
  createItemService: (data: Partial<ItemService>) => api.post<ItemService>('/item-services/', data),
  updateItemService: (id: number, data: Partial<ItemService>) => api.put<ItemService>(`/item-services/${id}/`, data),
  deleteItemService: (id: number) => api.delete(`/item-services/${id}/`),
  getActiveItemServices: () => api.get<ItemService[]>('/item-services/active/'),
  getAvailableItemServices: () => api.get<ItemService[]>('/item-services/available/'),
  getItemServicesByType: (type: string) => api.get<ItemService[]>(`/item-services/by_type/?type=${type}`),
  getItemServicesByVendor: (vendorId: number) => api.get<ItemService[]>(`/item-services/by_vendor/?vendor_id=${vendorId}`),
  getLowStockItemServices: () => api.get<ItemService[]>('/item-services/low_stock/'),

};
