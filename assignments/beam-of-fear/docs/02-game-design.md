# 02. Game design

[`Zpět na hlavní přehled (README.md)`](../README.md)

## Cíl hry

Nasbírat **5 kostek** rozházených po mapě. Po jejich sebrání hráč vítězí.

## Prostředí

**Mapa:** Temný les o rozměrech 100x100.  
**Bezpečná zóna:** Na mapě se nachází jedna kabina. Do této kabiny monstrum nemá přístup a hráč je zde v bezpečí.

## Herní mechaniky a pravidla

### Hráč

- Může se pohybovat po mapě a používat baterku pro lepší viditelnost.

### Monstrum

- Jakmile je monstrum v okruhu cca 15 metrů od hráče, objeví se na obrazovce varovný text.
- Hráč musí okamžitě **vypnout baterku a úplně se zastavit**. Pokud se hýbe nebo svítí, pokus o úkryt selže.
- Jakmile splní tyto dvě podmínky a stiskne klávesu `Q`, varovný text se změní na **odpočet času**.
- Po úspěšném držení `Q` po dobu 2 sekund se monstrum teleportuje pryč.
- Pokud to hráč nestihne nebo nesplní podmínky, monstrum ho chytí a následuje Game Over.

## Ovládání

| Akce                       | Klávesa/Vstup |
| -------------------------- | ------------- |
| Pohyb                      | W, A, S, D    |
| Rozhlížení                 | Myš           |
| Baterka (Zap/Vyp)          | F             |
| Zadržení dechu / Úkryt     | Q (držet)     |
| Interakce (Otevření dveří) | E             |
