import os

def convert_jpeg_to_jpg(image_dir):
    """
    Converts all .jpeg image files to .jpg in the specified directory.

    Args:
        image_dir (str): The path to the directory containing the images.
    """
    if not os.path.isdir(image_dir):
        print(f"Error: Directory '{image_dir}' does not exist.")
        return

    for filename in os.listdir(image_dir):
        if filename.lower().endswith(".jpeg"):
            jpeg_filepath = os.path.join(image_dir, filename)
            jpg_filename = filename[:-5] + ".jpg" # Remove ".jpeg" and add ".jpg"
            jpg_filepath = os.path.join(image_dir, jpg_filename)

            try:
                os.rename(jpeg_filepath, jpg_filepath)
                print(f"Renamed '{filename}' to '{jpg_filename}'")
            except OSError as e:
                print(f"Error renaming '{filename}': {e}")

if __name__ == "__main__":
    image_directory = r"C:\Users\Dizzy\Documents\Github\thg.isaiart.com\images" # Use raw string to avoid backslash issues
    convert_jpeg_to_jpg(image_directory)
    print("Conversion process completed.")