# import the necessary packages
import requests
import os
import bs4

num_of_images = 150


def text_to_list(filename):
    with open(filename, "r") as f:
        lot = f.read().splitlines()
    return lot


def get_url(lot):
    base_url = {}
    for term in lot:
        base_url[term] = (
            "https://www.google.com/search?q=" + term + "&source=lnms&tbm=isch"
        )
    return base_url


def get_images(base_url, noi):
    for term in base_url:
        # get the url of the images
        url = base_url[term]
        # get the html of the url
        html = requests.get(url)
        # create a soup object
        soup = bs4.BeautifulSoup(html.text, "html.parser")
        # get the links of the images
        links = soup.find_all("img")
        # create a directory for the images
        # download the images
        i = 0
        for _, link in enumerate(links):
            if i < noi:
                # get the url of the image
                img_url = link.get("src")
                # download the image
                try:
                    img = requests.get(img_url)
                except:
                    print("Error downloading image: ", term + str(i) + ".jpg")
                    continue
                # save the image
                p_dir = os.path.abspath(os.path.join(os.pardir, "images"))
                term_dir = os.path.join(p_dir, term)
                os.makedirs(term_dir, exist_ok=True)
                image_filename = os.path.join(term_dir, term + str(i) + ".jpg")
                with open(image_filename, "wb") as f:
                    f.write(img.content)
                    print("Image downloaded: ", term + str(i) + ".jpg")
                    i += 1


if __name__ == "__main__":
    list_of_terms = text_to_list("food.txt")
    base_url_ = get_url(list_of_terms)
    get_images(base_url_, num_of_images)
