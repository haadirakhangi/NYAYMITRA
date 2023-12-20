import os
from dotenv import load_dotenv

import torch
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline, AutoModelForSeq2SeqLM, BitsAndBytesConfig, AutoConfig, StoppingCriteria, StoppingCriteriaList
from langchain.output_parsers import PydanticOutputParser
from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, PromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain.retrievers import ParentDocumentRetriever
from langchain.document_loaders import PyPDFLoader, DirectoryLoader, UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.vectorstores import Pinecone, FAISS
from langchain.memory import ConversationBufferWindowMemory,ConversationBufferMemory
from langchain.chains import LLMChain, RetrievalQA, ConversationalRetrievalChain
from langchain.storage import LocalFileStore
from langchain.llms.huggingface_pipeline import HuggingFacePipeline
from langchain.storage._lc_store import create_kv_docstore
from langchain.output_parsers import ResponseSchema, StructuredOutputParser
import openai
import ast
import pinecone
from lingua import Language, LanguageDetectorBuilder
import iso639
from deep_translator import GoogleTranslator
import os
import json
import nltk
import time
import spacy
from transformers import  AutoTokenizer

current_script_directory = os.path.dirname(os.path.abspath(__file__))
load_dotenv()
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY_FOR_LAWBOT")
HUGGINGFACE_API_KEY = os.getenv("HUGGINGFACE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")
PINECONE_INDEX_NAME = 'nyaymitra'
LOCAL_FILE_STORE_PATH = os.path.abspath(os.path.join(current_script_directory, os.pardir, 'local_file_store'))    
CHILD_SPLITTER = RecursiveCharacterTextSplitter(chunk_size=400)        # Splitter For Advanced RAG
DATA_DIRECTORY = os.path.abspath(os.path.join(current_script_directory, os.pardir, 'nyaymitra_data'))      # Directory Consisting Data For Nyaymitra

# Will store the pdfs entered by the user:
USER_DIRECTORY_FOR_DOC_QNA = '../document_sum/user_data'

# file path to store the embeddings in faiss vectore store:
FAISS_INDEX_FILE_PATH = '../document_sum/faiss_index'

# Detector For Language Detection
DETECTOR = LanguageDetectorBuilder.from_all_languages().with_preloaded_language_models().build()

DEVICE_TYPE = 'cuda' if torch.cuda.is_available() else 'cpu'

# Download the spaCy model
model_name = 'en_core_web_lg'
# spacy.cli.download(model_name)

# Loading BGE Embeddings From HuggingFace
EMBEDDING_MODEL_NAME = "BAAI/bge-large-en-v1.5"
EMBEDDINGS = HuggingFaceBgeEmbeddings(
    model_name= EMBEDDING_MODEL_NAME,
    model_kwargs={'device': DEVICE_TYPE},
    encode_kwargs={'normalize_embeddings': True}  # Set True to compute cosine similarity
)

# Load Glossary
with open( os.path.abspath(os.path.join(current_script_directory,'lawbot/glossary.json')), 'r') as f:
   glossary = f.read()
GLOSSARY = json.loads(glossary)

NLP = spacy.load("en_core_web_lg") 

# Initialize Pinecone
pinecone.init(
    api_key= PINECONE_API_KEY,  
    environment= PINECONE_ENV,  
)


# Download Punkt Package
# nltk.download('punkt')

# FUNCTION FOR CREATING INTIAL PINECONE INDEX FROM DIRECTORY
def load_data_to_pinecone_vectorstore(data_directory, index_name, embeddings):
    loader = DirectoryLoader(data_directory, glob="*.pdf", loader_cls=PyPDFLoader)
    data = loader.load()

    text_splitter  = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    docs = text_splitter.split_documents(data)

    if index_name in pinecone.list_indexes():
      pinecone.delete_index(index_name)

    pinecone.create_index(name=index_name, dimension=1024, metric="cosine")

    vectordb = Pinecone.from_documents(documents = docs,index_name = index_name, embedding =embeddings)

    return vectordb

