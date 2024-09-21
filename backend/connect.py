from pymongo import MongoClient
from PIL import Image
from io import BytesIO
import base64
from dotenv import load_dotenv
import numpy as np

# Function to connect to MongoDB
def connect_to_mongodb(uri, db_name, collection_name):
    client = MongoClient(uri)
    db = client[db_name]
    collection = db[collection_name]
    return collection

# ctore in mongo
def store_tile_in_mongodb(tile_id, tile_array, collection):
    # Convert NumPy array to an image (e.g., PNG)
    image = Image.fromarray(np.uint8(tile_array))

    # Create a BytesIO buffer to save the image in-memory
    buffered = io.BytesIO()
    image.save(buffered, format="PNG")

    # Convert image to base64 encoding to store in MongoDB
    encoded_image = base64.b64encode(buffered.getvalue()).decode('utf-8')

    # Insert the tile metadata and image into MongoDB
    tile_document = {
        'tile_id': tile_id,
        'image': encoded_image  # Store the image as base64 encoded string
    }
    collection.insert_one(tile_document)
    print(f"Tile {tile_id} stored successfully.")

# Function to retrieve a NumPy array (image) from MongoDB
def retrieve_tile_from_mongodb(tile_id, collection):
    tile = collection.find_one({'tile_id': tile_id})

    if tile:
        # Decode the base64 image data back into binary
        image_data = base64.b64decode(tile['image'])

        # Convert binary image data to a NumPy array
        image = Image.open(io.BytesIO(image_data))
        tile_array = np.array(image)
        return tile_array
    else:
        print(f"No tile found with tile_id: {tile_id}")
        return None


#not sure if this is needed? but we have a function for saving to disk

# def save_image_to_disk(image_array, filename):
#     # Convert NumPy array back to image and save it
#     image = Image.fromarray(np.uint8(image_array))
#     image.save(filename)
#     print(f"Image saved to {filename}")



