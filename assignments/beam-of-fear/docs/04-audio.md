# 04. Audio

[`Zpět na hlavní přehled (README.md)`](../README.md)

## Zvukový design a pravidla

Zvuk je hlavním prvkem budování hororové atmosféry a často slouží jako indikátor hrozby nebo k vyděšení hráče.

## Implementované zvuky

- **Hráč:** Zvuky kroků při chůzi.
- **Náhodný ambient:** Na pozadí běží skript, který v náhodném intervalu **15 až 40 sekund** vybere a přehraje jeden z ambientních zvuků (např. prasknutí větvičky, zahoukání sovy).
- **Kontinuální ambient:** Zvuk foukání větru, který hraje nepřetržitě ve smyčce (loop) a tvoří základní atmosféru lesa.
- **Jumpscare Trigger zóny:** Na mapě je romístěno 5 neviditelných zón. Při průchodu se jednorázově spustí intenzivní zvuk (např. řev mosntra, rychlé blížící se kroky).

## Hudba a herní stavy

- **Hlavní menu:** Hraje atmosférická hudba, která připravuje hráče na hororový zážitek.
- **Hlavní hra:** Zvukové efekty a vítr plně nahrazují hudební podkres, aby vynikla surovost lesa.
- **Vítězné menu:** Vítězná hudba, která se spustí po nasbírání všech 5 kostek a přechodu do závěrečné obrazovky.

## Zdroje a nástroje

- **Nástroje:** Pro úpravu a stříhání zvuků byla použita online aplikace ([Odkaz](https://mp3cut.net/))
- **Zdroje zvuků:** Většina zvukových efektů (vítr, kroky, monstrum) byla nalezena a stažena z YouTube.
- **Hudba:** Hudba pro menu a vítězné menu byla vygenerována umělou intelignecí ([Suno](https://suno.com/)).

## Ukázky zvuků

> 💡 Veškeré zvukové a hudební soubory jsou k dispozici ve složce [`audio`](./audio/).

**Hudba z hlavního menu:** [Přehrát hudbu z hlavního menu (MP3)](./audio/music_menu.mp3)

**Hudba z vítězného menu:** [Přehrát hudbu z vítězného menu (MP3)](./audio/music_win.mp3)

**Ukázka z trigger zóny:** [Přehrát ukázku z trigger zóny (MP3)](./audio/trig_scare_3.mp3)

**Základní ambientní vítr (hraje neustále):** [Přehrát základní ambientní vítr (MP3)](./audio/env_wind_loop.mp3)

**Náhodný ambient (prasknutí větvičky):** [Přehrát náhodný ambient (MP3)](./audio/rand_branch_2.mp3)
