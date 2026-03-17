import math


def distance(p1, p2):
    dx = p2[0] - p1[0]
    dy = p2[1] - p1[1]
    return math.sqrt(dx**2 + dy**2)


def circle_circumference(p1, p2):
    r = distance(p1, p2)
    return 2 * math.pi * r


def rectangle_perimeter(p1, p2):
    side_x = abs(p2[0] - p1[0])
    side_y = abs(p2[1] - p1[1])
    return 2*side_x + 2*side_y


if __name__ == "__main__":
    print("Zadejte souřadnice prvního bodu:")
    x1 = float(input("x1: "))
    y1 = float(input("y1: "))

    print("Zadejte souřadnice druhého bodu:")
    x2 = float(input("x2: "))
    y2 = float(input("y2: "))

    p1 = (x1, y1)
    p2 = (x2, y2)

    dist_result = distance(p1, p2)
    circ_result = circle_circumference(p1, p2)
    rect_result = rectangle_perimeter(p1, p2)

    print("\n--- VÝSLEDKY ---")
    print(f"Vzdálenost bodů:{dist_result:.2f} ")
    print(f"Obvod kružnice:{circ_result:.2f} ")
    print(f"Obvod čtyřúhelníku: {rect_result:.2f}")
