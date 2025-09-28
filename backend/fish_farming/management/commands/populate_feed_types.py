from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from fish_farming.models import FeedType


class Command(BaseCommand):
    help = 'Populate hierarchical feed type data for all users'

    def handle(self, *args, **options):
        self.stdout.write('Creating hierarchical feed types...')
        
        # Get all users
        users = User.objects.all()
        
        if not users.exists():
            self.stdout.write(
                self.style.WARNING('No users found. Please create users first.')
            )
            return
        
        total_created = 0
        for user in users:
            self.stdout.write(f'Creating feed types for user: {user.username}')
            
            # Clear existing feed types for this user
            FeedType.objects.filter(user=user).delete()
            
            # Create feed type hierarchy for this user
            count = self.create_feed_type_hierarchy(user)
            total_created += count
            self.stdout.write(f'Created {count} feed types for {user.username}')
        
        self.stdout.write(
            self.style.SUCCESS(f'Successfully populated hierarchical feed type data! Total: {total_created}')
        )

    def create_feed_type_hierarchy(self, user):
        """Create hierarchical feed type structure for a specific user"""
        
        # Root categories
        commercial_feeds = FeedType.objects.create(
            user=user,
            name="Commercial Feeds",
            description="Commercially produced fish feeds",
            protein_content=35.0
        )
        
        natural_feeds = FeedType.objects.create(
            user=user,
            name="Natural Feeds",
            description="Natural and organic feed sources",
            protein_content=25.0
        )
        
        supplements = FeedType.objects.create(
            user=user,
            name="Supplements",
            description="Nutritional supplements and additives",
            protein_content=40.0
        )
        
        # Commercial feed subcategories
        starter_feeds = FeedType.objects.create(
            user=user,
            name="Starter Feeds",
            parent=commercial_feeds,
            description="High-protein feeds for fingerlings",
            protein_content=45.0
        )
        
        grower_feeds = FeedType.objects.create(
            user=user,
            name="Grower Feeds",
            parent=commercial_feeds,
            description="Balanced feeds for growing fish",
            protein_content=35.0
        )
        
        finisher_feeds = FeedType.objects.create(
            user=user,
            name="Finisher Feeds",
            parent=commercial_feeds,
            description="Feeds for market-ready fish",
            protein_content=30.0
        )
        
        # Starter feed subcategories
        micro_pellets = FeedType.objects.create(
            user=user,
            name="Micro Pellets",
            parent=starter_feeds,
            description="Tiny pellets for very small fish",
            protein_content=50.0
        )
        
        crumble_feeds = FeedType.objects.create(
            user=user,
            name="Crumble Feeds",
            parent=starter_feeds,
            description="Crumbled feeds for small fish",
            protein_content=45.0
        )
        
        # Natural feed subcategories
        live_feeds = FeedType.objects.create(
            user=user,
            name="Live Feeds",
            parent=natural_feeds,
            description="Live organisms for fish",
            protein_content=60.0
        )
        
        plant_feeds = FeedType.objects.create(
            user=user,
            name="Plant Feeds",
            parent=natural_feeds,
            description="Plant-based natural feeds",
            protein_content=15.0
        )
        
        # Live feed subcategories
        daphnia = FeedType.objects.create(
            user=user,
            name="Daphnia",
            parent=live_feeds,
            description="Water fleas - excellent live feed",
            protein_content=65.0
        )
        
        brine_shrimp = FeedType.objects.create(
            user=user,
            name="Brine Shrimp",
            parent=live_feeds,
            description="Artemia nauplii for small fish",
            protein_content=55.0
        )
        
        earthworms = FeedType.objects.create(
            user=user,
            name="Earthworms",
            parent=live_feeds,
            description="Earthworms for larger fish",
            protein_content=60.0
        )
        
        # Supplement subcategories
        vitamins = FeedType.objects.create(
            user=user,
            name="Vitamins",
            parent=supplements,
            description="Vitamin supplements",
            protein_content=0.0
        )
        
        minerals = FeedType.objects.create(
            user=user,
            name="Minerals",
            parent=supplements,
            description="Mineral supplements",
            protein_content=0.0
        )
        
        probiotics = FeedType.objects.create(
            user=user,
            name="Probiotics",
            parent=supplements,
            description="Beneficial bacteria supplements",
            protein_content=0.0
        )
        
        # Return count of feed types created for this user
        return FeedType.objects.filter(user=user).count()
