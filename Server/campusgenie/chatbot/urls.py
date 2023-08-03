from django.contrib import admin
from django.urls import path, include
from . import views
from .views import chatbot_api
from .views import get_chat_list_api
from .views import add_chat_api

urlpatterns = [
    path('add/',add_chat_api, name='add'),
    path('chat/<int:chatId>', chatbot_api, name='chat'),
    path('chatlist/', get_chat_list_api, name='chatlist')
    
]