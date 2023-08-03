from django.contrib import admin
from django.urls import path, include
from . import views
from .views import userCreateApi
from .views import loginApi
from .views import googleLoginApiView
from .views import view_profile
from .views import view_header

urlpatterns = [
    path('signin/', loginApi.as_view(), name='login'),
    path('signup/', userCreateApi.as_view(), name='sign-up'),
    path('register-with-google/', googleLoginApiView.as_view(), name='register-with-google'),
    path('profile/', view_profile, name='viewprofile'),
    path('header/', view_header, name='viewheader'),
]