# vectordb = load_data_to_pinecone_vectorstore(DATA_DIRECTORY, PINECONE_INDEX_NAME, EMBEDDINGS)

def add_data_to_pinecone_vectorstore(data_directory, index_name=PINECONE_INDEX_NAME, embeddings=EMBEDDINGS):
    loader = DirectoryLoader(data_directory, glob="*.pdf", loader_cls=PyPDFLoader)
    data = loader.load()
    print("Its inside the pinecone data")
    text_splitter  = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    docs = text_splitter.split_documents(data)

    if index_name in pinecone.list_indexes():
      index = pinecone.Index(index_name)
      vectorstore = Pinecone(
      index = index,
      embedding = embeddings,
      text_key = 'key'    
    )
      vectorstore.add_documents(docs)

    else:
      pinecone.create_index(name=index_name, dimension=1024, metric="cosine")
      vectorstore = Pinecone.from_documents(documents = docs,index_name = index_name, embedding =embeddings)

    print("Vector Embedding Updated")
    return vectorstore

# vectordb = add_data_to_pinecone_vectorstore(NEW_DATA_DIRECTORY, PINECONE_INDEX_NAME, EMBEDDINGS)

def nyaymitra_kyr_chain(vectordb):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo-1106",temperature=0.0,max_tokens=4096)
    system_message_prompt = SystemMessagePromptTemplate.from_template(
       """You are a law expert in India, and your role is to assist users in understanding their rights based on queries related to the provided legal context from Indian documents. Utilize the context to offer detailed responses, citing the most relevant laws and articles. If a law or article isn't pertinent to the query, exclude it. Recognize that users may not comprehend legal jargon, so after stating the legal terms, provide simplified explanations for better user understanding.
        Important Instructions:
        1. Context and Precision: Tailor your response to the user's query using the specific details provided in the legal context from India. Use only the most relevant laws and articles from the context.
        2. Comprehensive and Simplified Responses: Offer thorough responses by incorporating all relevant laws and articles. For each legal term, provide a user-friendly explanation to enhance comprehension.
        3. User-Friendly Language: Aim for simplicity in your explanations, considering that users may not have a legal background. Break down complex terms or phrases to make them more accessible to the user. Provide examples on how the law is relevant and useful to the user's query.
        LEGAL CONTEXT: \n{context}"""
    )
    human_message_prompt = HumanMessagePromptTemplate.from_template("{question}")
    
    prompt_template = ChatPromptTemplate.from_messages([
            system_message_prompt,
            human_message_prompt,
        ])  
    
    retriever = vectordb.as_retriever()
    memory = ConversationBufferWindowMemory(k=15, memory_key="chat_history", output_key='answer', return_messages=True)

    chain = ConversationalRetrievalChain.from_llm(
      llm=llm,
      retriever=retriever,
      memory=memory,
      return_source_documents=True,
      combine_docs_chain_kwargs={"prompt": prompt_template}
    )
    return chain

# from transformers import pipeline, set_hf_api_key
# from getpass import getpass

