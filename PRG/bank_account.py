import datetime

try:
    current_balance = float(input("Zadejte váš zůstatek: "))
    if current_balance < 0:
        print("Zůstatek nemůže být záporný, zůstatek je 0.")
        current_balance = 0
except ValueError:
    print("Špatný vstup, zůstatek je 0.")
    current_balance = 0

history = []


def show_balance(balance):
    print(f"Zůstatek je: {balance} Kč")


def deposit(amount, balance):
    if amount > 0:
        balance += amount
        current_time = datetime.datetime.now().strftime("%d.%m.%Y %H:%M:%S")
        history.append(f"Vklad: {amount} Kč. V čase: {current_time}")
        return balance
    else:
        print("Není možné vložit 0 Kč nebo zápornou částku!")
        history.append(f"Neplatný vklad.")
        return balance


def withdraw(amount, balance):
    if amount > balance:
        print("Nelze vybrat více než je zůstatek.")
        history.append(f"Neplatný výběr: {amount}")
        return balance
    elif amount <= 0:
        print("Zadejte prosím kladné číslo.")
        return balance
    else:
        balance -= amount
        current_time = datetime.datetime.now().strftime("%d.%m.%Y %H:%M:%S")
        history.append(
            f"Výběr: {amount} Kč. V čase: {current_time}")
        return balance


def show_history():
    for data in history:
        print(data)


while True:
    print("1. Zobrazit zůstatek.")
    print("2. Vložit peníze.")
    print("3. Vybrat peníze.")
    print("4. Ukázat historii")
    print("5. Konec")

    volba = input("Váš výběr (1-5): ")

    if volba == "1":
        show_balance(current_balance)
    elif volba == "2":
        amount = float(input("Zadejte částku vkladu: "))
        current_balance = deposit(amount, current_balance)
    elif volba == "3":
        amount = float(input("Zadejte částku výběru: "))
        current_balance = withdraw(amount, current_balance)
    elif volba == "4":
        show_history()
    elif volba == "5":
        break
