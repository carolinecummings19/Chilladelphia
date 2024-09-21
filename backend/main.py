# main.py

import numpy as np
from connect import connect_to_mongodb, store_tile_in_mongodb, retrieve_tile_from_mongodb, save_image_to_disk

# MongoDB setup
uri = "mongodb+srv://jfrem:jacc@cluster0.nelg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
db_name = "Chilladelphia"
collection_name = "Images"
collection = connect_to_mongodb(uri, db_name, collection_name)

# Example NumPy array representing an image 
tile_id = 'sample_tile_1'
tile_array = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)  # Random 100x100 RGB image

# Store the tile image in MongoDB
store_tile_in_mongodb(tile_id, tile_array, collection)

# for later, might put in diff file :: 
# Retrieve and save the tile image from MongoDB
retrieved_array = retrieve_tile_from_mongodb(tile_id, collection)
if retrieved_array is not None:
    save_image_to_disk(retrieved_array, 'retrieved_tile_image.png')
