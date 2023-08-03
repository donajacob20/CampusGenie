from rest_framework import serializers
from django.contrib.auth import authenticate
from user.models import User
from django.core.validators import EmailValidator
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
import re
from django.forms import PasswordInput
from rest_framework.views import APIView
from rest_framework.response import Response
from google.oauth2 import id_token
from google.auth.transport import requests
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

class userSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=50)
    firstname = serializers.CharField(max_length=50)
    lastname =serializers. CharField(max_length=50)
    email = serializers.CharField(validators=[EmailValidator()])
    dob = serializers.DateField(required=False, allow_null=True)
    gender = serializers.CharField(max_length=1, required=False, allow_null=True)
    password = serializers.CharField(write_only=True, required = False)

    class Meta:
        model = User
        fields = ['username', 'firstname', 'lastname', 'email', 'dob', 'password', 'status', 'type','gender']

    def validate_password(self, password):
        confirm_password = self.initial_data.get('confirm_password')

        if password != confirm_password:
            raise serializers.ValidationError("password and confirm_password do not match")

        # Validate minimum length
        if len(password) < 8:
            raise serializers.ValidationError("The password must be at least 8 characters long.")

        # Validate maximum length
        if len(password) > 16:
            raise serializers.ValidationError("The password can be maximum 16 characters long.")


        # Validate at least one uppercase, one lowercase, one special character, and one number
        if not re.search(r'[A-Z]', password):
            raise serializers.ValidationError("The password must contain at least one uppercase letter.")
        if not re.search(r'[a-z]', password):
            raise serializers.ValidationError("The password must contain at least one lowercase letter.")
        if not re.search(r'[!@#$%^&*()+=.\-_\[\]]', password):
            raise serializers.ValidationError("The password must contain at least one special character.")
        if not re.search(r'[0-9]', password):
            raise serializers.ValidationError("The password must contain at least one number.")

        return password

    
    def validate_email(self, email):
        if not re.match(r'^[\w.@+-]{1,20}@[a-zA-Z0-9.-]{1,25}\.[a-zA-Z]{1,5}$', email):
            raise serializers.ValidationError("Enter a valid email address.")
        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("User email is already registered.")
        return email
    
    def validate_gender(self, gender):
        valid_genders = ['M', 'F', 'O']  # Valid gender choices

        if gender not in valid_genders:
            raise serializers.ValidationError("Invalid gender. Choose from 'M', 'F', 'O'.")

        return gender
    
    def create(self, validated_data):
        password = validated_data.pop('password')
        print('password', password)
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user

class loginSerializer(serializers.Serializer):
    email= serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            print(email,password)
            user = authenticate(email=email, password=password)
            if not user:
                try:
                    User.objects.get(email=email)
                except User.DoesNotExist:
                    raise serializers.ValidationError('email does not exist.')

                raise serializers.ValidationError('Invalid email or password.')
        return data