# # Set your Hugging Face API token
# api_token = getpass("Enter your Hugging Face API token: ")
# set_hf_api_key(api_token)
hf_api_token = os.getenv("HUGGINGFACE_API_KEY")
# def nyaymitra_kyr_chain_with_local_llm(vectordb):
#   llm = HuggingFacePipeline.from_model_id(
#       model_id="meta-llama/Llama-2-7b",
#       api_token="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",
#       task="text-generation",
#       # device = 0 if torch.cuda.is_available() else -1, 
#       pipeline_kwargs={"temperature":0.0, "max_new_tokens": 10, "max_length":1000},
#   )
#   system_message_prompt = SystemMessagePromptTemplate.from_template(
#         """You are a law expert in India, and your role is to assist users in understanding their rights based on queries related to the provided legal context from Indian documents. Utilize the context to offer detailed responses, citing the most relevant laws and articles. If a law or article isn't pertinent to the query, exclude it. Recognize that users may not comprehend legal jargon, so after stating the legal terms, provide simplified explanations for better user understanding.
#           Important Instructions:
#           1. Context and Precision: Tailor your response to the user's query using the specific details provided in the legal context from India. Use only the most relevant laws and articles from the context.
#           2. Comprehensive and Simplified Responses: Offer thorough responses by incorporating all relevant laws and articles. For each legal term, provide a user-friendly explanation to enhance comprehension.
#           3. User-Friendly Language: Aim for simplicity in your explanations, considering that users may not have a legal background. Break down complex terms or phrases to make them more accessible to the user. Provide examples on how the law is relevant and useful to the user's query.
#           LEGAL CONTEXT: \n{context}"""
#   )
#   human_message_prompt = HumanMessagePromptTemplate.from_template("{question}")

#   prompt_template = ChatPromptTemplate.from_messages([
#               system_message_prompt,
#               human_message_prompt,
#           ])
#   prompt_template = ChatPromptTemplate.from_messages([
#               system_message_prompt,
#               human_message_prompt,
#           ])

#   retriever = vectordb.as_retriever()
#   memory = ConversationBufferMemory(k=15, memory_key="chat_history", output_key='answer', return_messages=True)
#   retriever = vectordb.as_retriever()
#   memory = ConversationBufferMemory(k=15, memory_key="chat_history", output_key='answer', return_messages=True)

#   chain = ConversationalRetrievalChain.from_llm(
#         llm=llm,
#         retriever=retriever,
#         memory=memory,
#         return_source_documents=True,
#         combine_docs_chain_kwargs={"prompt": prompt_template}
#       )
#   chain = ConversationalRetrievalChain.from_llm(
#         llm=llm,
#         retriever=retriever,
#         memory=memory,
#         return_source_documents=True,
#         combine_docs_chain_kwargs={"prompt": prompt_template}
#       )
  
#   return chain


# vectordb = Pinecone.from_existing_index(index_name= PINECONE_INDEX_NAME, embedding=EMBEDDINGS)

def detect_source_langauge(text):
    detected_language = str(DETECTOR.detect_language_of(text)).split('.')[1].title()
    print('Detected Language', detected_language)
    source_language = iso639.Language.from_name(detected_language).part1
    
    return source_language

def create_faiss_vectordb_for_document_qna(user_data_directory=USER_DIRECTORY_FOR_DOC_QNA,embeddings=EMBEDDINGS):
  loader = DirectoryLoader(user_data_directory, loader_cls=UnstructuredFileLoader)
  docs = loader.load()
  doc_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
  split_docs = doc_splitter.split_documents(docs)
  texts = [doc.page_content for doc in split_docs]
  print(texts)
  source_language = detect_source_langauge(texts[0])
  if source_language != 'en':
     trans_texts = GoogleTranslator(source=source_language, target='en').translate_batch(texts)
  else:
     trans_texts = texts
  
  print('CREATING EMBEDDINGS FOR USER DOCUMENT')
  vectordb = FAISS.from_texts(trans_texts, embedding=embeddings)
  print('FAISS VECTOR DATABASE CREATED')
  vectordb.save_local(FAISS_INDEX_FILE_PATH)

  return vectordb

