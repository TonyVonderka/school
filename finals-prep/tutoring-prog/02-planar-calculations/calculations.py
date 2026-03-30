import math


# Funkce pro výpočet vzdálenosti
def distance(p1: tuple[float, float], p2: tuple[float, float]) -> float:
    # Výpočet rozdílu souřadnic
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    # Výpočet vzdálenosti pomocí Pythagorovy věty
    return math.sqrt(dx**2 + dy**2)


# Funkce pro obvod kružnice
def circle_circumference(p1: tuple[float, float], p2: tuple[float, float]) -> float:
    # Získání poloměru zavoláním funkce distance
    r = distance(p1, p2)
    # Výpočet obvodu kružnice: 2 * π * r
    return 2 * math.pi * r


# Funkce pro obvod pravoúhlého čtyřúhelníku
def rectangle_perimeter(p1: tuple[float, float], p2: tuple[float, float]) -> float:
    # Určení délek stran jako absolutní rozdíl souřadnic
    # Tím se vyhneme záporným délkám
    side_x = abs(p2[0] - p1[0])
    side_y = abs(p2[1] - p1[1])
    # Výpočet obvodu: 2 * (a + b)
    return 2 * (side_x + side_y)


# Funkce pro bezpečné načtení číselné hodnoty (souřadnice) od uživatele s ošetřením chyb
def get_coordinate(prompt: str) -> float:
    # Nekonečný cyklus, který se ukončí až při platném vstupu
    while True:
        try:
            # Pokus o načtení textu od uživatele a jeho převedení na desetinné číslo
            return float(input(prompt))
        except ValueError:
            # Zachycení výjimky ValueError, pokud uživatel zadá písmena nebo neplatný formát
            print("Neplatný vstup! Zadejte prosím číslo (např. 4 nebo 3.14)")


# TESTOVÁNÍ
if __name__ == "__main__":
    # Načtení souřadnic od uživatele
    print("Zadejte souřadnice prvního bodu:")
    x1 = get_coordinate("x1: ")
    y1 = get_coordinate("y1: ")

    print("Zadejte souřadnice druhého bodu:")
    x2 = get_coordinate("x2: ")
    y2 = get_coordinate("y2: ")

    # Vytvoření bodů jako tuple
    p1 = (x1, y1)
    p2 = (x2, y2)

    # Volání funkcí a ukládání výsledků do proměnných
    dist_result = distance(p1, p2)
    circ_result = circle_circumference(p1, p2)
    rect_result = rectangle_perimeter(p1, p2)

    # Výpis výsledků zaokrouhlených na 2 desetinná místa
    print("\n---- VÝSLEDKY ----")
    print(f"Vzdálenost bodů: {dist_result:.2f}")
    print(f"Obvod kružnice: {circ_result:.2f}")
    print(f"Obvod čtyřúhelníku: {rect_result:.2f}")
