from django.contrib import admin
from .models import Career, Mentor, BlogPost

# Register your models here.
admin.site.register([Career, Mentor, BlogPost])