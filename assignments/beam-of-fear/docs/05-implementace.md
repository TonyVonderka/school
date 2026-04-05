# 05. Implementace

[`Zpět na hlavní přehled (README.md)`](../README.md)

## Průběh vývoje a skládání hry

V této fázi došlo ke spojení všech grafických a zvukových assetů s logikou hry v enginu Unity v jeden celek.

- **Pohyb hráče:** Pro základní pohyb a ovládání kamery z pohledu první osoby byl využit "Starter Assets" od Unity.
- **Logika hry a prostředí:** Byly napsány C# skripty pro fungování baterky a systém sběru 5 kostek. Záměrně byly vypnuty kolize u stromů, aby hráč mohl plynule a bez frustrace procházet temným lesem.
- **Systém monstra a UI:** Byla implementována mechanika vzdálenosti s dynamickou zpětnou vazbou. Jakmile je monstrum blíž než 15 metrů, zobrazí se varovný text. Skript neustále ověřuje stav hráče: pokud se hráč hýbe nebo má zapnutou baterku, stisk klávesy `Q` je ignorován. Teprve když hráč stojí na místě a zhasne, stisknutí a držení `Q` změní varovný text na viditelný odpočet. Po 2 sekundách úspěšného držení se monstrum teleportuje pryč.
- **Audio systém:** Napojení skriptu pro náhodné přehrávání ambientních zvuků v loopu (interval 15–40s) a nastavení 5 neviditelných trigger zón.

## Ukázky klíčových zdrojových kódů

> 💡 Kompletní skripty (např. `MonsterAI.cs`, `ItemCollector.cs`) jsou uloženy ve složce [`scripts`](../scripts/).

### 1. Umělá inteligence monstra a mechanika úkrytu

Skript `MonsterAI.cs` v metodě `Update` neustále kontroluje vzdálenost, pohyb hráče a stav baterky.

```csharp
void Update()
{
    // Pokud monstrum není na navigační síti, nic nedělá
    if (!agent.isOnNavMesh) return;

    // Monstrum neustále míří k hráči
    agent.SetDestination(player.position);

    // Vypočítáme aktuální vzdálenost mezi monstrem a hráčem
    float distance = Vector3.Distance(transform.position, player.position);

    // Zjistíme, zda se hráč pohnul oproti minulému snímku
    bool isMoving = Vector3.Distance(player.position, lastPlayerPos) > 0.01f;
    lastPlayerPos = player.position;

    // Zjistíme, zda má hráč zapnutou baterku
    bool isFlashlightOn = flashlightOnObject != null && flashlightOnObject.activeInHierarchy;

    // Pokud je monstrum blízko hráče (v zóně varování)
    if (distance <= warningDistance)
    {
        warningText.gameObject.SetActive(true);

        // Pokud hráč drží Q, nehýbe se a nemá zapnutou baterku -> úspěšně se schovává
        if (Input.GetKey(KeyCode.Q) && !isMoving && !isFlashlightOn)
        {
            currentHideTime += Time.deltaTime; // Zvyšujeme časovač schovávání
            // Aktualizujeme UI s odpočtem
            warningText.text = "Hiding... " + (requiredHideTime - currentHideTime).ToString("F1") + "s";

            // Pokud se hráč schovával dostatečně dlouho
            if (currentHideTime >= requiredHideTime)
            {
                SpawnMonsterSafely(); // Odteleportuje monstrum pryč
            }
        }
        else
        {
            // Pokud hráč poruší podmínky schovávání, časovač se resetuje
            currentHideTime = 0f;
            warningText.text = "Hold [Q] to hide! Don't move & turn off flashlight!";
        }

        // Pokud je monstrum příliš blízko, hráč umírá
        if (distance <= killDistance)
        {
            GameOver();
        }
    }
    // ... zbytek kódu
}
```

### 2. Sběr předmětů a podmínka vítězství

Pro zaznamenávání postupu hráče slouží skript `ItemCollector.cs`. Jakmile hráč posbírá všechny požadované kostky (Items), hra ho přesměruje do vítězné scény a odemkne kurzor myši pro možnost kliknutí na tlačítka v menu.

```csharp
// Metoda se zavolá, když hráč vstoupí do Triggeru jiného objektu
private void OnTriggerEnter(Collider other)
{
    // Zkontrolujeme, zda má objekt tag "Item" (sběratelský předmět)
    if (other.CompareTag("Item"))
    {
        collectedCount++;        // Zvýší počítadlo nasbíraných předmětů
        Destroy(other.gameObject); // Odstraní sebraný předmět ze scény

        UpdateUI();  // Aktualizuje text na obrazovce
        CheckWin();  // Zkontroluje, zda už hráč nenasbíral vše
    }
}

// Zkontroluje podmínku vítězství
void CheckWin()
{
    if (collectedCount >= totalItems)
    {
        // Odemkne kurzor myši pro závěrečnou obrazovku
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;

        // Načte scénu s výhrou
        SceneManager.LoadScene("WinScene");
    }
}
```
