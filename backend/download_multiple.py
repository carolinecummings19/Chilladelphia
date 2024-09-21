import os
import json
from tiles_downloading import run  # Assuming run function is in tiles_downloading.py
import argparse

def download_images(coordinates_list, zoom):
    print("?")
    for coords in coordinates_list:
        tl, br = coords
        print(f"Downloading image for top-left: {tl}, bottom-right: {br}, zoom: {zoom}")
        
        # Set environment variables as strings
        os.environ['TL'] = f"{tl[0]},{tl[1]}"  # Convert tuple to string
        os.environ['BR'] = f"{br[0]},{br[1]}"  # Convert tuple to string
        os.environ['ZOOM'] = str(zoom)
        
        # Call the run function
        run()
def generate_tiles(bounds, tile_size):
    lat1, lon1 = bounds['top_left']
    lat2, lon2 = bounds['bottom_right']

    # Calculate the number of tiles in the latitude and longitude directions
    lat_steps = int((lat2 - lat1) / tile_size)
    lon_steps = int((lon2 - lon1) / tile_size)

    tiles = []
    # Logic to generate tile coordinates based on zoom level and tile size
    # This is just a pseudo-logic; you'll need to calculate based on actual tile coordinates
    for i in range(lat_steps):
        for j in range(lon_steps):
            # Calculate the top-left and bottom-right corners of each tile
            tl_lat = lat1 + i * tile_size
            tl_lon = lon1 + j * tile_size
            br_lat = tl_lat + tile_size
            br_lon = tl_lon + tile_size
            
            tiles.append(((tl_lat, tl_lon), (br_lat, br_lon)))

    return tiles

if __name__ == "__main__":
    # Example coordinates
    # get area of university city distric
    
    
    # Example coordinates (these would come from a proper dataset)
    '''
    district_bounds = {
        "top_left": (39.96732026099557, -75.22841031009875),
        "bottom_right": (39.93206492547633, -75.18108859557856)
    }
    '''
    if os.path.isfile(prefs_path):
        run()
    else:
        with open(prefs_path, 'w', encoding='utf-8') as f:
            json.dump(default_prefs, f, indent=2, ensure_ascii=False)

        print(f'Preferences file created in {prefs_path}')
    print("hello")
    parser = argparse.ArgumentParser(description="Download satellite images for a given district.")
    parser.add_argument("--top-left", nargs=2, type=float, required=True,
                        help="Top-left corner coordinates (latitude longitude)")
    parser.add_argument("--bottom-right", nargs=2, type=float, required=True,
                        help="Bottom-right corner coordinates (latitude longitude)")
    parser.add_argument("--tile-size", type=float, default=0.0033,
                        help="Size of the tiles in degrees (default: 0.0033)")
    parser.add_argument("--zoom", type=int, default=19,
                        help="Zoom level for the images (default: 19)")

    args = parser.parse_args()

    district_bounds = {
        "top_left": (args.top_left[0], args.top_left[1]),
        "bottom_right": (args.bottom_right[0], args.bottom_right[1])
    }
    tiles = generate_tiles(district_bounds, tile_size=0.0033)  # Example values

    download_images(tiles, 19)
