# 08. Závěr

[`Zpět na hlavní přehled (README.md)`](../README.md)

## Zhodnocení projektu

Projekt _Beam of Fear_ se podařilo úspěšně dokončit a naplnit tak původní vizi atmosférické hororovky z pohledu první osoby. Hlavní cíl – vytvořit fungující herní smyčku se sběrem kostek a vyhýbáním se monstru – byl splněn.

## Největší úskalí a jejich řešení

Během vývoje se objevilo několik technických výzev, z nichž největší se týkala animací nepřítele:

- **Problém s animací monstra:** Monstrum (stažený asset) po určité době ve hře zničehonic leželo na zemi a nereagovalo. Zhruba 1 až 2 hodiny jsem se snažil problém vyřešit přes skripty (např. resetováním historie animací), protože jsem předpokládal chybu v kódu.
- **Odhalení a řešení:** Nakonec jsem se ve hře schoval do bezpečné zóny (kabiny) a monstrum delší dobu jen pozoroval. Zjistil jsem, že asset měl v Animatoru nastavený loop, který přehrával různé pohyby (chůze, padání, vstávání), až nakonec došel k finální "death" animaci, po které už monstrum nevstalo. Problém tedy nebyl v mém skriptu, ale v defaultním nastavení animátoru assetu, které stačilo upravit.

## Výsledek

Výsledkem je plně hratelný a napínavý zážitek. Projekt mi přinesl cenné zkušenosti s prací v Unity – od nastavování audia a designu herních mechanik až po debugging a práci s cizími assety.
