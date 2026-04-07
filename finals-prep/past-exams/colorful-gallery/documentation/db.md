# Databáze

[⬅️ Zpět na hlavní přehled (README.md)](../README.md)

## 1. Konceptuální návrh (E-R Diagram)

|    `uzivatel`     |             |    `obrazek`    |             |   `komentar`    |
| :---------------: | :---------: | :-------------: | :---------: | :-------------: |
|  **id_uzivatel**  | -\|\|----o< | **id_obrazek**  | -\|\|----o< | **id_komentar** |
| uzivatelske_jmeno |             |      nazev      |             |      text       |
|       email       | -\|\|------ |      popis      | ---------o< |   datum_a_cas   |
| datum_registrace  |             | _datum_nahrani_ |             |   id_uzivatel   |
|                   |             |  _id_uzivatel_  |             |   id_obrazek    |

### Vztahy:

- **uživatel a obrázek (1:N):** `uzivatel` -\|\|----o< `obrazek`
- **uživatel a komentář (1:N):** `uzivatel` -\|\|----o< `komentar`
- **obrázek a komentář (1:N):** `obrazek` -\|\|----o< `komentar`

## 2. Tabulky entitních typů

### Tabulka: uzivatel

| Název atributu    | Datový typ   | Klíče | Modifikátory integritního omezení   |
| ----------------- | ------------ | ----- | ----------------------------------- |
| id_uzivatel       | INT          | PK    | UNSIGNED, AUTO_INCREMENT            |
| uzivatelske_jmeno | VARCHAR(50)  |       | NOT NULL, UNIQUE                    |
| email             | VARCHAR(255) |       | NOT NULL, UNIQUE                    |
| datum_registrace  | DATETIME     |       | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

### Tabulka: obrazek

| Název atributu | Datový typ   | Klíče | Modifikátory integritního omezení   |
| -------------- | ------------ | ----- | ----------------------------------- |
| id_obrazek     | INT          | PK    | UNSIGNED, AUTO_INCREMENT            |
| nazev          | VARCHAR(50)  |       | NOT NULL                            |
| popis          | VARCHAR(255) |       | NOT NULL                            |
| datum_nahrani  | DATETIME     |       | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| id_uzivatel    | INT          | FK    | UNSIGNED, NOT NULL                  |

### Tabulka: komentar

| Název atributu  | Datový typ   | Klíče | Modifikátory integritního omezení   |
| --------------- | ------------ | ----- | ----------------------------------- |
| id_komentar     | INT          | PK    | UNSIGNED, AUTO_INCREMENT            |
| obsah_komentare | VARCHAR(255) |       | NOT NULL                            |
| datum_a_cas     | DATETIME     |       | NOT NULL, DEFAULT CURRENT_TIMESTAMP |
| id_uzivatel     | INT          | FK    | UNSIGNED, NOT NULL                  |
| id_obrazek      | INT          | FK    | UNSIGNED, NOT NULL                  |

## 3. SQL Skripty

```sql
-- 1. Vytvoření tabulky pro obrázek
CREATE TABLE obrazek(
    id_obrazek          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nazev               VARCHAR(50) NOT NULL,
    popis               VARCHAR(255) NOT NULL,
    datum_nahrani       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_uzivatel         INT UNSIGNED NOT NULL,

    FOREIGN KEY(id_uzivatel) REFERENCES uzivatel(id_uzivatel)
);

-- 2. Vložení nového obrázku nahraného uživatelem s id=2
INSERT INTO obrazek(nazev, popis, id_uzivatel)
VALUES ("šťastní maturanti", "maturanti zjišťují, že úspěšně splnili praktickou zkoušku", 2);

-- 3. Úprava popisu u obrázků od 31. 8. 2024
UPDATE obrazek
SET popis = CONCAT(popis, '- aktualizováno' );

-- 4. Výpis obrázků bez komentáře
SELECT nazev, datum_nahrani
FROM obrazek
WHERE id_obrazek NOT IN(SELECT id_obrazek FROM komentar)
ORDER BY datum_nahrani ASC;

-- 5. Výpis všech komentářů uživatele id=3
SELECT * FROM komentar
WHERE id_uzivatel = 3;

-- 6. Smazání komentářů u obrázku id=2 kromě nejstaršího
DELETE FROM komentar
WHERE id_obrazek = 2
AND datum_cas > (
    SELECT min_datum_cas FROM (
        SELECT MIN(datum_cas) AS min_datum_cas
        FROM komentar
        WHERE id_obrazek = 2
    ) AS docasna_tabulka
);
```
