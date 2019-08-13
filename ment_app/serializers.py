from rest_framework import serializers 
from .models import Career, Mentor, BlogPost

class BlogPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = BlogPost
        fields = ('title', 'description', 'body', 'date', 'mentor')

class MentorSerializer(serializers.ModelSerializer):
    posts = BlogPostSerializer(many=True, read_only=True)

    class Meta:
        model = Mentor
        fields = ('name', 'profession', 'advice_topics', 'image_url', 'company', 'email', 'career', 'posts')

class CareerSerializer(serializers.ModelSerializer):
    mentors = MentorSerializer(many=True, read_only=True)

    class Meta:
        model = Career
        fields = ('career_field', 'occupations', 'description', 'skills', 'education', 'employers', 'job_data', 'mentors')