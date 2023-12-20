import chainlit as cl
import requests
import sys 
import os
current_script_directory = os.path.dirname(os.path.abspath(__file__))
chatbots_directory = os.path.abspath(os.path.join(current_script_directory, '..'))
server_side_directory = os.path.abspath(os.path.join(chatbots_directory, '..'))
sys.path.append(server_side_directory)
from chatbots.utils import *

# full_doc_retriever = get_parent_docs_retriever(PINECONE_INDEX_NAME, EMBEDDINGS, LOCAL_FILE_STORE_PATH, CHILD_SPLITTER)
vectordb = Pinecone.from_existing_index(PINECONE_INDEX_NAME, EMBEDDINGS, text_key='key')

@cl.on_chat_start
def start_chat():
    # chain = nyaymitra_kyr_chain(full_doc_retriever)
    # chain = nyaymitra_kyr_chain_with_local_llm(vectordb)
    chain = document_drafting_chain()
    cl.user_session.set("chain", chain)

@cl.on_message
async def main(message: cl.Message):
    source_lang = detect_source_langauge(message.content)
    if source_lang != 'en':
        trans_query = GoogleTranslator(source=source_lang, target='en').translate(message.content)
    else:
        trans_query = message.content
    print('Translated Query', trans_query)

    await cl.Avatar(
        name="Tool 1",
        path="./public/logo_.png",
    ).send()
    chain = cl.user_session.get("chain")
    cb = cl.AsyncLangchainCallbackHandler()
    response = await chain.acall(trans_query, callbacks=[cb])
    print(response)
    final_answer = response.get('text')
    if source_lang != 'en':
        trans_output = GoogleTranslator(source='auto', target=source_lang).translate(final_answer)
    else:
        trans_output = final_answer

    await cl.Message(content=trans_output,author="Tool 1").send()

