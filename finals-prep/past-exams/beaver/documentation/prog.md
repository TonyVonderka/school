# Program

[⬅️ Zpět na hlavní přehled](../README.md)

## Popis problematiky

Program v Pythonu načte jména bobrů a nor z připravených JSON souborů. Pomocí metody `assign_holes` následně každému bobrovi náhodně přidělí jednu noru.

## Klíčové kódy

Metoda **`assign_holes`** nejdříve nastaví proměnnou `evidence` na prázdný seznam (list). Dále zkontroluje, zda proměnná `holes` obsahuje nějaká data – pokud ne, do konzole se vypíše upozornění, že nejsou k dispozici žádné nory. Po této kontrole projde pomocí cyklu `for` proměnnou `beavers` a každému bobrovi pomocí `random.choice(self.holes)` vybere náhodnou noru. Poté se do proměnné `evidence` přidá tento spárovaný údaj jako n-tice (tuple).

```python
    def assign_holes(self) -> None:
        """Náhodně přiřadí každému bobrovi jednu z dostupných nor."""
        self.evidence = []

        if not self.holes:
            print("Nejsou k dispozici žádné nory pro přiřazení!")
            return

        for beaver in self.beavers:
            random_hole = random.choice(self.holes)
            self.evidence.append((beaver, random_hole))
```

---

Pomocná chráněná (protected) metoda **`_load_json`** nám pomáhá dodržet princip DRY a zabraňuje opakování kódu. Bez ní bychom museli psát úplně stejný blok pro načítání souborů jak do metody `load_beavers`, tak i do `load_holes`.

```python
    def _load_json(self, filename: str) -> list[str]:
        """Interní/chráněná metoda pro bezpečné načtení dat z JSON souboru."""
        path = os.path.join(current_file, filename)
        try:
            with open(path, 'r', encoding="utf-8") as file:
                return json.load(file)
        except FileNotFoundError:
            print(f"Chyba: Soubor {filename} nebyl nalezen.")
            return []
```

## Ukázka výstupu

Výsledek, který se nám vypsal do konzole po spuštění programu:

```txt
Bobr jménem Karel bydlí v Nora pod dubem.
Bobr jménem Lojza bydlí v Velká nora.
Bobr jménem Berta bydlí v Nora pod dubem.
Bobr jménem Ferda bydlí v Nora u jezu.
Bobr jménem Emanuel bydlí v Nora u jezu.
```
