# Web Scraper

The function of the webscraper is to find images related to a given search term (in our case indian food). It reads the
name of the food from a central text file and then searches for images of that food. It then downloads the images and
saves them to a folder in the parent directory called 'assets'. The images are saved with the name of the food and a
number to differentiate between the images.

## How to use

```bash
python download_images.py
```