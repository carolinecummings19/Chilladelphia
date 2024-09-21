# main.py
import numpy as np
from connect import connect_to_mongodb, save_analysis_to_mongodb, retrieve_tile_from_mongodb
import numpy as np
import base64
import detectree as dtr
import matplotlib.pyplot as plt
from connect import store_image_in_mongodb  # Your MongoDB interaction module
from PIL import Image
from imageanalysis import analyze_image

# Assume this is the function that retrieves the image as a NumPy array (in another file)
from image_retrieval import get_image_array  

# MongoDB setup
uri = "mongodb+srv://jfrem:jacc@cluster0.nelg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
db_name = "Chilladelphia"
collection_name = "Images"
collection = connect_to_mongodb(uri, db_name, collection_name)


def main():
    # Assuming you already set up the MongoDB collection and connection in store_images.py
    #lol need to actually implement this
    collection = connect_to_mongodb()

    ## MAIN LOOP LOGIC WILL GO HERE !! 
    # Step 1: Get image as a NumPy array (from separate file)
    image_array, tile_id = get_image_array()
    
    # Step 2: Perform analysis (detectree)
    analyzed_image, greenspace_percentage = analyze_image(image_array)


    # Step 3: Store results in MongoDB
    save_analysis_to_mongodb(image_array, analyzed_image, greenspace_percentage, tile_id, collection)

if __name__ == "__main__":
    main()


# EXAMPLE IF NEEDED
# # Example NumPy array representing an image 
# tile_id = 'sample_tile_1'
# tile_array = np.random.randint(0, 256, (100, 100, 3), dtype=np.uint8)  # Random 100x100 RGB image

# # Store the tile image in MongoDB
# store_tile_in_mongodb(tile_id, tile_array, collection)

# # for later, might put in diff file :: 
# # Retrieve and save the tile image from MongoDB
# retrieved_array = retrieve_tile_from_mongodb(tile_id, collection)
# if retrieved_array is not None:
#     save_image_to_disk(retrieved_array, 'retrieved_tile_image.png')





# def analyze_image(image_array):
#     """
#     Analyze the image using detectree to get the greenspace analysis.
    
#     Parameters:
#         image_array (numpy.ndarray): The input image as a NumPy array.
    
#     Returns:
#         numpy.ndarray: The analyzed image (tree/non-tree pixel classification).
#         float: Percentage of greenspace in the image.
#     """
#     # Save the NumPy array as an image temporarily for detectree analysis
#     img = Image.fromarray(image_array.astype('uint8'))
#     img_path = "temp_image.png"
#     img.save(img_path)

#     # Use detectree to classify the image
#     y_pred = dtr.Classifier().predict_img(img_path)

#     # Calculate the percentage of greenspace (tree pixels)
#     greenspace_percentage = np.sum(y_pred == 1) / y_pred.size * 100

#     return y_pred, greenspace_percentage

