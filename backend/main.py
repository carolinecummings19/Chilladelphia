# main.py
from connect import connect_to_mongodb, save_analysis_to_mongodb
# from imageanalysis import analyze_image

# Assume this is the function that retrieves the image as a NumPy array (in another file)
from tiles_downloading import generate_tiles, image_helper, image_loop 
from imageanalysis import analyze_image
import os

# MongoDB setup
uri = os.getenv("MONGODB_URI")
db_name = "chilladelphia"
collection_name = "Images_UCD"



def main():

    collection = connect_to_mongodb(uri, db_name, collection_name)

    bounds = {"top_left": ("39.96692188369096, -75.22932603582633"),
              "bottom_right": ("39.933299037825826, -75.18443658719465")}
    tiles = generate_tiles(bounds, tile_size=0.002)
    
    for tile in tiles:
        tl, br = tile
        image_array, tile_id, lat1, lon1, lat2, lon2 = image_helper(tl,br,19)
        analyzed_image, greenspace_percentage = analyze_image(image_array)

        print(greenspace_percentage)
        save_analysis_to_mongodb(image_array, analyzed_image, greenspace_percentage, tile_id, collection, lat1, lon1, lat2, lon2)

    print("reached")

if __name__ == "__main__":
    main()


