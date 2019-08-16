from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('careers', views.CareerView)
router.register('mentors', views.MentorView)
router.register('blogposts', views.BlogPostView)

urlpatterns = [
    path('', include(router.urls)),
    # backend url, doesn't have to match client-side routes
    path('youth-programs/', views.get_youth_programs),
    path('job-centers/', views.get_job_centers)
]