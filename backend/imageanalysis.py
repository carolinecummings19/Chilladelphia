# this file is for analyzing the images and getting percentages
import detectree as dtr
import numpy as np

# Function to analyze image and calculate greenspace percentage
def analyze_image(original_image_np):
    # Use the pre-trained model to segment the image into tree/non-tree pixels
    y_pred = dtr.Classifier().predict_img(original_image_np)

    # Calculate the percentage of greenspace (tree pixels)
    greenspace_pixels = np.sum(y_pred == 1)  # Assuming 1 corresponds to 'tree'
    total_pixels = y_pred.size
    greenspace_percentage = (greenspace_pixels / total_pixels) * 100

    return y_pred, greenspace_percentage

