from rest_framework import viewsets
from django.shortcuts import render
from .serializers import CareerSerializer, MentorSerializer, BlogPostSerializer
from .models import Career, Mentor, BlogPost
from .forms import YouthProgramForm
from django.http import JsonResponse
import requests 


class CareerView(viewsets.ModelViewSet):
    queryset = Career.objects.all()
    serializer_class = CareerSerializer

class MentorView(viewsets.ModelViewSet):
    queryset = Mentor.objects.all()
    serializer_class = MentorSerializer

class BlogPostView(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer


# def youth_program(request):
#     search_result = {}
#     if 'location' and 'radius' in request.GET:
#         form = YouthProgramForm(request.GET)
#         if form.is_valid():
#             search_result = form.search()
#     else:
#         form = YouthProgramForm()
#     return render(request, 'components/YouthProgramForm', {'form': form, 'search_result': search_result})

# pipenv install requests
# import requests

def get_youth_programs(request):
    url = 'https://api.careeronestop.org/v1/youthprogramfinder/4pUtE9Nb1oWToXh/GA/25/0/0/0/10'
    headers = {'Authorization': 'Bearer Kw0dxrHlk9scXFl2RzjzjJTVKKXH6QR6/d2n4Aijlil1cVIEm8h0dystL8FEwsLg6OMEc6//sqZS4Iu9VU8Tgg=='}

    r = requests.get(url, headers=headers).json()

    if r == None:
        print('Nothing returned')
    else:
        print(r)
    return JsonResponse(r, safe=False)
