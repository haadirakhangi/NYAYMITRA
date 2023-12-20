import chainlit as cl
import requests
import sys 
import os
current_script_directory = os.path.dirname(os.path.abspath(__file__))
chatbots_directory = os.path.abspath(os.path.join(current_script_directory, '..'))
server_side_directory = os.path.abspath(os.path.join(chatbots_directory, '..'))
sys.path.append(server_side_directory)
from chatbots.utils import *
openai.api_key = os.environ.get("OPENAI_API_KEY")

# full_doc_retriever = get_parent_docs_retriever(PINECONE_INDEX_NAME, EMBEDDINGS, LOCAL_FILE_STORE_PATH, CHILD_SPLITTER)
vectordb = Pinecone.from_existing_index(PINECONE_INDEX_NAME, EMBEDDINGS, text_key='key')

@cl.on_chat_start
def start_chat():
    # chain = nyaymitra_kyr_chain(full_doc_retriever)

    # chain = nyaymitra_kyr_chain_with_local_llm(vectordb)
    chain = nyaymitra_kyr_chain(vectordb)
    # chain = nyaymitra_kyr_chain_with_gpt4all(vectordb)
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
    final_answer = response.get('answer')
    source_documents = response.get('source_documents', [])
    source_pdfs = [source_document.metadata['source'] for source_document in source_documents]
    print('RESPONSE:', response)
    print('SOURCE DOCUMENTS:',source_pdfs)
    filenames_without_path = [os.path.basename(filename) for filename in source_pdfs]
    filename_counts = {}
    for filename in filenames_without_path:
        if filename in filename_counts:
            filename_counts[filename] += 1
        else:
            filename_counts[filename] = 1

    # Find the filename with the maximum count
    most_common_filename = max(filename_counts, key=filename_counts.get)
    print("Most repeating File:-",most_common_filename)
    # Extract the most common filename into a variable
    result_filename = most_common_filename
    # Extracting Glossary
    glossary_text = ''
    preprocessed_text = list(set(preprocess_text(final_answer)))
    # print('PREPROCESSED_TEXT', preprocessed_text)
    glossary =  [value.lower() for value in list(GLOSSARY.keys())]
    # print("Glossary",glossary)
    for i in preprocessed_text:
        if i.lower()+" " in glossary:
            print('Its there', i)
            glossary_text +="<b>" + i.title() + " : " + "</b>" + GLOSSARY[i.title()+" "] + "<br/> "
        else:
            print("No glossary",i)
    final_answer = final_answer + '\n\n' + glossary_text
    if source_lang != 'en':
        trans_output = GoogleTranslator(source='auto', target=source_lang).translate(final_answer)
    else:
        trans_output = final_answer
    # Sql Database
    # data = {}
    # data['query']=trans_query
    # data['mostcommon']=most_common_filename
    # response = requests.post('http://127.0.0.1:5000/category', json=data,headers = {"Content-Type": "application/json"})
    # if response.status_code == 200:
    #     print('Response from Flask server:', response.text)
    # else:
    #     print('Error occurred:', response.status_code)

    text_elements = []
    if source_documents:
        for source_idx, source_doc in enumerate(source_documents):
            source_name = f"source_{source_idx}"
            # Create the text element referenced in the message
            text_elements.append(
                cl.Text(content=source_doc.page_content, name=source_name)
            )
        source_names = [text_el.name for text_el in text_elements]

        if source_names:
            trans_output += f"\nSources: {', '.join(source_names)}"
        else:
            trans_output += "\nNo sources found"


    await cl.Message(content=trans_output,author="Tool 1",elements=text_elements).send()

