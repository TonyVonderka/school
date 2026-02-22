cinema = [
    {"line": "A",
     "seat": 1,
     "reservation": False},
    {"line": "A",
     "seat": 2,
     "reservation": False},
    {"line": "B",
     "seat": 1,
     "reservation": False},
    {"line": "B",
     "seat": 2,
     "reservation": False}
]


def get_all_seats():
    for seat in cinema:
        if seat["reservation"]:
            print(f"Místo {seat['line']}{seat['seat']}, stav: obsazeno")
        else:
            print(f"Místo {seat['line']}{seat['seat']}, stav: volno")


def get_free_seats():
    for seat in cinema:
        if not seat["reservation"]:
            print(
                f"Místo {seat['line']}{seat['seat']} je dostupné k rezervaci.")


def reserve_seat(line, seat_number):
    for seat in cinema:
        if seat["line"] == line and seat["seat"] == seat_number:
            if not seat["reservation"]:
                seat["reservation"] = True
                print(f"Místo {line}{seat_number} bylo úspěšně zarezervováno.")
            else:
                print(f"Místo {line}{seat_number} už je obsazené.")
            return
    print("Místo neexistuje.")


reserve_seat("A", 1)
get_free_seats()
get_all_seats()
