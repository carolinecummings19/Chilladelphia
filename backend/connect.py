from pymongo import MongoClient
import requests
from PIL import Image
from io import BytesIO
import requests
import json
import base64
import os
from dotenv import load_dotenv

# connecting to mongodb

# Replace <password> and <your-cluster-url> with actual values
client = MongoClient("mongodb+srv://jfrem:jacc@cluster0.nelg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
db = client['Chilladelphia']  # Database name
collection = db['images']       # Collection name


# roken stuff
load_dotenv()

api_token = os.getenv('MAPBOX_TOKEN')
# Your Mapbox access token
access_token = "pk.eyJ1IjoiYW5qYW5hYmVndXIiLCJhIjoiY20xY2IwMHJqMHVlbzJxb2Zvc2FoZmF3dyJ9.WZjcNvnsWKGBPh0W7vsB0w"

# Coordinates for West Philadelphia (example)
longitude = -75.2376
latitude = 39.9542
zoom = 15.79  # Adjust zoom level as needed
width = 300   # Image width in pixels
height = 200  # Image height in pixels

# Construct the API URL
url = f"https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/{longitude},{latitude},{zoom},0/{width}x{height}?access_token={access_token}"

# Make the GET request
response = requests.get(url)

# Check if the request was successful
if response.status_code == 200:
    # Open the image
    image = Image.open(BytesIO(response.content))
    # Save the image
    image.save("satellite_image.png")
    print("Image saved as 'satellite_image.png'")
    image.show()
else:
    print(f"Error: {response.status_code} - {response.text}")




#PUTTING IN MONGODB

# Function to download an image tile and store it in MongoDB
def store_tile_in_mongodb(tile, collection):
    tile_id = tile['entityId']
    tile_url = tile['downloadUrl']  # The actual download URL might be in another field

    # Download the image data
    response = requests.get(tile_url)
    if response.status_code == 200:
        image_data = response.content
        
        # Convert image to base64 encoding to store in MongoDB
        encoded_image = base64.b64encode(image_data).decode('utf-8')

        # Insert the tile metadata and image into MongoDB
        tile_document = {
            'tile_id': tile_id,
            'metadata': tile,   # Store all available metadata
            'image': encoded_image  # Store the image as base64 encoded string
        }
        collection.insert_one(tile_document)
        print(f"Tile {tile_id} stored successfully.")
    else:
        print(f"Failed to download tile {tile_id}")

# Loop over tiles and store each one in MongoDB
for tile in tiles:
    store_tile_in_mongodb(tile, collection)


# TO GET FROM MONGODB

# Query a tile from MongoDB based on some metadata
tile = collection.find_one({'tile_id': '<tile_id>'})

# Decode the base64 image data back into binary
image_data = base64.b64decode(tile['image'])

# Optionally, save the image to disk or display it
with open('tile_image.jpg', 'wb') as img_file:
    img_file.write(image_data)

