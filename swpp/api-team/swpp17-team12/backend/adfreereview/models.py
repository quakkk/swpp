from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
from decimal import Decimal
<<<<<<< HEAD

=======
>>>>>>> 410bc1d815ce83ebd4f2fef0ef51566ec66d7829

# Create your models here.

# python3 manage.py makemigrations adfreereview
# python3 manage.py migrate
# python3 manage.py runserver


# We are not using this, just an example
class MyModel(models.Model):
    name = models.CharField(max_length=64)

    def __str__(self):
        return self.name


# Extended User model with 'score'
# https://docs.djangoproject.com/en/2.0/topics/auth/customizing/#extending-the-existing-user-model
# https://simpleisbetterthancomplex.com/tutorial/2016/07/22/how-to-extend-django-user-model.html#onetoone
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    score = models.IntegerField(default=0)
    domain_list = models.CharField(max_length=64, default='naver,daum,egloos,tistory')

    def __str(self):
        return self.user.username


@receiver(post_save, sender=User)
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)
    instance.profile.save()


class Blog(models.Model):
    domain = models.CharField(max_length=64)
    title = models.CharField(max_length=128)
    url = models.CharField(max_length=512)
    # category = models.CharField(max_length=64)

class Post(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    title = models.CharField(max_length=128)
    url = models.CharField(max_length=512)
    category = models.CharField(max_length=64)
    adfree_score = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.00'))
    content_score = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.00'))
    total_score = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal('0.00'))
    rating_count = models.IntegerField(default=0)


class Rating(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)
    adfree_score = models.DecimalField(max_digits=5, decimal_places=2)
    content_score = models.DecimalField(max_digits=5, decimal_places=2)
    comment = models.CharField(max_length=500)
