"""
Praktická maturitní zkouška: Karty
Modul: Hlavní program pro evidenci karet a kategorií (OOP)
Autor: Antonín Vonderka
Datum: 2026 / 04
"""

import json
import os


current_directory = os.path.dirname(os.path.abspath(__file__))


class Cards:
    """Třída pro evidenci karet a jejich kategorií."""

    def __init__(self):
        self.cards: list[dict[str]] = []

    def _load_json(self, file_name: str) -> list[dict[str]]:
        """Interní (chráněná) metoda pro bezpečné načtení dat z JSON souboru."""
        path = os.path.join(current_directory, file_name)
        try:
            with open(path, 'r', encoding="utf-8") as f:
                return json.load(f)
        except FileNotFoundError:
            print(f"Chyba: Soubor {file_name} nebyl nalezen.")
            return []

    def load_cards(self, file_name: str) -> None:
        """Načte seznam karet z JSON souboru."""
        self.cards = self._load_json(file_name)

    def __str__(self) -> str:
        """
        Magická metoda pro textovou reprezentaci.
        Zobrazuje informace o kartách a jejich zařazení do kategorií.
        """

        if not self.cards:
            return "Zatím nebyly načteny žádné karty."

        sorted_cards = sorted(self.cards, key=lambda x: x['level'])
        cards_by_category = {}

        for card in sorted_cards:
            name = card.get("name")
            category = card.get("category")

            if category not in cards_by_category:
                cards_by_category[category] = []

            cards_by_category[category].append(name)

        output_lines = []

        for category, card_list in cards_by_category.items():
            output_lines.append(f"Kategorie: {category}")
            for card_name in card_list:
                output_lines.append(f"- {card_name}")
            output_lines.append("")

        return "\n".join(output_lines)


# ---- TESTOVÁNÍ ----
if __name__ == "__main__":
    # Vytvoření instance třídy Cards
    card_deck = Cards()

    # Načtení dat z JSON souboru pomocí metody instance třídy Cards
    card_deck.load_cards("cards.json")

    # Vypsání výsledku do konzole pomocí magické metody (__str__)
    print(card_deck)
