from django import forms 
from django.conf import settings
import requests

# TO DO: DELETE THIS
# form to search for nearby youth job programs
class YouthProgramForm(forms.Form):
    location = forms.CharField(max_length=255)
    radius = forms.IntegerField()

    def search(self):
        result = {}
        # returning the data entered into the form
        location = self.cleaned_data['location']
        radius = self.cleaned_data['radius']
        userId = settings.CAREERONESTOP_ID
        endpoint = 'https://api.careeronestop.org/v1/youthprogramfinder/{userId}/{location}/{radius}'
        url = endpoint.format(userId=userId, location=location, radius=radius)
        # careeronestop asked for this info in the request header
        headers = {'Authorization': 'Bearer ' + settings.CAREERONESTOP_KEY}
        response = requests.get(url, headers=headers)
        if response.status_code == 200:
            result = response.json()
            result['success'] = True 
        else:
            result['success'] = False 
            if response.status_code == 404:
                result['message'] = 'No youth programs found in this area. Try searching a larger radius.'
            else:
                result['message'] = 'The CareerOneStop API is not available at the moment. Please try again later.'
        return result