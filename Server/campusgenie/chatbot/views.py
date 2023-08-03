from django.shortcuts import render
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import openai, os
from IPython.display import Markdown
import jwt

from llama_index import GPTSimpleVectorIndex
from user.models import Chat
from user.models import Chat_history
from user.models import User
from jwt import decode
from jwt.exceptions import DecodeError
import random
import uuid

# Create your views here.

os.environ["OPENAI_API_KEY"] = "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"

def add_chat_api(request):
    if request.method == 'GET':
        authorization_header = request.headers.get('Authorization')
        if authorization_header:
            accessToken= authorization_header.split(' ')[1]
        else:
            return JsonResponse({'error': 'Access token not provided'})
        if accessToken:
            userId = get_userid_from_access_token(accessToken)
            if userId is not None:
                try:
                    user = User.objects.get(pk=userId)
                    chat = Chat.objects.create(user=user)
                    return JsonResponse({'chatId': chat.id})
                except User.DoesNotExist:
                    return JsonResponse({'error': 'Invalid user id'})
        else:
            return JsonResponse({'error': 'Invalid token'})
    else:
        return JsonResponse({'error': 'Invalid request method'})        
    
def get_chat_list_api(request):
    if request.method == 'GET':
        authorization_header = request.headers.get('Authorization')
        if authorization_header:
            access_token = authorization_header.split(' ')[1]
        else:
            return JsonResponse({'error': 'Access token not provided'})

        if access_token is not None:
            try:
                userId = get_userid_from_access_token(access_token)
                if userId is not None:
                    user = User.objects.get(pk=userId)
                    chats = Chat.objects.filter(user=user)
                    chat_list = []

                    for chat in chats:
                        chat_list.append({
                            'chatId': chat.id
                        })

                    chat_list_length = len(chat_list)
                    return JsonResponse({
                        'chatCount': chat_list_length,
                        'chats': chat_list
                    })
                else:
                    return JsonResponse({'error': 'Invalid access token'})
            except User.DoesNotExist:
                return JsonResponse({'error': 'User not found'})
        else:
            return JsonResponse({'error': 'Access token not provided'})
    else:
        return JsonResponse({'error': 'Invalid request method'})


    
def get_userid_from_access_token(accessToken):
     try:
        decoded_token = jwt.decode(accessToken, verify=False) 
        userId = decoded_token.get('user_id')
        return userId
     except jwt.DecodeError:
        return None

@csrf_exempt
def chatbot_api(request, chatId):
    index = GPTSimpleVectorIndex.load_from_disk('index.json')

    if request.method == 'POST':
        payload = json.loads(request.body)
        authorization_header = request.headers.get('Authorization')
        if authorization_header:
            accessToken= authorization_header.split(' ')[1]
        else:
            return JsonResponse({'error': 'Access token not provided'})
        query = payload.get('query')
        print(query,accessToken,chatId)
        userId = get_userid_from_access_token(accessToken)
        print(query,accessToken,chatId)
        if query and chatId and userId:
            try:
                user = User.objects.get(pk=userId)
                chat = Chat.objects.filter(user=user,id=chatId).first()
                # Save the chat history
                Chat_history.objects.create(chat=chat, text=query, type=0, status=1)
                # Query the chatbot index
                response = index.query(query, response_mode="compact")
                chatbotResponse = response.response

                # Save the chat history with chatbot response
                Chat_history.objects.create(chat=chat, text=chatbotResponse, type=1, status=1)
                return JsonResponse({
                    'chatId': chatId,
                    'chatbotResponse': chatbotResponse
                })
            except User.DoesNotExist:
                return JsonResponse({'error': 'Invalid user id'})
        elif userId and chatId:
            return retrieve_chat_history(userId, chatId)
        else:
            return JsonResponse({'error': 'Invalid request parameters'})
    else:
        return JsonResponse({'error': 'Invalid request method'})

def retrieve_chat_history(userId, chatId):
    try:
        chat = Chat.objects.filter(user=userId, id=chatId).first()
        if chat:
            chatHistory = Chat_history.objects.filter(chat=chat).order_by('created_at')

            # Collect the questions and answers
            history = []
            for entry in chatHistory:
                history.append({
                    'text': entry.text,
                    'type': entry.type
                })

            # Return the chat history
            return JsonResponse({
                'userId': userId,
                'chatId': chatId,
                'history': history
            })
    except Chat_history.DoesNotExist:
        return JsonResponse({'error': 'Chat history not found'})
