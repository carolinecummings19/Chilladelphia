# main.py
from connect import connect_to_mongodb, save_analysis_to_mongodb
# from imageanalysis import analyze_image

# Assume this is the function that retrieves the image as a NumPy array (in another file)
from tiles_downloading import generate_tiles, image_helper, image_loop 
from imageanalysis import analyze_image

# MongoDB setup
uri = "mongodb+srv://jfrem:jacc@cluster0.nelg2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
db_name = "chilladelphia"
collection_name = "Images_UCD"



def main():
    # Assuming you already set up the MongoDB collection and connection in store_images.py
    #lol need to actually implement this
    # try:
    #     collection = connect_to_mongodb(uri, db_name, collection_name)
    #     print("Connected to MongoDB successfully!")
    # except Exception as e:
    #     print(f"Error connecting to MongoDB: {e}")
    # document = {
    #     "original_image": 1,
    #     "analyzed_image": 2,
    #     "greenspace_percentage": 3
    # }
    # try:
    #     print("reached here")
    #     collection.insert_one(document)
    #     print("Document inserted successfully!")
    # except Exception as e:
    #     print(f"Error inserting document: {e}")

    collection = connect_to_mongodb(uri, db_name, collection_name)

    ## MAIN LOOP LOGIC WILL GO HERE !! 
    # Step 1: Get image as a NumPy array (from separate file)
    bounds = {"top_left": ("39.96692188369096, -75.22932603582633"),
              "bottom_right": ("39.933299037825826, -75.18443658719465")}
    tiles = generate_tiles(bounds, tile_size=0.002)
    
    for tile in tiles:
        tl, br = tile
        image_array, tile_id, lat1, lon1, lat2, lon2 = image_helper(tl,br,19)
            # Step 2: Perform analysis (detectree)
        analyzed_image, greenspace_percentage = analyze_image(image_array)

        print(greenspace_percentage)
        # Step 3: Store results in MongoDB
        save_analysis_to_mongodb(image_array, analyzed_image, greenspace_percentage, tile_id, collection, lat1, lon1, lat2, lon2)

    print("reached")

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

