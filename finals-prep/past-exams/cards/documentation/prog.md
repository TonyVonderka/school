# Program

[⬅️ Zpět na hlavní přehled](../README.md)

## Popis problematiky

Program v jazyce Python slouží k načtení herních dat (jméno karty a její kategorie) z externího JSON souboru. Tato data jsou následně zpracována a logicky seřazena od nejběžnější karty po tu nejvzácnější pomocí funkce `sorted()`. O finální výpis do konzole, rozdělený přehledně podle jednotlivých kategorií, se stará magická metoda `__str__`.

## Klíčové zdrojové kódy

### Příprava dat a řazení

V první části magické metody `__str__` nejdříve probíhá kontrola, zda instance vůbec obsahuje nějaká načtená data. Pokud je balíček prázdný, vrátí se varovná zpráva. V opačném případě se karty seřadí podle úrovně (levelu) do nové proměnné `sorted_cards`. Následně program pomocí cyklu `for` prochází seřazené karty a seskupuje je do slovníku `cards_by_category`, kde je klíčem název kategorie a hodnotou seznam (list) názvů karet.

```python
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
```

### Formátování a výpis

Druhá část metody `__str__` se stará o samotný výstup. Cyklus `for` prochází slovník `cards_by_category` pomocí metody `.items()`, která vrací dvojice klíč-hodnota (tedy název kategorie a příslušný seznam karet). Tyto informace se postupně formátují a přidávají do pole `output_lines`. Na závěr metoda vrátí spojený textový řetězec pomocí funkce `.join()`, čímž vznikne čistý a přehledný konzolový výpis.

```python
        output_lines = []

        for category, card_list in cards_by_category.items():
            output_lines.append(f"Kategorie: {category}")
            for card_name in card_list:
                output_lines.append(f"  - {card_name}")
            output_lines.append("")

        return "\n".join(output_lines)
```
