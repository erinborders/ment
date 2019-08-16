from rest_framework import viewsets
from django.shortcuts import render
from .serializers import CareerSerializer, MentorSerializer, BlogPostSerializer
from .models import Career, Mentor, BlogPost
from .forms import YouthProgramForm
from django.http import JsonResponse
import requests 
from django.conf import settings


class CareerView(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

class MentorView(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

class BlogPostView(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


def get_youth_programs(request):
    location = request.GET['location']
    radius = request.GET['radius']
    userId = settings.CAREERONESTOP_ID
    key = settings.CAREERONESTOP_KEY
    url = 'https://api.careeronestop.org/v1/youthprogramfinder/{userId}/{location}/{radius}/0/0/0/10'.format(userId=userId, location=location, radius=radius)
    
    headers = {'Authorization': 'Bearer ' + key}

    r = requests.get(url, headers=headers).json()

    if r == None:
        print('Nothing returned')
    else:
        print(r)
    return JsonResponse(r, safe=False)
