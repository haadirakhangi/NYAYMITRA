from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from langchain.schema.runnable import Runnable
from langchain.schema.runnable.config import RunnableConfig
from utils import *
import chainlit as cl
from gtts import gTTS

openai.api_key = os.environ.get("OPENAI_API_KEY")

vectordb = Pinecone.from_existing_index(PINECONE_INDEX_NAME, EMBEDDINGS, text_key='key')

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

@cl.on_chat_start
async def on_chat_start():
    chain = narrative_legalism_chain(vectordb)
    cl.user_session.set("chain", chain)


@cl.on_message
async def on_message(message: cl.Message):
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
    res = await chain.acall(trans_query, callbacks=[cb])
    final_answer = res.get('answer')
    if source_lang != 'en':
        trans_output = GoogleTranslator(source='auto', target=source_lang).translate(final_answer)
    else:
        trans_output = final_answer
    cl.user_session.set("trans_output", trans_output)  
    
    await cl.Message(content=trans_output,author="Tool 1").send()
    file_path=text_to_speech(trans_output, language=source_lang, directory='audio_files')
    elements = [
        cl.Audio(name="text.mp3", path=file_path, display="inline"),
    ]
    await cl.Message(
        content="Here is an audio file",
        elements=elements,
    ).send()



# @cl.on_chat_end
# def end():
#     trans_output = cl.user_session.get("trans_output")
#     text_to_speech(trans_output)
