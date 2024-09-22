import numpy as np
import matplotlib.pyplot as plt
from detectree import Classifier
import cv2
import os
import tempfile

def analyze_image(original_image_np):
    print("Starting image analysis")
    
    # Convert BGR/BGRA to RGB
    if original_image_np.shape[2] == 3:  # BGR
        rgb_image = cv2.cvtColor(original_image_np, cv2.COLOR_BGR2RGB)
    elif original_image_np.shape[2] == 4:  # BGRA
        rgb_image = cv2.cvtColor(original_image_np, cv2.COLOR_BGRA2RGB)
    else:
        raise ValueError("Unexpected number of channels")

    # Initialize the DetecTree classifier
    classifier = Classifier()

    # Use a context manager for the temporary file
    with tempfile.NamedTemporaryFile(suffix=".png", delete=False) as temp_file:
        temp_filename = temp_file.name
        cv2.imwrite(temp_filename, cv2.cvtColor(rgb_image, cv2.COLOR_RGB2BGR))

    try:
        # Predict using the temporary image file
        y_pred = classifier.predict_img(temp_filename)
        # Ensure y_pred is a binary mask
        if y_pred.dtype != bool:
            y_pred_binary = (y_pred > 0.5).astype(bool)
        else:
            y_pred_binary = y_pred
        # Calculate greenspace percentage
        total_pixels = float(y_pred_binary.size)
        green_pixels = float(np.sum(y_pred_binary))
        greenspace_percentage = (green_pixels / total_pixels) * 100.0
        '''
        print(f"Green pixels: {green_pixels}")
        print(f"Total pixels: {total_pixels}")
        print(f"Raw percentage: {green_pixels / total_pixels}")
        '''

        return y_pred, greenspace_percentage

    except Exception as e:
        print(f"An error occurred during image analysis: {str(e)}")
        return None, 0

    finally:
        # Clean up the temporary file
        try:
            os.unlink(temp_filename)
        except Exception as e:
            print(f"Failed to delete temporary file: {str(e)}")

# Example usage
# image_np = ... # Your numpy array image in BGR or BGRA format
# analyzed_image, percentage = analyze_image(image_np)
# if analyzed_image is not None:
#     print(f"Greenspace percentage: {percentage:.2f}%")
# else:
#     print("Image analysis failed")
