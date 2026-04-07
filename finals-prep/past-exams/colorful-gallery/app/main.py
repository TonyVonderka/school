"""
Praktická maturitní zkouška: Barevná galerie
Modul: Program - RPN Kalkulačka 
Autor: Antonín Vonderka
Datum: 2026 / 04
"""

import operator


def evaluate_rpn(expression: str) -> float | str:
    """Načte výraz v reverzní polské notaci (RPN) a vrátí jeho hodnotu."""
    stack = []
    tokens = expression.split()

    ops = {
        '+': operator.add,
        '-': operator.sub,
        '*': operator.mul,
        '/': operator.truediv
    }
    for token in tokens:
        if token in ops:
            if len(stack) < 2:
                return "Chyba: Nedostatek operandů (čísel) pro operaci."

            b = stack.pop()
            a = stack.pop()

            if token == '/' and b == 0:
                return "Chyba: Nelze dělit nulou."

            result = ops[token](a, b)
            stack.append(result)

        else:
            try:
                stack.append(float(token))
            except ValueError:
                return f"Chyba: Neznámý znak ve výrazu '{token}'."

    if len(stack) != 1:
        return "Chyba: Neplatný výraz (v zásobníku nezbyla po výpočtu právě jedna hodnota)."
    return stack[0]


# ---- TESTOVÁNÍ ----
if __name__ == "__main__":
    # 1. Příklad ze zadání
    vyraz1 = "5 1 2 + 4 * + 3 -"
    print(f"Výraz: '{vyraz1}'")
    print(f"Očekáváno: 14 | Výsledek: {evaluate_rpn(vyraz1)}\n")

    # 2. Příklad ze zadání
    vyraz2 = "8 3 * 2 /"
    print(f"Výraz: '{vyraz2}'")
    print(f"Očekáváno: 12 | Výsledek: {evaluate_rpn(vyraz2)}\n")
