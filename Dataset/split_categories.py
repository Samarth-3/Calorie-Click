import os
import shutil
import random

# create a script that takes images from ../images/{item} and splits them into train, test, and validation sets with the following ratios: 70%, 20%, 10%
# the script should also copy them over to the Test, Train and Validate folders of this directory

# get the list of items
items = os.listdir(os.path.abspath(os.path.join(os.pardir, "images")))
# create the folders
os.makedirs("Train", exist_ok=True)
os.makedirs("Test", exist_ok=True)
os.makedirs("Validate", exist_ok=True)

# create the subfolders
for item in items:
    if item == "README.md":
        continue
    os.makedirs(os.path.join("Train", item), exist_ok=True)
    os.makedirs(os.path.join("Test", item), exist_ok=True)
    os.makedirs(os.path.join("Validate", item), exist_ok=True)

# get the list of images for each item
for item in items:
    if item == "README.md":
        continue
    images = os.listdir(os.path.abspath(os.path.join(os.pardir, "images", item)))
    # shuffle the images
    random.shuffle(images)
    # get the number of images
    num_images = len(images)
    # get the number of images for each set
    num_train = int(0.7 * num_images)
    num_test = int(0.2 * num_images)
    num_validate = int(0.1 * num_images)
    # get the images for each set
    train_images = images[:num_train]
    test_images = images[num_train : num_train + num_test]
    validate_images = images[num_train + num_test :]
    # copy the images to the correct folders
    for image in train_images:
        shutil.copy(
            os.path.abspath(os.path.join(os.pardir, "images", item, image)),
            os.path.abspath(os.path.join("Train", item, image)),
        )
    for image in test_images:
        shutil.copy(
            os.path.abspath(os.path.join(os.pardir, "images", item, image)),
            os.path.abspath(os.path.join("Test", item, image)),
        )
    for image in validate_images:
        shutil.copy(
            os.path.abspath(os.path.join(os.pardir, "images", item, image)),
            os.path.abspath(os.path.join("Validate", item, image)),
        )
