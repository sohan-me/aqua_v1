from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from fish_farming.models import AccountType, ExpenseType, IncomeType, Expense, Income


class Command(BaseCommand):
    help = 'Migrate existing ExpenseType and IncomeType data to the new AccountType model'

    def handle(self, *args, **options):
        self.stdout.write('Starting migration to AccountType...')
        
        # Get all users
        users = User.objects.all()
        
        if not users.exists():
            self.stdout.write(
                self.style.WARNING('No users found. Please create users first.')
            )
            return
        
        total_created = 0
        
        for user in users:
            self.stdout.write(f'Migrating data for user: {user.username}')
            
            # Migrate ExpenseTypes
            expense_types = ExpenseType.objects.all()
            for exp_type in expense_types:
                account_type, created = AccountType.objects.get_or_create(
                    user=user,
                    name=exp_type.name,
                    type='expense',
                    category=exp_type.category,
                    description=exp_type.description,
                    parent=None  # We'll handle parent relationships separately
                )
                if created:
                    total_created += 1
                    self.stdout.write(f'  Created expense account type: {account_type.name}')
            
            # Migrate IncomeTypes
            income_types = IncomeType.objects.all()
            for inc_type in income_types:
                account_type, created = AccountType.objects.get_or_create(
                    user=user,
                    name=inc_type.name,
                    type='income',
                    category=inc_type.category,
                    description=inc_type.description,
                    parent=None  # We'll handle parent relationships separately
                )
                if created:
                    total_created += 1
                    self.stdout.write(f'  Created income account type: {account_type.name}')
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully migrated to AccountType! Total created: {total_created}')
        )
        
        # Create default account type hierarchy for each user
        self.stdout.write('Creating default account type hierarchy...')
        self.create_default_hierarchy()
        
        self.stdout.write(
            self.style.SUCCESS('Migration completed successfully!')
        )

    def create_default_hierarchy(self):
        """Create default hierarchical account types for all users"""
        users = User.objects.all()
        
        for user in users:
            self.stdout.write(f'Creating hierarchy for user: {user.username}')
            
            # Clear existing account types for this user
            AccountType.objects.filter(user=user).delete()
            
            # Create expense categories
            expense_root = AccountType.objects.create(
                user=user,
                name="Expenses",
                type="expense",
                description="All expense categories"
            )
            
            # Feed expenses
            feed_expense = AccountType.objects.create(
                user=user,
                name="Feed Expenses",
                type="expense",
                parent=expense_root,
                description="All feed-related expenses"
            )
            
            AccountType.objects.create(
                user=user,
                name="Commercial Feed",
                type="expense",
                parent=feed_expense,
                description="Commercial feed purchases"
            )
            
            AccountType.objects.create(
                user=user,
                name="Natural Feed",
                type="expense",
                parent=feed_expense,
                description="Natural feed sources"
            )
            
            # Medicine expenses
            medicine_expense = AccountType.objects.create(
                user=user,
                name="Medicine & Treatment",
                type="expense",
                parent=expense_root,
                description="Medical and treatment expenses"
            )
            
            AccountType.objects.create(
                user=user,
                name="Vaccines",
                type="expense",
                parent=medicine_expense,
                description="Vaccination costs"
            )
            
            AccountType.objects.create(
                user=user,
                name="Medications",
                type="expense",
                parent=medicine_expense,
                description="Fish medications"
            )
            
            # Equipment expenses
            equipment_expense = AccountType.objects.create(
                user=user,
                name="Equipment",
                type="expense",
                parent=expense_root,
                description="Equipment purchases and maintenance"
            )
            
            AccountType.objects.create(
                user=user,
                name="Water Pumps",
                type="expense",
                parent=equipment_expense,
                description="Water pumping equipment"
            )
            
            AccountType.objects.create(
                user=user,
                name="Aeration Systems",
                type="expense",
                parent=equipment_expense,
                description="Aeration and oxygen systems"
            )
            
            # Labor expenses
            AccountType.objects.create(
                user=user,
                name="Labor Costs",
                type="expense",
                parent=expense_root,
                description="Labor and staffing expenses"
            )
            
            # Utilities
            AccountType.objects.create(
                user=user,
                name="Utilities",
                type="expense",
                parent=expense_root,
                description="Electricity, water, and other utilities"
            )
            
            # Maintenance
            AccountType.objects.create(
                user=user,
                name="Maintenance",
                type="expense",
                parent=expense_root,
                description="Pond and facility maintenance"
            )
            
            # Create income categories
            income_root = AccountType.objects.create(
                user=user,
                name="Income",
                type="income",
                description="All income categories"
            )
            
            # Harvest income
            harvest_income = AccountType.objects.create(
                user=user,
                name="Harvest Sales",
                type="income",
                parent=income_root,
                description="Income from fish harvest sales"
            )
            
            AccountType.objects.create(
                user=user,
                name="Market Sales",
                type="income",
                parent=harvest_income,
                description="Direct market sales"
            )
            
            AccountType.objects.create(
                user=user,
                name="Wholesale Sales",
                type="income",
                parent=harvest_income,
                description="Wholesale fish sales"
            )
            
            # Seedling income
            AccountType.objects.create(
                user=user,
                name="Seedling Sales",
                type="income",
                parent=income_root,
                description="Fingerling and seedling sales"
            )
            
            # Consulting income
            AccountType.objects.create(
                user=user,
                name="Consulting Services",
                type="income",
                parent=income_root,
                description="Consulting and advisory services"
            )
            
            # Equipment sales
            AccountType.objects.create(
                user=user,
                name="Equipment Sales",
                type="income",
                parent=income_root,
                description="Used equipment sales"
            )
            
            # Other services
            AccountType.objects.create(
                user=user,
                name="Other Services",
                type="income",
                parent=income_root,
                description="Other service-related income"
            )
            
            # Create loan categories
            loan_root = AccountType.objects.create(
                user=user,
                name="Loans",
                type="loan",
                description="All loan accounts"
            )
            
            AccountType.objects.create(
                user=user,
                name="Bank Loans",
                type="loan",
                parent=loan_root,
                description="Bank loans and credit facilities"
            )
            
            AccountType.objects.create(
                user=user,
                name="Personal Loans",
                type="loan",
                parent=loan_root,
                description="Personal loans and advances"
            )
            
            # Create bank accounts
            bank_root = AccountType.objects.create(
                user=user,
                name="Bank Accounts",
                type="bank",
                description="All bank accounts"
            )
            
            AccountType.objects.create(
                user=user,
                name="Checking Account",
                type="bank",
                parent=bank_root,
                description="Primary checking account"
            )
            
            AccountType.objects.create(
                user=user,
                name="Savings Account",
                type="bank",
                parent=bank_root,
                description="Savings account"
            )
            
            # Create equity accounts
            equity_root = AccountType.objects.create(
                user=user,
                name="Equity",
                type="equity",
                description="All equity accounts"
            )
            
            AccountType.objects.create(
                user=user,
                name="Owner's Equity",
                type="equity",
                parent=equity_root,
                description="Owner's equity and capital"
            )
            
            AccountType.objects.create(
                user=user,
                name="Retained Earnings",
                type="equity",
                parent=equity_root,
                description="Retained earnings and profits"
            )
            
            # Create credit card accounts
            credit_root = AccountType.objects.create(
                user=user,
                name="Credit Cards",
                type="credit_card",
                description="All credit card accounts"
            )
            
            AccountType.objects.create(
                user=user,
                name="Business Credit Card",
                type="credit_card",
                parent=credit_root,
                description="Business credit card"
            )
            
            AccountType.objects.create(
                user=user,
                name="Personal Credit Card",
                type="credit_card",
                parent=credit_root,
                description="Personal credit card"
            )
            
            # Create other accounts
            other_root = AccountType.objects.create(
                user=user,
                name="Other Accounts",
                type="others",
                description="All other account types"
            )
            
            AccountType.objects.create(
                user=user,
                name="Miscellaneous",
                type="others",
                parent=other_root,
                description="Miscellaneous accounts"
            )
            
            self.stdout.write(f'  Created {AccountType.objects.filter(user=user).count()} account types for {user.username}')
