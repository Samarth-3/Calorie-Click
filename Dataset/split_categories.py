import os
import shutil
import random

items = os.listdir(os.path.abspath(os.path.join(os.pardir, "images")))
# create the folders
os.makedirs("Train", exist_ok=True)
os.makedirs("Test", exist_ok=True)
os.makedirs("Validate", exist_ok=True)

for item in items:
    if item == "README.md":
        continue
    os.makedirs(os.path.join("Train", item), exist_ok=True)
    os.makedirs(os.path.join("Test", item), exist_ok=True)
    os.makedirs(os.path.join("Validate", item), exist_ok=True)

for item in items:
    if item == "README.md":
        continue
    images = os.listdir(os.path.abspath(os.path.join(os.pardir, "images", item)))
    random.shuffle(images)
    num_images = len(images)
    num_train = int(0.7 * num_images)
    num_test = int(0.2 * num_images)
    num_validate = int(0.1 * num_images)
    train_images = images[:num_train]
    test_images = images[num_train: num_train + num_test]
    validate_images = images[num_train + num_test:]
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
