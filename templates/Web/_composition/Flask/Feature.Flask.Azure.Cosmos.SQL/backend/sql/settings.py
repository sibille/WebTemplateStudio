import os
import dotenv

# Create .env file path.
dotenv_path = os.path.join(os.path.dirname(os.path.dirname(os.path.realpath(__file__))), '.env')

# Load file from the above created path.
dotenv.load_dotenv(dotenv_path)

# Access env file variables.
connection_key = os.getenv('COSMOSDB_URI')
master_key = os.getenv('COSMOSDB_PRIMARY_KEY')