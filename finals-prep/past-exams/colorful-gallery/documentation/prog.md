# Program

[⬅️ Zpět na hlavní přehled](../README.md)

## Popis problematiky

Cílem této části bylo vytvořit program v jazyce Python, který funguje jako kalkulačka pro vyhodnocování jednoduchých matematických výrazů v postfixové (reverzní polské) notaci (RPN). Hlavní logiku zajišťuje funkce `evaluate_rpn(expression)`. Ta načte vstupní výraz, rozdělí ho na jednotlivé znaky (čísla a operátory) a zpracovává je pomocí datové struktury zásobník (LIFO).

Program je důkladně ošetřen proti možným chybám. Kontroluje, zda je v zásobníku při volání operátoru dostatek čísel, striktně zabraňuje dělení nulou a ověřuje, zda po dokončení celého výpočtu zůstala v zásobníku právě jedna výsledná hodnota. Pokud narazí na jakýkoliv nestandardní stav, výpočet přeruší a vrátí uživateli srozumitelnou chybovou hlášku.

## Výsledky práce

Při testování programu s platnými i neplatnými vstupy vrací aplikace správné výsledky a úspěšně předchází pádům programu:

- Výraz `5 1 2 + 4 * + 3 -` správně vrátí hodnotu `14.0`.
- Výraz `8 3 * 2 /` správně vrátí hodnotu `12.0`.

## Klíčové zdrojové kódy

Níže je uvedena klíčová část kódu, která se stará o zpracování operátorů a samotný výpočet. Pomocí modulu `operator` jsou mapovány textové znaky na konkrétní matematické operace.

```python
ops = {
    '+': operator.add,
    '-': operator.sub,
    '*': operator.mul,
    '/': operator.truediv
}
for token in tokens:
    if token in ops:
        # Kontrola dostatku operandů pro matematickou operaci
        if len(stack) < 2:
            return "Chyba: Nedostatek operandů (čísel) pro operaci."

        b = stack.pop()
        a = stack.pop()

        # Ošetření zakázaného dělení nulou
        if token == '/' and b == 0:
            return "Chyba: Nelze dělit nulou."

        # Samotné provedení operace a vložení výsledku zpět na vrchol zásobníku
        result = ops[token](a, b)
        stack.append(result)
```
