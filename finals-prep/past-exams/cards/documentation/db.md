# Databáze

[`⬅️ Zpět na hlavní přehled (README.md)`](../README.md)

## 1. Konceptuální návrh (E-R Diagram)

|   `kategorie`    |             |    `karta`     |             | `polozka_sbirky` |             |   `sbirka`    |
| :--------------: | :---------: | :------------: | :---------: | :--------------: | :---------: | :-----------: |
| **id_kategorie** | -\|\|----o< |  **id_karta**  | -\|\|----o< |  **_id_karta_**  | >o----\|\|- | **id_sbirka** |
| nazev_kategorie  |             |     jmeno      |             | **_id_sbirka_**  |             |    hodnota    |
|     hodnota      |             |     popis      |             |                  |             |               |
|                  |             | _id_kategorie_ |             |                  |             |               |

## 2. Tabulky entitních typů

### Tabulka: kategorie

| Název atributu  | Datový typ  | Klíče | Modifikátory integritního omezení |
| --------------- | ----------- | ----- | --------------------------------- |
| id_kategorie    | INT         | PK    | UNSIGNED, AUTO_INCREMENT          |
| nazev_kategorie | VARCHAR(50) |       | NOT NULL, UNIQUE                  |
| hodnota         | TINYINT     |       | UNSIGNED, NOT NULL, UNIQUE        |

### Tabulka: karta

| Název atributu | Datový typ   | Klíče | Modifikátory integritního omezení |
| -------------- | ------------ | ----- | --------------------------------- |
| id_karta       | INT          | PK    | UNSIGNED, AUTO_INCREMENT          |
| jmeno          | VARCHAR(50)  |       | NOT NULL, UNIQUE                  |
| popis          | VARCHAR(255) |       | NOT NULL                          |
| id_kategorie   | INT          | FK    | UNSIGNED, NOT NULL                |

### Tabulka: sbirka

| Název atributu | Datový typ | Klíče | Modifikátory integritního omezení |
| -------------- | ---------- | ----- | --------------------------------- |
| id_sbirka      | INT        | PK    | UNSIGNED, AUTO_INCREMENT          |
| hodnota        | INT        |       |                                   |

### Vztahová tabulka: polozka_sbirky

| Název atributu | Datový typ | Klíče  | Modifikátory integritního omezení |
| -------------- | ---------- | ------ | --------------------------------- |
| id_karta       | INT        | PK, FK | UNSIGNED, NOT NULL                |
| id_sbirka      | INT        | PK, FK | UNSIGNED, NOT NULL                |

## 3. SQL Skripty

```sql
-- Vytvoření databáze
CREATE DATABASE IF NOT EXISTS karty;
USE karty;

-- 1. Vytvoření tabulek kategorie, karta, sbirka a vztahové tabulky polozka_sbirky
CREATE TABLE kategorie(
    id_kategorie INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nazev_kategorie VARCHAR(50) NOT NULL UNIQUE,
    hodnota TINYINT UNSIGNED NOT NULL UNIQUE
);

CREATE TABLE karta(
    id_karta INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    jmeno VARCHAR(50) NOT NULL UNIQUE,
    popis VARCHAR(255) NOT NULL,
    id_kategorie INT UNSIGNED NOT NULL,

    FOREIGN KEY (id_kategorie) REFERENCES kategorie(id_kategorie)
);

CREATE TABLE sbirka(
    id_sbirka INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    hodnota INT
);

CREATE TABLE polozka_sbirky(
    id_karta INT UNSIGNED NOT NULL,
    id_sbirka INT UNSIGNED NOT NULL,

    FOREIGN KEY(id_karta) REFERENCES karta(id_karta) ON DELETE RESTRICT,
    FOREIGN KEY(id_sbirka) REFERENCES sbirka(id_sbirka) ON DELETE CASCADE,

    PRIMARY KEY(id_karta, id_sbirka)
);

-- 2. Nastavení omezení, aby nebylo možné smazat kartu, pokud je součástí sbírky (Již splněno u vytváření tabulek)
-- FOREIGN KEY(id_karta) REFERENCES karta(id_karta) ON DELETE RESTRICT;

-- =====================================================
-- POMOCNÝ KROK NAD RÁMEC ZADÁNÍ: Vložení kategorie
-- (nutné pro splnění referenční integrity v kroku 3)
-- =====================================================
INSERT INTO kategorie(nazev_kategorie, hodnota)
VALUES ("Legendární", 5);

-- 3. Vložení nové karty
INSERT INTO karta(jmeno, popis, id_kategorie)
VALUES ("Ohnivý drak", "Popis", 1);

-- 4. Zjištění posledního vloženého záznamu karty a uložení do proměnné @karta
SET @karta = LAST_INSERT_ID();

-- =====================================================
-- POMOCNÝ KROK NAD RÁMEC ZADÁNÍ: Vložení sbírky
-- (nutné pro splnění referenční integrity v kroku 5)
-- =====================================================
INSERT INTO sbirka(hodnota)
VALUES (NULL);

-- 5. Přidání karty s id @karta do sbírky
INSERT INTO polozka_sbirky(id_karta, id_sbirka)
VALUES (@karta, 1);

-- 6. Vypsání všech sbírek
SELECT * FROM sbirka;
```
