from django.db import models

# Create your models here.
class Career(models.Model):
    career_field = models.CharField(max_length=500)
    occupations = models.CharField(max_length=500)
    # description = models.TextField()
    onetcode = models.CharField(max_length=100, default='29-1171.00')
    state = models.CharField(max_length=100, default='GA')
    skills = models.CharField(max_length=500)
    education = models.CharField(max_length=500)
    employers = models.CharField(max_length=500)
    job_data = models.TextField()

    def __str__(self):
        return self.career_field

class Mentor(models.Model):
    name = models.CharField(max_length=500)
    profession = models.CharField(max_length=500)
    # TO DO: change advice field to choices field
    advice_topics = models.CharField(max_length=500)
    # TO DO: change image url to image field
    image_url = models.CharField(max_length=500)
    company = models.CharField(max_length=500)
    # TO DO: change email to email field
    email = models.CharField(max_length=500)
    career = models.ForeignKey(Career, on_delete=models.CASCADE, related_name='mentors')

    def __str__(self):
        return self.profession

class BlogPost(models.Model):
    title = models.CharField(max_length=500)
    description = models.TextField()
    body = models.TextField()
    # TO DO: change date to date field
    date = models.CharField(max_length=500)
    mentor = models.ForeignKey(Mentor, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title

