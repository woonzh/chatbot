#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Wed Jan  2 15:32:17 2019

@author: zhenhao
"""

import dialogflow_v2beta1 as dialogflow
import os
os.environ["GOOGLE_APPLICATION_CREDENTIALS"]="./keys/chatbot-227401-d305c01775c2.json"


def main(query):
    session_client = dialogflow.SessionsClient()
    session = session_client.session_path('chatbot-227401', '123qwdqwqwd')
    
    text_input = dialogflow.types.TextInput(text=query, language_code='en-US')
    query_input = dialogflow.types.QueryInput(text=text_input)
    response = session_client.detect_intent(session=session, query_input=query_input)
    
    answer=response.query_result.fulfillment_text
    
    print(response)
    
    return answer