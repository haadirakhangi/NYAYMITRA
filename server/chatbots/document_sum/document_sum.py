import os
import sys
import io
import time
import shutil
from dotenv import load_dotenv

current_script_directory = os.path.dirname(os.path.abspath(__file__))
chatbots_directory = os.path.abspath(os.path.join(current_script_directory, '..'))
server_side_directory = os.path.abspath(os.path.join(chatbots_directory, '..'))
sys.path.append(server_side_directory)

from chatbots.utils import *
from langchain.memory import ConversationBufferMemory
import chainlit as cl
from gtts import gTTS

load_dotenv()

def text_to_speech(text, language='en', directory='audio_files'):
    if not os.path.exists(directory):
        os.makedirs(directory)
    # Create a gTTS object
    speech = gTTS(text=text, lang=language, slow=False)
    # Specify the file path including the directory to save the MP3 file
    file_path = os.path.join(directory, 'text.mp3')
    # Save the speech to the specified file path
    speech.save(file_path)
    return file_path

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
# full_doc_retriever = get_parent_docs_retriever(PINECONE_INDEX_NAME, EMBEDDINGS, LOCAL_FILE_STORE_PATH, CHILD_SPLITTER)

@cl.on_chat_start
async def on_chat_start():
    directory_faiss = "faiss_index"
    directory = "user_data"

    if os.path.exists(directory_faiss):
      shutil.rmtree(directory_faiss)
      print(f"The directory {directory_faiss} has been deleted.")
    else:
      print(f"The directory {directory_faiss} does not exist.")

    files = None
    while files == None:
        files = await cl.AskFileMessage(
            content="Please upload pdf/docx files to begin!",
            accept=["application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
            max_files= 5,
            max_size_mb=50,
            timeout=180,
        ).send()
    msg = cl.Message(content="")
    await msg.send()
    await cl.sleep(2)
    for file in files:
        file_buffer = io.BytesIO(file.content)
        if not os.path.exists(directory):
            os.makedirs(directory)

        # Creating The Directory For Faiss Index
        if not os.path.exists(directory_faiss):
            os.makedirs(directory_faiss)

        with open(os.path.join(directory, file.name), "wb") as local_file:
            local_file.write(file_buffer.getvalue())

        # Wait Until The File Is Downloaded
        while not os.path.exists(os.path.join(directory, file.name)):
            time.sleep(1)

    faiss_vectordb = create_faiss_vectordb_for_document_qna()
    pinecone_vectordb = Pinecone.from_existing_index(index_name= PINECONE_INDEX_NAME, embedding=EMBEDDINGS)

    if os.path.exists(directory):
        shutil.rmtree(directory)
        print(f"The directory {directory} has been deleted.")
    else:
        print(f"The directory {directory} does not exist.")
  
    llm = ChatOpenAI(model='gpt-3.5-turbo-1106',temperature=0)
    system_message_prompt = SystemMessagePromptTemplate.from_template(
            "I want you to act as a law agent, understanding all laws and related jargon, and explaining them in a simpler and descriptive way. Return a list of all the related LAWS drafted and provided in the Context for the user_input question and provide proper penal codes if applicable from the ingested PDF, and explain the process and terms in a simpler way. Dont go beyond the context of the pdf please be precise and accurate. The context is:\n{context}\n\n This is the extra textbook context provided to you. User both the information to answer user query. TEXTBOOK CONTEXT:{textbook_context}. {human_input}"
        )
    human_message_prompt = HumanMessagePromptTemplate.from_template(
            "{question}"
        )
    memory = ConversationBufferMemory(memory_key='chat_history',input_key='human_input', return_messages=True)
    chain = ConversationalRetrievalChain.from_llm(
            llm=llm,
            retriever=pinecone_vectordb.as_retriever(),
            memory=memory,
            combine_docs_chain_kwargs={
                "prompt": ChatPromptTemplate.from_messages([
                    system_message_prompt,
                    human_message_prompt,
                ]),
            },
        )
    
    print("now ask question")
    # Let the user know that the system is ready
    msg.content = f"Processing Completed. You can now ask questions!"
    await msg.update()
    cl.user_session.set("chain", chain)

@cl.on_message
async def main(message: cl.Message):
    faiss_vectordb = FAISS.load_local('faiss_index',EMBEDDINGS)
    source_lang = detect_source_langauge(message.content)
    if source_lang != 'en':
        trans_query = GoogleTranslator(source=source_lang, target='en').translate(message.content)
    else:
        trans_query = message.content
    print("Translated Query", trans_query)
    textbook_context = faiss_vectordb.similarity_search(message.content)
    chain = cl.user_session.get("chain")  # type: ConversationalRetrievalChain
    res = await chain.arun(question= trans_query, textbook_context = textbook_context, human_input='')
    print("Chatbot Response", res)
    if source_lang != 'en':
        trans_output = GoogleTranslator(source='auto', target=source_lang).translate(res)
    else:
        trans_output = res

    await cl.Message(content=trans_output).send()
    file_path=text_to_speech(trans_output, language=source_lang, directory='audio_files')
    elements = [
        cl.Audio(name="text.mp3", path=file_path, display="inline"),
    ]
    await cl.Message(
        content="Here is an audio file",
        elements=elements,
    ).send()