import os
from dotenv import load_dotenv

import torch

from langchain.llms import OpenAI
from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate, PromptTemplate, HumanMessagePromptTemplate, SystemMessagePromptTemplate
from langchain.retrievers import ParentDocumentRetriever
from langchain.document_loaders import PyPDFLoader, DirectoryLoader, UnstructuredFileLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import HuggingFaceBgeEmbeddings
from langchain.vectorstores import Pinecone, FAISS
from langchain.memory import ConversationBufferWindowMemory
from langchain.chains import LLMChain, RetrievalQA, ConversationalRetrievalChain
from langchain.storage import LocalFileStore
from langchain.storage._lc_store import create_kv_docstore
import openai
import pinecone
from lingua import Language, LanguageDetectorBuilder
import iso639
from deep_translator import GoogleTranslator
import os
import nltk

current_script_directory = os.path.dirname(os.path.abspath(__file__))

load_dotenv()


PINECONE_API_KEY = os.getenv("PINECONE_API_KEY_FOR_NARRATIVE")
PINECONE_ENV = os.getenv("PINECONE_ENV")
PINECONE_INDEX_NAME = 'narrative'
DETECTOR = LanguageDetectorBuilder.from_all_languages().with_preloaded_language_models().build()

pinecone.init(
    api_key= PINECONE_API_KEY,
    environment= PINECONE_ENV,
)

DEVICE_TYPE = 'cuda' if torch.cuda.is_available() else 'cpu'

# Loading BGE Embeddings From HuggingFace
EMBEDDING_MODEL_NAME = "BAAI/bge-large-en-v1.5"
EMBEDDINGS = HuggingFaceBgeEmbeddings(
    model_name= EMBEDDING_MODEL_NAME,
    model_kwargs={'device': DEVICE_TYPE},
    encode_kwargs={'normalize_embeddings': True}# Set True to compute cosine similarity
)

def narrative_legalism_chain(vectordb):
    llm = ChatOpenAI(model_name="gpt-3.5-turbo-1106", temperature=0.0)

    system_message_prompt = SystemMessagePromptTemplate.from_template(
    """
        You are a legal storyteller, that explains every legal concept, law or article asked by the user in a story-like 
        and narrative way based on the context provided to you. You create a hypothetical scenario to better explain the law 
        to the user. You will be given legal context about the Indian laws based on the user query, and your task is to use 
        the relevant information from the legal context to create a hypothetical scenario/example or a simple story in order to
        explain that law to the user. User Question: \n{question} \n\n Legal context: \n{context}
    """
)
    human_message_prompt = HumanMessagePromptTemplate.from_template(
        "{question}"
    )


    memory = ConversationBufferWindowMemory(k=15, memory_key="chat_history", return_messages=True)

    retriever = vectordb.as_retriever(k=10)
    chain = ConversationalRetrievalChain.from_llm(
        llm=llm,
        retriever=retriever,
        memory=memory,
        combine_docs_chain_kwargs={
            "prompt": ChatPromptTemplate.from_messages([
                system_message_prompt,
                human_message_prompt,
                ]),
            },
    )

    return chain

def detect_source_langauge(text):
    detected_language = str(DETECTOR.detect_language_of(text)).split('.')[1].title()
    print('Detected Language', detected_language)
    source_language = iso639.Language.from_name(detected_language).part1
    
    return source_language