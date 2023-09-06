# Calorie Click

This project, part of the Machine Learning and Software Engineering Course at Thapar Institute of Engineering and
Technology, is a Machine
Learning based Web Application which aims to provide a platform for users to track their calorie intake and maintain a
healthy lifestyle by taking pictures of their food and getting the calorie count of the food item.

# Table of Contents

[Dowloading Images](#downloading-images)
[Dataset Creation](#dataset-creation)

## Downloading Images

Check out the [scraper](scraper) folder for more details. But as a basic overview, the images are downloaded from
[Google Images](https://www.google.com/imghp?hl=en) . The images are downloaded by using the
[get_dataset.py](scraper/get_dataset.py) file. The images terms to be searched are stored in
the [food.txt](scraper/food.txt) file. The images are downloaded by using the following command:

```bash
python scraper/get_dataset.py
```

## Dataset Creation

To organise we can use the script writen in the [split_categories.py](Dataset/split_categories.py) file in
the [Dataset](Dataset) folder.
using the following command:

```bash
python Dataset/split_categories.py
```

# License

[Apache License 2.0](./LICENSE)