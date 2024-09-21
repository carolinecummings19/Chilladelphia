from pymongo import MongoClient
from PIL import Image
import io
import base64
from dotenv import load_dotenv
import numpy as np

# Function to connect to MongoDB/initialize collection
def connect_to_mongodb(uri, db_name, collection_name):
    client = MongoClient(uri)
    db = client[db_name]
    collection = db[collection_name]
    return collection



# Function to store image in MongoDB
def store_images_in_mongodb(original_image, analyzed_image, greenspace_percentage, tile_id, collection):
    # Encode both original and analyzed images to base64
    original_encoded = base64.b64encode(original_image).decode('utf-8')
    analyzed_encoded = base64.b64encode(analyzed_image).decode('utf-8')

    # Store all details in MongoDB
    document = {
        'tile_id': tile_id,
        'original_image': original_encoded,
        'analyzed_image': analyzed_encoded,
        'greenspace_percentage': greenspace_percentage
    }
    collection.insert_one(document)
    print(f"Images and analysis for {tile_id} stored successfully.")

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



