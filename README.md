# NYAYMITRA - Smart India Hackathon 2023

... [Previous Sections Remain the Same]

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
   cd chatbots/narrative_legalism
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
