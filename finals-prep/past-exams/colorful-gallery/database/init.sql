-- Vytvoření databáze
CREATE DATABASE IF NOT EXISTS barevna_galerie;
USE barevna_galerie;

-- =========================================================================
-- POMOCNÉ KROKY NAD RÁMEC ZADÁNÍ: Tabulka uživatelů
-- =========================================================================
CREATE TABLE uzivatel(
    id_uzivatel         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    uzivatelske_jmeno   VARCHAR(50) NOT NULL UNIQUE,
    email               VARCHAR(255) NOT NULL UNIQUE,
    datum_registrace    DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- =========================================================================
-- 1. Vytvoření tabulky pro obrázek (HODNOCENÝ KROK)
-- =========================================================================
CREATE TABLE obrazek(
    id_obrazek          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nazev               VARCHAR(50) NOT NULL,
    popis               VARCHAR(255) NOT NULL,
    datum_nahrani       DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_uzivatel         INT UNSIGNED NOT NULL,

    FOREIGN KEY(id_uzivatel) REFERENCES uzivatel(id_uzivatel)
);

-- =========================================================================
-- POMOCNÉ KROKY NAD RÁMEC ZADÁNÍ: Tabulka komentářů a data
-- =========================================================================
CREATE TABLE komentar(
    id_komentar         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    obsah_komentare     VARCHAR(255) NOT NULL,
    datum_cas           DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    id_uzivatel         INT UNSIGNED NOT NULL,
    id_obrazek          INT UNSIGNED NOT NULL,
    
    FOREIGN KEY(id_uzivatel) REFERENCES uzivatel(id_uzivatel)
    FOREIGN KEY(id_obrazek) REFERENCES obrazek(id_obrazek)
);

-- Vložení testovacích uživatelů
INSERT INTO uzivatel(id_uzivatel, uzivatelske_jmeno, email, datum_registrace) VALUES
(1, 'admin', 'admin@galerie.cz', '2023-01-01'),
(2, 'tomas', 'tomas@gmail.com', '2024-05-01'),
(3, 'tonda', 'tonda@gmail.com', '2024-05-02');

-- Vložení testovacích obrázků
INSERT INTO obrazek(id_obrazek, nazev, popis, datum_nahrani, id_uzivatel) VALUES
(1, 'Starý obrázek', 'Nějaký text', '2023-05-05', 1),
(2, 'Testovací obrázek pro smazání kom', 'Popis', '2024-09-01', 1);

-- Vložení testovacích komentářů
INSERT INTO komentar(obsah_komentare, datum_cas, id_uzivatel, id_obrazek) VALUES
('První!', '2024-01-01 10:00:00', 3, 2),
('Další komentář', '2024-01-02 12:00:00', 1, 2),
('Komentář od uživatele 3', '2024-01-03 15:00:00', 3, 1);

-- =========================================================================
-- DALŠÍ HODNOCENÉ KROKY (2 - 6)
-- =========================================================================

-- 2. Vložení nového obrázku nahraného uživatelem s id=2
INSERT INTO obrazek(nazev, popis, id_uzivatel)
VALUES ("šťastní maturanti", "maturanti zjišťují, že úspěšně splnili praktickou zkoušku", 2);

-- 3. Úprava popisu u obrázků od 31. 8. 2024
UPDATE obrazek
SET popis = CONCAT(popis, '- aktualizováno')
WHERE datum_nahrani >= '2024-08-31';

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