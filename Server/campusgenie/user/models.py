from django.db import models
from django.core.validators import EmailValidator


# Create your models here.

from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    GENDER_CHOICES = [
        ('M', 'Male'),
        ('F', 'Female'),
        ('O', 'Other'),
    ]
    id=models.AutoField(primary_key=True)
    firstname=models.CharField(max_length=50)
    lastname=models.CharField(max_length=50)
    username=models.CharField(max_length=50, unique=True)
    email=models.EmailField(max_length=50, unique=True, validators=[EmailValidator()])
    dob=models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=1, choices=GENDER_CHOICES, null=True, blank=True)
    password = models.CharField(max_length=150, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)
    status = models.SmallIntegerField(null=True, blank=True)
    type = models.SmallIntegerField(null=True, blank=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['firstname','lastname']

class Chat(models.Model):
    id=models.AutoField(primary_key=True)
    user=models.ForeignKey('User', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now_add=True)

class Chat_history(models.Model):
    MESSAGE_TYPE_CHOICES = [
        (0, 'question'),
        (1, 'answer'),
    ]
    MESSAGE_STATUS_CHOICES = [
        (0, 'Active'),
        (1, 'Inactive'),
    ]
    
    id = models.AutoField(primary_key=True)
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE)
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    type = models.IntegerField(choices=MESSAGE_TYPE_CHOICES)
    status = models.SmallIntegerField(choices=MESSAGE_STATUS_CHOICES)


    REQUIRED_FIELDS = ['text']


    

     
