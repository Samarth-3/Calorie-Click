# Dataset Creation

After creating the dataset by using the files in [scraper](../scraper) folder, we need to create the dataset for
training the model. The dataset is created by using the [split_categories.py](split_categories.py) file. The dataset is
created by using the following command:

```bash
python split_categories.py
```

This will create the dataset in the [dataset](../Dataset) folder. It will create the dataset in the following format:

```
dataset
├── Test
│   ├── class1
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   ├── class2
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   └── ...
├── Train
│   ├── class1
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│   ├── class2
│   │   ├── image1.jpg
│   │   ├── image2.jpg
│   │   └── ...
│
└── Validate
    ├── class1
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── ...
    ├── class2
    │   ├── image1.jpg
    │   ├── image2.jpg
    │   └── ...
    └── ...   
```