# import the necessary packages
import requests
import os
import bs4

num_of_images = 630  # max limit for Google before it hallucinates
num_pages = (num_of_images // 20) + 1


def text_to_list(filename):
    with open(filename, "r") as f:
        lot = f.read().splitlines()
    return lot


def get_url(lot):
    base_url = {}
    for term in lot:
        base_url[
            term
        ] = f"https://www.google.com/search?q={term}&sca_esv=563020551&ie=UTF-8&tbm=isch&ei=AEL4ZN6BJ5HYseMP18eb6Ac&start=0&sa=N"
    return base_url


def get_images_google(base_url, noi):
    # make sure to press the next button so that the images are loaded
    for term in base_url:
        list_of_urls = []
        url = base_url[term]
        print("Loading Pages...")
        for i in range(num_pages):
            try:
                html = requests.get(url)
                soup = bs4.BeautifulSoup(html.text, "html.parser")
                if i % 10 == 0:
                    print("Loaded Page: ", i)
                links = list(soup.find_all("img"))
                list_of_urls.extend(links)
                url = f"https://www.google.com/search?q={term}&sca_esv=563020551&ie=UTF-8&tbm=isch&ei=AEL4ZN6BJ5HYseMP18eb6Ac&start={20*(i+1)}&sa=N"
            except Exception as e:
                print(e)
                break

        i = 0
        for _, link in enumerate(list_of_urls):
            if i < noi:
                img_url = link.get("src")
                try:
                    img = requests.get(img_url)
                except:
                    continue
                p_dir = os.path.abspath(os.path.join(os.pardir, "images"))
                term_dir = os.path.join(p_dir, term)
                os.makedirs(term_dir, exist_ok=True)
                image_filename = os.path.join(term_dir, term + str(i) + ".jpg")
                with open(image_filename, "wb") as f:
                    f.write(img.content)
                    if i % 100 == 0:
                        print("Downloaded: ", term + str(i) + ".jpg")
                    i += 1


if __name__ == "__main__":
    list_of_terms = text_to_list("food.txt")
    base_url_ = get_url(list_of_terms)
    get_images_google(base_url_, num_of_images)
