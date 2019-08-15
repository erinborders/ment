from rest_framework import serializers 
from .models import Career, Mentor, BlogPost
from .forms import YouthProgramForm

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('id', 'title', 'description', 'body', 'date', 'mentor')

class MentorSerializer(serializers.ModelSerializer):
    posts = BlogPostSerializer(many=True, read_only=True)

    class Meta:
        model = Mentor
        fields = ('id', 'name', 'profession', 'advice_topics', 'image_url', 'company', 'email', 'career', 'posts')

class CareerSerializer(serializers.ModelSerializer):
    mentors = MentorSerializer(many=True, read_only=True)

    class Meta:
        model = Career
        fields = ('id', 'career_field', 'occupations', 'description', 'skills', 'education', 'employers', 'job_data', 'mentors')

class YouthProgramFormSerializer(serializers.ModelSerializer):
    # TO DO: CHECK IF I NEED THIS SERIALIZER
    class Meta:
        model = YouthProgramForm
        fields = ('name', 'Address1', 'Address2', 'City', 'StateAbbr', 'Zip', 'Phone', 'ProgramType')