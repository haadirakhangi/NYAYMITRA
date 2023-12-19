import pandas as pd
from server import create_app, db  # Assuming create_app is the function that creates your Flask app
from datetime import datetime
from server.models import Advocate  # Assuming the Advocate model is defined in a 'models' module

app = create_app()  # Call your create_app function to get the Flask app instance

# Use app.app_context() to ensure the code runs within the application context
with app.app_context():
    engine = db.get_engine()
    csv_file_path = r'C:\Users\Hastansh\OneDrive\Desktop\Smart-India-hackathon-2023\server\data_with_columns_states_pins_corrected.csv'

    with open(csv_file_path, 'r') as file:
        df = pd.read_csv(file,index_col=False)
    df = df.drop(columns=['Unnamed: 0'])

    df.to_sql('advocate', con=engine, if_exists='append', index=False)
