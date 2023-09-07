# find the intersection of the files in the Dataset/ Train, test and Validate folders

import os

items = os.listdir(os.path.abspath(os.path.join("images")))
train, test, validate = set(), set(), set()
for item in items:
    if item == "README.md":
        continue
    train.update(os.listdir(os.path.abspath(os.path.join("Dataset", "Train", item))))
    test.update(os.listdir(os.path.abspath(os.path.join("Dataset", "Test", item))))
    validate.update(
        os.listdir(os.path.abspath(os.path.join("Dataset", "Validate", item)))
    )
print("Train and Test: ", train.intersection(test))
print("Train and Validate: ", train.intersection(validate))
print("Test and Validate: ", test.intersection(validate))
print("Train, Test and Validate: ", train.intersection(test, validate))
