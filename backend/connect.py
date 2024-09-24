from pymongo import MongoClient
from PIL import Image
import io
import base64
from dotenv import load_dotenv
import numpy as np
from io import BytesIO

# Function to connect to MongoDB/initialize collection
def connect_to_mongodb(uri, db_name, collection_name):
    client = MongoClient(uri)
    db = client[db_name]
    collection = db[collection_name]
    return collection


def save_analysis_to_mongodb(image_array, analyzed_image, greenspace_percentage, tile_id, collection):
    """
    Store the original image, analyzed image, and greenspace percentage in MongoDB.
    
    Parameters:
        image_array (numpy.ndarray): The original image as a NumPy array.
        analyzed_image (numpy.ndarray): The analyzed image as a NumPy array.
        greenspace_percentage (float): Percentage of greenspace in the image.
        collection: The MongoDB collection.
    """
    # Convert NumPy arrays to image bytes for storage
    original_img = Image.fromarray(image_array.astype('uint8'))
    analyzed_img = Image.fromarray(analyzed_image.astype('uint8'))

    # Convert images to base64-encoded strings
    buffer_original = BytesIO()
    buffer_analyzed = BytesIO()
    original_img.save(buffer_original, format="PNG")
    analyzed_img.save(buffer_analyzed, format="PNG")

    encoded_original = base64.b64encode(buffer_original.getvalue()).decode('utf-8')
    encoded_analyzed = base64.b64encode(buffer_analyzed.getvalue()).decode('utf-8')

    # Store the data in MongoDB
    document = {
        "original_image": encoded_original,
        "analyzed_image": encoded_analyzed,
        "greenspace_percentage": greenspace_percentage,
        "tile_id": tile_id
    }
    collection.insert_one(document)
    print("Analysis stored in MongoDB.")

    
def retrieve_tile_from_mongodb(tile_id, collection):
    tile = collection.find_one({'tile_id': tile_id})

    if tile:
        # Decode the base64 image data back into binary
        image_data = base64.b64decode(tile['image'])

        # Convert binary image data to a NumPy array
        image = Image.open(io.BytesIO(image_data))
        tile_array = np.array(image)

        # Encode the image back to base64 for JSON response
        buffered = io.BytesIO()
        image.save(buffered, format="PNG")  # or another format like "JPEG"
        encoded_image = base64.b64encode(buffered.getvalue()).decode('utf-8')

        # Construct the JSON response
        response = {
            "tile_id": tile_id,
            "image": encoded_image
        }
        return response
    else:
        print(f"No tile found with tile_id: {tile_id}")
        return None



