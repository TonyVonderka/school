"""
Praktická maturitní zkouška: Bobr
Modul: Hlavní program pro evidenci bobrů a nor (OOP)
Autor: Antonín Vonderka
Datum: 2026 / 04
"""

import json
import random
import os


current_directory = os.path.dirname(os.path.abspath(__file__))


class Lokalita:
    """Třída pro evidenci bobrů a jejich nor v dané lokalitě."""

    def __init__(self):
        self.beavers: list[str] = []
        self.holes: list[str] = []
        self.evidence: list[tuple[str, str]] = []

    def _load_json(self, file_name: str) -> list[str]:
        """Interní (chráněná) metoda pro bezpečné načtení dat z JSON souboru."""
        path = os.path.join(current_directory, file_name)
        try:
            with open(path, 'r', encoding="utf-8") as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"Chyba: Soubor {file_name} nebyl nalezen.")
            return []

    def load_beavers(self, file_name: str) -> None:
        """Načte seznam bobrů z JSON souboru."""
        self.beavers = self._load_json(file_name)

    def load_holes(self, file_name: str) -> None:
        """Načte seznam nor z JSON souboru."""
        self.holes = self._load_json(file_name)

    def assign_holes(self) -> None:
        """Náhodně přiřadí každému bobrovi jednu z dostupných nor."""
        self.evidence = []

        if not self.holes:
            print("Nejsou k dispozici žádné nory pro přiřazení!")
            return

        for beaver in self.beavers:
            random_hole = random.choice(self.holes)
            self.evidence.append((beaver, random_hole))

    def __str__(self) -> str:
        """Textová reprezentace instance třídy pro výpis."""
        if not self.evidence:
            return "Zatím žádný bobr nebydlí v žádné noře."

        lines = [
            f"Bobr jménem {beaver} bydlí v {hole}." for beaver, hole in self.evidence]
        return "\n".join(lines)


# ---- TESTOVÁNÍ ----
if __name__ == "__main__":
    # Vytvoření instance třídy Lokalita
    beaver_habitat = Lokalita()

    # Načtení dat z JSON souborů pomocí metod instance třídy Lokalita
    beaver_habitat.load_beavers("beavers.json")
    beaver_habitat.load_holes("holes.json")

    # Přirazení náhodných nor bobrům
    beaver_habitat.assign_holes()

    # Vypsání výsledku do konzole pomocí magické metody (__str__)
    print(beaver_habitat)
