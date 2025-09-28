from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from fish_farming.models import Species, ExpenseType, IncomeType


class Command(BaseCommand):
    help = 'Populate hierarchical data for Species, ExpenseType, and IncomeType'

    def handle(self, *args, **options):
        # Get or create a test user
        user, created = User.objects.get_or_create(
            username='test_user',
            defaults={'email': 'test@example.com'}
        )
        
        if created:
            self.stdout.write(self.style.SUCCESS('Created test user'))
        else:
            self.stdout.write(self.style.SUCCESS('Using existing test user'))

        # Create hierarchical Species data
        self.create_species_hierarchy(user)
        
        # Create hierarchical ExpenseType data
        self.create_expense_type_hierarchy()
        
        # Create hierarchical IncomeType data
        self.create_income_type_hierarchy()
        
        self.stdout.write(self.style.SUCCESS('Successfully populated hierarchical data!'))

    def create_species_hierarchy(self, user):
        """Create hierarchical fish species data"""
        # Root categories
        freshwater_fish = Species.objects.create(
            user=user,
            name='Freshwater Fish',
            description='Freshwater fish species'
        )
        
        saltwater_fish = Species.objects.create(
            user=user,
            name='Saltwater Fish',
            description='Saltwater fish species'
        )
        
        # Freshwater subcategories
        carp_family = Species.objects.create(
            user=user,
            name='Carp Family',
            parent=freshwater_fish,
            description='Carp and related species'
        )
        
        catfish_family = Species.objects.create(
            user=user,
            name='Catfish Family',
            parent=freshwater_fish,
            description='Catfish and related species'
        )
        
        # Specific species under Carp Family
        Species.objects.create(
            user=user,
            name='Common Carp',
            parent=carp_family,
            scientific_name='Cyprinus carpio',
            description='Common carp species',
            optimal_temp_min=15.0,
            optimal_temp_max=25.0,
            optimal_ph_min=6.5,
            optimal_ph_max=8.5
        )
        
        Species.objects.create(
            user=user,
            name='Grass Carp',
            parent=carp_family,
            scientific_name='Ctenopharyngodon idella',
            description='Grass carp species',
            optimal_temp_min=18.0,
            optimal_temp_max=28.0,
            optimal_ph_min=6.0,
            optimal_ph_max=8.0
        )
        
        # Specific species under Catfish Family
        Species.objects.create(
            user=user,
            name='Channel Catfish',
            parent=catfish_family,
            scientific_name='Ictalurus punctatus',
            description='Channel catfish species',
            optimal_temp_min=20.0,
            optimal_temp_max=30.0,
            optimal_ph_min=6.5,
            optimal_ph_max=8.0
        )
        
        # Saltwater subcategories
        marine_fish = Species.objects.create(
            user=user,
            name='Marine Fish',
            parent=saltwater_fish,
            description='Marine fish species'
        )
        
        Species.objects.create(
            user=user,
            name='Red Snapper',
            parent=marine_fish,
            scientific_name='Lutjanus campechanus',
            description='Red snapper species',
            optimal_temp_min=22.0,
            optimal_temp_max=28.0,
            optimal_ph_min=8.0,
            optimal_ph_max=8.4
        )

    def create_expense_type_hierarchy(self):
        """Create hierarchical expense type data"""
        # Root categories
        feed_expenses = ExpenseType.objects.create(
            name='Feed Expenses',
            category='feed',
            description='All feed-related expenses'
        )
        
        equipment_expenses = ExpenseType.objects.create(
            name='Equipment Expenses',
            category='equipment',
            description='All equipment-related expenses'
        )
        
        labor_expenses = ExpenseType.objects.create(
            name='Labor Expenses',
            category='labor',
            description='All labor-related expenses'
        )
        
        # Feed subcategories
        feed_purchase = ExpenseType.objects.create(
            name='Feed Purchase',
            parent=feed_expenses,
            category='feed',
            description='Purchase of fish feed'
        )
        
        feed_storage = ExpenseType.objects.create(
            name='Feed Storage',
            parent=feed_expenses,
            category='feed',
            description='Feed storage and handling costs'
        )
        
        # Equipment subcategories
        pond_equipment = ExpenseType.objects.create(
            name='Pond Equipment',
            parent=equipment_expenses,
            category='equipment',
            description='Pond-related equipment'
        )
        
        water_equipment = ExpenseType.objects.create(
            name='Water Equipment',
            parent=equipment_expenses,
            category='equipment',
            description='Water treatment equipment'
        )
        
        # Labor subcategories
        daily_labor = ExpenseType.objects.create(
            name='Daily Labor',
            parent=labor_expenses,
            category='labor',
            description='Daily labor costs'
        )
        
        seasonal_labor = ExpenseType.objects.create(
            name='Seasonal Labor',
            parent=labor_expenses,
            category='labor',
            description='Seasonal labor costs'
        )

    def create_income_type_hierarchy(self):
        """Create hierarchical income type data"""
        # Root categories
        harvest_income = IncomeType.objects.create(
            name='Harvest Income',
            category='harvest',
            description='All harvest-related income'
        )
        
        service_income = IncomeType.objects.create(
            name='Service Income',
            category='services',
            description='All service-related income'
        )
        
        # Harvest subcategories
        fish_sales = IncomeType.objects.create(
            name='Fish Sales',
            parent=harvest_income,
            category='harvest',
            description='Direct fish sales'
        )
        
        processed_sales = IncomeType.objects.create(
            name='Processed Sales',
            parent=harvest_income,
            category='harvest',
            description='Processed fish products sales'
        )
        
        # Service subcategories
        consulting_services = IncomeType.objects.create(
            name='Consulting Services',
            parent=service_income,
            category='consulting',
            description='Aquaculture consulting services'
        )
        
        training_services = IncomeType.objects.create(
            name='Training Services',
            parent=service_income,
            category='services',
            description='Training and education services'
        )
