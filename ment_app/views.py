from rest_framework import viewsets

from .serializers import CareerSerializer, MentorSerializer, BlogPostSerializer
from .models import Career, Mentor, BlogPost


class CareerView(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

class MentorView(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

class BlogPostView(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer