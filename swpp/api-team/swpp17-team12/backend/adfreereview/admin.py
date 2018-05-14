from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User

from .models import MyModel, Blog, Post, Rating
from .models import Profile

# Register your models here.


# Define an inline admin descriptor for Profile model
# which acts a bit like a singleton
# https://docs.djangoproject.com/en/2.0/topics/auth/customizing/#extending-the-existing-user-model
# https://simpleisbetterthancomplex.com/tutorial/2016/11/23/how-to-add-user-profile-to-django-admin.html
class ProfileInline(admin.StackedInline):
    model = Profile
    can_delete = False
    verbose_name_plural = 'Profile'
    fk_name = 'user'


# Define a new User admin
class CustomUserAdmin(UserAdmin):
    inlines = (ProfileInline, )
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'get_score', 'get_domain_list')
    list_select_related = ('profile', )

    def get_score(self, instance):
        return instance.profile.score
    get_score.short_description = 'Score'

    def get_domain_list(self, instance):
        return instance.profile.domain_list
    get_score.short_description = 'Domain List'

    def get_inline_instances(self, request, obj=None):
        if not obj:
            return list()
        return super(CustomUserAdmin, self).get_inline_instances(request, obj)


class CustomBlog(admin.ModelAdmin):
    list_display = ('domain', 'title', 'url')


class CustomRating(admin.ModelAdmin):
    list_display = ('user', 'post', 'time_stamp', 'adfree_score', 'content_score', 'comment')


class CustomPost(admin.ModelAdmin):
    list_display = ('blog', 'title', 'url', 'category', 'adfree_score', 'content_score', 'total_score', 'rating_count')


# Re-register UserAdmin
admin.site.unregister(User)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Blog, CustomBlog)
admin.site.register(Post, CustomPost)
admin.site.register(Rating, CustomRating)
