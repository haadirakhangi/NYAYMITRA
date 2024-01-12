# NYAYMITRA - Smart India Hackathon 2023

## Introduction
**NYAYMITRA** is an advanced legal platform designed to empower individuals with knowledge about their rights and legalities under Indian laws. Leveraging cutting-edge technology, the platform offers a range of features, including a Know-Your-Rights chatbot, document retrieval, legal insights, and more.
![image](https://github.com/haadirakhangi/Smart-India-hackathon-2023/assets/95705972/93ecb945-d917-4d46-9e84-5ab7f722a405)


### Personal Assistant


### Webscrapping Latest News
![image](https://github.com/haadirakhangi/Smart-India-hackathon-2023/assets/95705972/9b27ce1a-a430-4411-ba1c-43bb30c690d7)



### Feature Page 
![image](https://github.com/haadirakhangi/Smart-India-hackathon-2023/assets/95705972/d57dfe11-4bf4-450d-b162-c642965f286e)



### Lawbot


### Document Summarization/QNA


### Narrative Legalism


### Document Drafting



### Advocaate Connect Page
![image](https://github.com/haadirakhangi/Smart-India-hackathon-2023/assets/95705972/fbb4b94e-7629-492d-b532-91610d5fa03a)


### Admin Dashboard
![image](https://github.com/haadirakhangi/Smart-India-hackathon-2023/assets/95705972/e345424c-2afe-45a6-a78e-204b8d32f595)
![image](https://github.com/haadirakhangi/Smart-India-hackathon-2023/assets/95705972/67519998-6710-435c-b69f-292d4676a797)



## Features

### Know-Your-Rights Chatbot/Lawbot
- **Retrieval Augmented Generation Pipeline**: Provides users with specific legal documents and insights based on their queries.

### Document Summarization
- **NyayMitra's Document QNA**: Focuses on the importance of documents, offering insights into each point to consider while creating and reviewing legal documents. This feature helps in nullifying human errors during the document preparation process.

### Narrative Legalism
- **Story-Like Explanations**: Simplifies complex legal concepts through engaging narrative-style content, making legal learning more accessible and engaging for Law Students.

### Multilingual Support
- **Automated Language Detection**: Adapts to users' preferred languages for enhanced accessibility.
- **Text-To-Speech Feature**: Converts text content into speech, catering to users with diverse needs.


### Additional Features
- **Legal Document Drafting**: Enables users to draft essential legal documents efficiently.
- **Advo-Connect**: Offers recommendations for lawyers based on user requirements.
- **Low-Code Approach**: Facilitates easy updates to the vector database, managed by administrators, ensuring the platform remains current and relevant.



## Getting Started
To get started with NYAYMITRA, follow these steps after cloning the repository:

### Setting Up the Client-Side
1. **Navigate to the Client Directory**:
   ```bash
   cd client
   ```

2. **Install Dependencies and Run the Project**:
   ```bash
   npm install
   npm run dev
   ```

### Setting Up the Server-Side
1. **Open a New Terminal Window**.

2. **Navigate to the Server Directory**:
   ```bash
   cd server
   ```

3. **Create and Activate a Virtual Environment**:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use: .\venv\Scripts\activate
   ```

4. **Install Required Python Packages**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Configure Environment Variables**:
   Create a `.env` file in the server directory and define the following environment variables:
   ```env
   SECRET_KEY=YourSecretKeyHere
   OPENAI_API_KEY=YourOpenAIAPIKeyHere
   HUGGING_FACE_API_KEY=YourHuggingFaceAPIKeyHere
   PINECONE_API_KEY_FOR_LAWBOT=YourPineconeAPIKeyHere
   PINECONE_API_KEY_FOR_NARRATIVE=YourPineconeAPIKeyHere
   PINECONE_ENV=YourPineconeEnvironment
   ```

6. **Run the Flask Server**:
   ```bash
   python app.py
   ```

### Running ChainLit for Chatbots
1. **Open new Terminal and Navigate to the Document Drafting Chatbot Directory**:
   ```bash
   cd chatbots/document_drafting
   ```

2. **Run ChainLit for Document Drafting**:
   ```bash
   chainlit run -w ./document_drafting.py --port 8001
   ```

3. **Open new Terminal and Navigate to the Lawbot Chatbot Directory**:
   ```bash
   cd chatbots/lawbot
   ```

4. **Run ChainLit for Lawbot**:
   ```bash
   chainlit run -w ./lawbot.py --port 8002
   ```
   
5. **Open new Terminal and Navigate to the Document Summary Chatbot Directory**:
   ```bash
   cd chatbots/document_sum
   ```
   
6. **Run ChainLit for Document Summarization**:
   ```bash
   chainlit run -w ./document_sum.py --port 8003
   ```
7. **Open new Terminal and Navigate to the Narrative Legalism Chatbot Directory**:
   ```bash
   cd chatbots/narrative_legalism
   ```

8. **Run ChainLit for Narrative Legalism**:
   ```bash
   chainlit run -w ./narrative_legalism.py --port 8004
   ```


## Technology Stack
- **Frontend**: React + Vite + TypeScript
- **Backend**: Flask, ChainLit
- **Database**: SQLite
- **APIs**: OpenAI, Pinecone, Hugging Face

## Contributors
- Haadi Rakhangi - haadirakhangi
- Hatim Mullajiwala - HatimCodeforever
- Vedant Kambli - Vedant-K1
- Mehek Jain - Mehekjain05
- Hashtansh Pandit - Hastansh12
- Meet Vasa - Meet3456