def autocategorize_law(file_path, embeddings= EMBEDDINGS):
    loader = UnstructuredFileLoader(file_path=file_path)
    docs = loader.load()
    text_splitter  = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    text_chunks = text_splitter.split_documents(docs)

    vectordb = FAISS.from_documents(documents=text_chunks, embedding=embeddings)
    retriever = vectordb.as_retriever()

    llm = ChatOpenAI(model = 'gpt-3.5-turbo-1106', temperature=0)

    prompt_template = """
    You are a Legal Law agent, Understanding all laws and related jargon.  \
    You will be a given some document and your task is to categorize it in one of the following rights. \
    Format the output in json format using the context and question given below.

    QUESTION: {question}
    CONTEXT: {context}

    Format the output as a dictionary where the keys are "category" and "beneficiary" \
    with their corresponding values. The values of category should be one string, and the beneficiary's value should be a list of strings
    """

    prompt = PromptTemplate(
        template=prompt_template, input_variables=["question", "context"])
    print('I AM HERE')

    qa_chain = RetrievalQA.from_chain_type(
        llm=llm, 
        chain_type="stuff",
        retriever=retriever, 
        verbose=True,
        chain_type_kwargs={"prompt": prompt}
    )
    print("Now there is shit hapeenning")
    query = """
    Categorize the given law document into one of the following categories. After categorizing it, find out the categories of people that are benefited from this law document.
    Labor Rights:Laws related to employment, workers' rights, wages, working conditions, etc\n
    Consumer Rights:Laws protecting consumers in terms of product quality, safety, and fair trade practices\n
    Property Rights:Laws related to ownership, transfer, and use of property\n
    Family Rights:Laws governing marriage, divorce, child custody, and adoption\n
    Civil Rights:Laws protecting individuals from discrimination, ensuring freedom of speech, etc.\n
    Criminal Rights:Laws related to criminal procedures, rights of the 
    accused, etc.\n
    Health and Safety Rights:Laws related to public health, safety regulations, etc.\n
    Environmental Rights:Laws addressing environmental protection and conservation\n
    """

    response = qa_chain.run(query)
    print('RESPONSE:', response)
    output_json = ast.literal_eval(response)
    print('OUTPUT JSON FOR CATEGORIZATION:\n',output_json)
    print('TYPE', type(output_json))
    return output_json

def finetune_for_document_drafting(file_path):
  client = OpenAI()
  finetune_file = client.files.create(file=open(file_path, "rb"), purpose="fine-tune")
  print('File uploaded: ', finetune_file)
  file_id = finetune_file.id
  fine_tuning_model = 'gpt-3.5-turbo-1106'
  job = client.fine_tuning.jobs.create(
    training_file= file_id,
    model= fine_tuning_model
  ) 
  job_id =job.id
  client.fine_tuning.jobs.retrieve(job_id)
  while True:
    status = client.fine_tuning.jobs.retrieve(job_id).status
    time.sleep(0.5)
    print('STATUS',status)
    if status =='succeeded':
      model_id = client.fine_tuning.jobs.retrieve(job_id).fine_tuned_model
      return model_id
    if status in ['failed', 'cancelled']:
       return 'FINETUNING FAILED'
    
def preprocess_text(text, nlp = NLP):
  excluded_tags = {"NOUN", "PROPN"}
  doc = nlp(text)
  filtered_tokens = []
  for token in doc:
      if token.is_stop or token.is_punct or token.pos_ not in excluded_tags:
          continue
      filtered_tokens.append(token.lemma_)
  return (filtered_tokens)

# ------------------------------------------------------ FULL DOCS RETRIEVER -----------------------------------------------
 
# FUNCTION TO CREATE VECTOR DATABASE WITH PARENTS DOCS RETRIEVER
# def load_data_to_pinecone_vectorstore(data_directory, index_name, embeddings, local_file_store_path, child_splitter):
#     """
#     Function to create embeddings for Pinecone database and creating a Parent Document Retriever using a local docstore.
#     Returns: vectorstore: instance of the pinecone vector database
#              store: The instance of LocalFileStore that contains the index which maps the Parent Document to the child document.
#     """
#     loader = DirectoryLoader(data_directory, glob="*.pdf", loader_cls=PyPDFLoader)
#     data = loader.load()

#     text_splitter  = RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
#     docs = text_splitter.split_documents(data)

#     if index_name in pinecone.list_indexes():
#       pinecone.delete_index(index_name)

#     pinecone.create_index(name=index_name, dimension=1024, metric="cosine")

