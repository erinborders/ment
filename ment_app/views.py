from rest_framework import viewsets
from django.shortcuts import render
from .serializers import CareerSerializer, MentorSerializer, BlogPostSerializer
from .models import Career, Mentor, BlogPost
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

def get_job_centers(request):
    location = request.GET['location']
    radius = request.GET['radius']
    userId = settings.CAREERONESTOP_ID
    key = settings.CAREERONESTOP_KEY
    url = 'https://api.careeronestop.org/v1/ajcfinder/{userId}/{location}/{radius}/0/0/0/0/0/0/0/10'.format(userId=userId, location=location, radius=radius)

    headers = {'Authorization': 'Bearer ' + key}

    r = requests.get(url, headers=headers).json()

    if r == None:
        print('Nothing returned')
    else:
        print(r)
    return JsonResponse(r, safe=False)

def get_job_info(request):
    onetcode = request.GET['onetcode']
    state = request.GET['state']
    userId = settings.CAREERONESTOP_ID
    key = settings.CAREERONESTOP_KEY
    url = 'https://api.careeronestop.org/v1/jdw/{userId}/{onetcode}/{state}/0'.format(userId=userId, onetcode=onetcode, state=state)

    headers = {'Authorization': 'Bearer ' + key}

    r = requests.get(url, headers=headers).json()

    if r == None:
        print('Nothing returned')
    else:
        print(r)
    return JsonResponse(r, safe=False)

def get_job_skills(request):
    onetcode = request.GET['onetcode']
    state = request.GET['state']
    userId = settings.CAREERONESTOP_ID
    key = settings.CAREERONESTOP_KEY
    url = 'https://api.careeronestop.org/v1/occupation/{userId}/{onetcode}/{state}?training=false&interest=false&videos=false&tasks=false&dwas=false&wages=false&alternateOnetTitles=false&projectedEmployment=false&ooh=false&stateLMILinks=false&relatedOnetTitles=false&skills=true&knowledge=false&ability=false&trainingPrograms=false'.format(userId=userId, onetcode=onetcode, state=state)

    headers = {'Authorization': 'Bearer ' + key}

    r = requests.get(url, headers=headers).json()

    if r == None:
        print('Nothing returned')
    else:
        print(r)
    return JsonResponse(r, safe=False)
    