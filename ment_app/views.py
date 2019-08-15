from rest_framework import viewsets
from django.shortcuts import render
from .serializers import CareerSerializer, MentorSerializer, BlogPostSerializer
from .models import Career, Mentor, BlogPost
from .forms import YouthProgramForm


class CareerView(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

class MentorView(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

class BlogPostView(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer

def youth_program(request):
    search_result = {}
    if 'location' and 'radius' in request.GET:
        form = YouthProgramForm(request.GET)
        if form.is_valid():
            search_result = form.search()
    else:
        form = YouthProgramForm()
    return render(request, 'components/YouthProgramForm', {'form': form, 'search_result': search_result})