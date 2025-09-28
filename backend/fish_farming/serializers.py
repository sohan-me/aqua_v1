from rest_framework import serializers
from django.contrib.auth.models import User
from .models import (
    Pond, Species, Stocking, DailyLog, FeedType, Feed, SampleType, Sampling, 
    Mortality, Harvest, AccountType, ExpenseType, IncomeType, Expense, Income,
    InventoryFeed, Treatment, Alert, Setting, FeedingBand, 
    EnvAdjustment, KPIDashboard, FishSampling, FeedingAdvice, SurvivalRate,
    MedicalDiagnostic, Vendor, Customer, ItemService
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']
        read_only_fields = ['id']


class SpeciesSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = Species
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'level', 'lft', 'rght', 'tree_id']
    
    def get_children(self, obj):
        """Get immediate children of this species"""
        children = obj.get_children()
        return SpeciesSerializer(children, many=True, context=self.context).data


class PondSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Pond
        fields = '__all__'
        read_only_fields = ['user', 'volume_m3', 'created_at', 'updated_at']


class StockingSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    pieces_per_kg_display = serializers.CharField(source='pieces_per_kg', read_only=True)
    initial_avg_weight_kg_display = serializers.CharField(source='initial_avg_weight_kg', read_only=True)
    
    class Meta:
        model = Stocking
        fields = '__all__'
        read_only_fields = ['stocking_id', 'pieces_per_kg', 'initial_avg_weight_kg', 'created_at']


class DailyLogSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    
    class Meta:
        model = DailyLog
        fields = '__all__'
        read_only_fields = ['created_at']


class FeedTypeSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = FeedType
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'level', 'lft', 'rght', 'tree_id']
    
    def get_children(self, obj):
        """Get immediate children of this feed type"""
        children = obj.get_children()
        return FeedTypeSerializer(children, many=True, context=self.context).data


class AccountTypeSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    type_display = serializers.CharField(source='get_type_display', read_only=True)
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = AccountType
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'level', 'lft', 'rght', 'tree_id']
    
    def get_children(self, obj):
        """Get immediate children of this account type"""
        children = obj.get_children()
        return AccountTypeSerializer(children, many=True, context=self.context).data


class FeedSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    feed_type_name = serializers.CharField(source='feed_type.name', read_only=True)
    
    class Meta:
        model = Feed
        fields = '__all__'
        read_only_fields = ['total_cost', 'feeding_rate_percent', 'created_at']


class SampleTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = SampleType
        fields = '__all__'
        read_only_fields = ['created_at']


class SamplingSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    sample_type_name = serializers.CharField(source='sample_type.name', read_only=True)
    sample_type_icon = serializers.CharField(source='sample_type.icon', read_only=True)
    sample_type_color = serializers.CharField(source='sample_type.color', read_only=True)
    
    class Meta:
        model = Sampling
        fields = '__all__'
        read_only_fields = ['created_at']


class MortalitySerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    
    class Meta:
        model = Mortality
        fields = '__all__'
        read_only_fields = ['total_weight_kg', 'created_at']


class HarvestSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    
    class Meta:
        model = Harvest
        fields = '__all__'
        read_only_fields = ['avg_weight_kg', 'total_count', 'total_revenue', 'created_at']


class ExpenseTypeSerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = ExpenseType
        fields = '__all__'
        read_only_fields = ['created_at', 'level', 'lft', 'rght', 'tree_id']
    
    def get_children(self, obj):
        """Get immediate children of this expense type"""
        children = obj.get_children()
        return ExpenseTypeSerializer(children, many=True, context=self.context).data


class IncomeTypeSerializer(serializers.ModelSerializer):
    parent_name = serializers.CharField(source='parent.name', read_only=True)
    children = serializers.SerializerMethodField()
    
    class Meta:
        model = IncomeType
        fields = '__all__'
        read_only_fields = ['created_at', 'level', 'lft', 'rght', 'tree_id']
    
    def get_children(self, obj):
        """Get immediate children of this income type"""
        children = obj.get_children()
        return IncomeTypeSerializer(children, many=True, context=self.context).data


class ExpenseSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    account_type_name = serializers.CharField(source='account_type.name', read_only=True)
    expense_type_name = serializers.CharField(source='expense_type.name', read_only=True)
    
    class Meta:
        model = Expense
        fields = '__all__'
        read_only_fields = ['user', 'created_at']


class IncomeSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    account_type_name = serializers.CharField(source='account_type.name', read_only=True)
    income_type_name = serializers.CharField(source='income_type.name', read_only=True)
    
    class Meta:
        model = Income
        fields = '__all__'
        read_only_fields = ['user', 'created_at']


class InventoryFeedSerializer(serializers.ModelSerializer):
    feed_type_name = serializers.CharField(source='feed_type.name', read_only=True)
    
    class Meta:
        model = InventoryFeed
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']


class TreatmentSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    
    class Meta:
        model = Treatment
        fields = '__all__'
        read_only_fields = ['created_at']


class AlertSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    resolved_by_username = serializers.CharField(source='resolved_by.username', read_only=True)
    
    class Meta:
        model = Alert
        fields = '__all__'
        read_only_fields = ['created_at']


class SettingSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Setting
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']


class FeedingBandSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedingBand
        fields = '__all__'
        read_only_fields = ['created_at']


class EnvAdjustmentSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    
    class Meta:
        model = EnvAdjustment
        fields = '__all__'
        read_only_fields = ['created_at']


class KPIDashboardSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    
    class Meta:
        model = KPIDashboard
        fields = '__all__'
        read_only_fields = ['profit_loss', 'created_at']


# Nested serializers for detailed views
class PondDetailSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    stockings = StockingSerializer(many=True, read_only=True)
    daily_logs = DailyLogSerializer(many=True, read_only=True)
    feeds = FeedSerializer(many=True, read_only=True)
    samplings = SamplingSerializer(many=True, read_only=True)
    mortalities = MortalitySerializer(many=True, read_only=True)
    harvests = HarvestSerializer(many=True, read_only=True)
    expenses = ExpenseSerializer(many=True, read_only=True)
    incomes = IncomeSerializer(many=True, read_only=True)
    treatments = TreatmentSerializer(many=True, read_only=True)
    alerts = AlertSerializer(many=True, read_only=True)
    env_adjustments = EnvAdjustmentSerializer(many=True, read_only=True)
    kpis = KPIDashboardSerializer(many=True, read_only=True)
    
    class Meta:
        model = Pond
        fields = '__all__'
        read_only_fields = ['volume_m3', 'created_at', 'updated_at']


