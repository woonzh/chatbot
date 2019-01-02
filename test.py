#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 15:32:17 2019

@author: zhenhao
"""

import dialogflow_v2beta1 as dialogflow
from google.cloud import storage
from google_auth_oauthlib import flow
import os
#
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./chatbot-227401-d305c01775c2.json"
#
session_client = dialogflow.SessionsClient()
session = session_client.session_path('chatbot-227401', '123qwdqwqwd')

text='What are the hazards'

text_input = dialogflow.types.TextInput(text=text, language_code='en-US')
query_input = dialogflow.types.QueryInput(text=text_input)
response = session_client.detect_intent(session=session, query_input=query_input)

answer=response.query_result.fulfillment_text

print(response)


#curl -H "Content-Type: application/json; charset=utf-8"  -H 
#"Authorization: Bearer ya29.c.ElqFBpc9WqxgVRi8NTQexUR5DMHG35pBCpt0DN7jhhm-AS6--
#xOepdPgfY4M1661rSMewfT0yBGbKVLp1gDgnsXNjYBvObKe-_Fx2B6z6JdzUlON7VSN8o8MXpo"  -d 
#"{\"queryInput\":{\"text\":{\"text\":\"what is the support required\",\"languageCode\":\"en\"}},\
#"queryParams\":{\"timeZone\":\"Asia/Singapore\"}}" 
#"https://dialogflow.googleapis.com/v2beta1/projects/chatbot-227401/agent/sessions/37fde8e6-90db-08d0-03ef-d2ae8b321fb7:detectIntent"