#     index = pinecone.Index(index_name)
#     vectorstore = Pinecone(
#       index = index,
#       embedding = embeddings,
#       text_key = 'key'
#     )

#     file_store = LocalFileStore(local_file_store_path)
#     store = create_kv_docstore(file_store)

#     full_doc_retriever = ParentDocumentRetriever(
#       vectorstore=vectorstore,
#       docstore=store,
#       child_splitter=child_splitter,
#     )

#     print('Creating Embeddings')
#     full_doc_retriever.add_documents(docs, ids=None)
#     print("Vector Database Created")

#     return vectorstore, store

# vectorstore, store = load_data_to_pinecone_vectorstore(DATA_DIRECTORY, INDEX_NAME, EMBEDDINGS, LOCAL_FILE_STORE_PATH, CHILD_SPLITTER)

def get_parent_docs_retriever(index_name, embeddings, local_file_store_path, child_splitter):
  index = pinecone.Index(index_name)
  vectorstore = Pinecone(
    index = index,
    embedding = embeddings,
    text_key = 'key'
  )

  file_store = LocalFileStore(local_file_store_path)
  store = create_kv_docstore(file_store)

  full_doc_retriever = ParentDocumentRetriever(
    vectorstore=vectorstore,
    docstore=store,
    child_splitter=child_splitter,
  )

  return full_doc_retriever

# CHAIN WITH PARENTS DOCS RETRIEVER
def nyaymitra_kyr_chain_with_parent_docs(full_doc_retriever):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo-1106",temperature=0.0,max_tokens=1000)
    system_message_prompt = SystemMessagePromptTemplate.from_template(
       """You are a law expert in India, and your role is to assist users in understanding their rights based on queries related to the provided legal context from Indian documents. Utilize the context to offer detailed responses, citing the most relevant laws and articles. If a law or article isn't pertinent to the query, exclude it. Recognize that users may not comprehend legal jargon, so after stating the legal terms, provide simplified explanations for better user understanding.
        Important Instructions:
        1. Context and Precision: Tailor your response to the user's query using the specific details provided in the legal context from India. Use only the most relevant laws and articles from the context.
        2. Comprehensive and Simplified Responses: Offer thorough responses by incorporating all relevant laws and articles. For each legal term, provide a user-friendly explanation to enhance comprehension.
        3. User-Friendly Language: Aim for simplicity in your explanations, considering that users may not have a legal background. Break down complex terms or phrases to make them more accessible to the user. Provide examples on how the law is relevant and useful to the user's query.
        LEGAL CONTEXT: \n{context}"""
    )
    human_message_prompt = HumanMessagePromptTemplate.from_template("{question}")
    
    prompt_template = ChatPromptTemplate.from_messages([
            system_message_prompt,
            human_message_prompt,
        ])  

    memory = ConversationBufferWindowMemory(k=15, memory_key="chat_history", return_messages=True)

    chain = ConversationalRetrievalChain.from_llm(
      llm=llm,
      retriever=full_doc_retriever,
      # input_key="query",
      # return_source_documents=True,
      memory=memory,
      combine_docs_chain_kwargs={"prompt": prompt_template}
    )
    return chain

def document_drafting_chain():
    llm = ChatOpenAI(openai_api_key=os.getenv('OPENAI_API_KEY_DOCUMENT_DRAFTING'),model_name="ft:gpt-3.5-turbo-1106:codeomega::8Xo32rwF",temperature=0)
    system_message_prompt = SystemMessagePromptTemplate.from_template(
       """LawYantra is a factual chatbot which generates the complete legal document according to the user query."""
    )
    human_message_prompt = HumanMessagePromptTemplate.from_template("{question}")
    
    prompt_template = ChatPromptTemplate.from_messages([
            system_message_prompt,
            human_message_prompt,
        ])  
    memory = ConversationBufferWindowMemory(k=15, memory_key="chat_history", return_messages=True)

    chain = LLMChain(
      prompt=prompt_template,
      llm=llm,
      memory=memory,
    )
    return chain