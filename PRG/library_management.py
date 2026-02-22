# book_name = input("Napište název knihy: ")

# try:
#     number_of_pages = int(input("Napište počet stran: "))

#     if book_name == "":
#         print("Nebyl zadán název knihy")
#     elif number_of_pages <= 0:
#         print("Kniha nemůže mít 0 nebo záporný počet stránek.")
#     elif number_of_pages < 150:
#         print(f"{book_name} je krátká kniha.")
#     else:
#         print(f"{book_name} je dlouhá kniha.")

# except ValueError:
#     print("Počet stran musí být číslo, ne text")

books = [
    {"name": "Romeo a Julie",
     "author": "William Shakespeare",
     "pages": 160},
    {"name": "Krysař",
     "author": "Viktor Dyk",
     "pages": 120},
    {"name": "Obsluhoval jsem anglického krále",
     "author": "Bohumil Hrabal",
     "pages": 200}
]


def add_book(book_name, author, pages):
    books.append({
        "name": book_name,
        "author": author,
        "pages": pages
    })


def get_all_books():
    for book in books:
        print(
            f"{book["name"]}, autor: {book["author"]}, počet stran: {book["pages"]}")


def get_biggest_book():
    current_biggest = books[0]
    biggest_books = []
    for book in books:
        if book["pages"] > current_biggest["pages"]:
            current_biggest = book
            biggest_books = [book]
        elif book["pages"] == current_biggest["pages"]:
            biggest_books.append(book)
        else:
            continue

    names = [book["name"] for book in biggest_books]

    print(f"Nejdelší kniha je/jsou: {", ".join(names)} ")


add_book("Malý princ", "Antoine de Saint-Exupéry", 104)
get_all_books()
get_biggest_book()
