# Databáze

[`⬅️ Zpět na hlavní přehled (README.md)`](../README.md)

## 1. Konceptuální návrh (E:R Diagram)

|   `nora`    |             |   `bobr`    |             |   `krmeni`    |
| :---------: | :---------: | :---------: | :---------: | :-----------: |
| **id_nora** | -\|\|----o< | **id_bobr** | -\|\|----o< | **id_krmeni** |
|    nazev    |             |    jmeno    |             |  cas_krmeni   |
|             |             |  _id_nora_  |             |   _id_bobr_   |

## 2. Tabulky entitních typů

### Tabulka: nora

| Název atributu | Datový typ  | Klíče | Modifikátory integritního omezení |
| -------------- | ----------- | ----- | --------------------------------- |
| id_nora        | INT         | PK    | UNSIGNED, AUTO_INCREMENT          |
| nazev          | VARCHAR(50) |       | NOT NULL                          |

### Tabulka: bobr

| Název atributu | Datový typ  | Klíče | Modifikátory integritního omezení |
| -------------- | ----------- | ----- | --------------------------------- |
| id_bobr        | INT         | PK    | UNSIGNED, AUTO_INCREMENT          |
| jmeno          | VARCHAR(50) |       | NOT NULL                          |
| id_nora        | INT         | FK    | NOT NULL                          |

### Tabulka: krmeni

| Název atributu | Datový typ | Klíče | Modifikátory integritního omezení   |
| -------------- | ---------- | ----- | ----------------------------------- |
| id_krmeni      | INT        | PK    | UNSIGNED, AUTO_INCREMENT            |
| cas_krmeni     | DATETIME   |       | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| id_bobr        | INT        | FK    | NOT NULL                            |

## 3. SQL Scripty

```sql
-- Vytvoření databáze
CREATE DATABASE IF NOT EXISTS bobr;
USE bobr;

-- 1. Vytvoření tabulek nora, bobr a krmení
CREATE TABLE nora(
    id_nora INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nazev VARCHAR(50) NOT NULL
);

CREATE TABLE bobr(
    id_bobr INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jmeno VARCHAR(50) NOT NULL,
    id_nora INT UNSIGNED NOT NULL,

    FOREIGN KEY (id_nora) REFERENCES nora(id_nora) ON DELETE RESTRICT
);

CREATE TABLE krmeni(
    id_krmeni INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    cas_krmeni DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_bobr INT UNSIGNED NOT NULL,

    FOREIGN KEY (id_bobr) REFERENCES bobr(id_bobr) ON DELETE CASCADE
);

-- 2. Nastavení omezení, aby nebylo možné smazat noru, pokud v ní žije alespoň jeden bobr (Již splněno u vytváření tabulek)
-- FOREIGN KEY (id_nora) REFERENCES nora(id_nora) ON DELETE RESTRICT

-- =====================================================
-- POMOCNÝ KROK NAD RÁMEC ZADÁNÍ: Vložení nory
-- (nutné pro splnění referenční integrity v kroku 3)
-- =====================================================
INSERT INTO nora(nazev)
VALUES ("Nora pod dubem");

-- 3. Vložení nového bobra
INSERT INTO bobr(jmeno, id_nora)
VALUES ("Karel", 1);

-- 4. Zjištění posledního vloženého záznamu bobra a uložení do proměnné @bobr
SET @bobr = LAST_INSERT_ID();

-- 5. Vložení záznamu o nakrmení
INSERT INTO krmeni(cas_krmeni, id_bobr)
VALUES ("2026-04-04 22:22:22", @bobr);

-- 6. Chronologický výpis všech krmení
SELECT * FROM krmeni
ORDER BY cas_krmeni ASC;
```