# Dashboard summary serializers
class PondSummarySerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    latest_stocking = StockingSerializer(source='stockings.first', read_only=True)
    latest_daily_log = DailyLogSerializer(source='daily_logs.first', read_only=True)
    latest_harvest = HarvestSerializer(source='harvests.first', read_only=True)
    total_expenses = serializers.SerializerMethodField()
    total_income = serializers.SerializerMethodField()
    active_alerts_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Pond
        fields = [
            'id', 'name', 'user_username', 'area_decimal', 'depth_ft', 'volume_m3', 
            'location', 'is_active', 'latest_stocking', 'latest_daily_log', 
            'latest_harvest', 'total_expenses', 'total_income', 'active_alerts_count',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['volume_m3', 'created_at', 'updated_at']
    
    def get_total_expenses(self, obj):
        return sum(expense.amount for expense in obj.expenses.all())
    
    def get_total_income(self, obj):
        return sum(income.amount for income in obj.incomes.all())
    
    def get_active_alerts_count(self, obj):
        return obj.alerts.filter(is_resolved=False).count()


# Financial summary serializers
class FinancialSummarySerializer(serializers.Serializer):
    total_expenses = serializers.DecimalField(max_digits=12, decimal_places=2)
    total_income = serializers.DecimalField(max_digits=12, decimal_places=2)
    profit_loss = serializers.DecimalField(max_digits=12, decimal_places=2)
    expenses_by_category = serializers.DictField()
    income_by_category = serializers.DictField()
    monthly_trends = serializers.DictField()


# Fish Sampling serializers
class FishSamplingSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = FishSampling
        fields = '__all__'
        read_only_fields = ['user', 'average_weight_kg', 'fish_per_kg', 'condition_factor', 'growth_rate_kg_per_day', 'biomass_difference_kg', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Custom validation to provide better error messages for unique constraint violations"""
        pond = data.get('pond')
        species = data.get('species')
        date = data.get('date')
        
        # Check for existing fish sampling with same pond, species, and date
        existing_sampling = FishSampling.objects.filter(
            pond=pond,
            species=species,
            date=date
        )
        
        # If updating, exclude the current instance
        if self.instance:
            existing_sampling = existing_sampling.exclude(id=self.instance.id)
        
        if existing_sampling.exists():
            species_name = species.name if species else "Mixed species"
            raise serializers.ValidationError({
                'non_field_errors': [f'Fish sampling for {pond.name} - {species_name} on {date} already exists. Please choose a different date or update the existing record.']
            })
        
        return data


# Feeding Advice serializers
class FeedingAdviceSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    user_username = serializers.CharField(source='user.username', read_only=True)
    feed_type_name = serializers.CharField(source='feed_type.name', read_only=True)
    medical_diagnostics_data = serializers.SerializerMethodField()
    
    class Meta:
        model = FeedingAdvice
        fields = '__all__'
        read_only_fields = ['user', 'total_biomass_kg', 'recommended_feed_kg', 'feeding_rate_percent', 'daily_feed_cost', 'created_at', 'updated_at']
    
    def get_medical_diagnostics_data(self, obj):
        """Get related medical diagnostics data"""
        from .models import MedicalDiagnostic
        diagnostics = obj.medical_diagnostics.all()
        return MedicalDiagnosticSerializer(diagnostics, many=True).data


# Survival Rate serializers
class SurvivalRateSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    species_name = serializers.CharField(source='species.name', read_only=True)
    
    class Meta:
        model = SurvivalRate
        fields = '__all__'
        read_only_fields = ['survival_rate_percent', 'total_mortality', 'total_survival_kg', 'created_at', 'updated_at']


# Medical Diagnostic serializers
class MedicalDiagnosticSerializer(serializers.ModelSerializer):
    pond_name = serializers.CharField(source='pond.name', read_only=True)
    pond_area = serializers.DecimalField(source='pond.area_decimal', max_digits=8, decimal_places=3, read_only=True)
    pond_location = serializers.CharField(source='pond.location', read_only=True)
    
    class Meta:
        model = MedicalDiagnostic
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at', 'applied_at']
    
    def create(self, validated_data):
        # Automatically set the user from the request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class VendorSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    business_type_display = serializers.CharField(source='get_business_type_display', read_only=True)
    rating_display = serializers.CharField(source='get_rating_display', read_only=True)
    
    class Meta:
        model = Vendor
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Automatically set the user from the request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)


class CustomerSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    customer_type_display = serializers.CharField(source='get_customer_type_display', read_only=True)
    rating_display = serializers.CharField(source='get_rating_display', read_only=True)
    
    class Meta:
        model = Customer
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Automatically set the user from the request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class ItemServiceSerializer(serializers.ModelSerializer):
    user_username = serializers.CharField(source='user.username', read_only=True)
    vendor_name = serializers.CharField(source='vendor.name', read_only=True)
    feed_type_name = serializers.CharField(source='feed_type.name', read_only=True)
    item_type_display = serializers.CharField(source='get_item_type_display', read_only=True)
    
    class Meta:
        model = ItemService
        fields = '__all__'
        read_only_fields = ['user', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Automatically set the user from the request
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)
