using UnityEngine;

public class DoorController : MonoBehaviour
{
    [Header("Nastavení")]
    public float openAngle = 90f; // Úhel, o který se dveře otevřou
    public float smooth = 5f;     // Rychlost (plynulost) otevírání/zavírání

    private bool isOpen = false;       // Uchovává aktuální stav dveří (otevřeno/zavřeno)
    private bool isPlayerNear = false; // Detekuje, zda je hráč v dosahu pro interakci
    
    private Quaternion startRotation;  // Výchozí (zavřená) rotace dveří
    private Quaternion targetRotation; // Cílová rotace, ke které se dveře zrovna otáčejí

    void Start()
    {
        // Uložíme si počáteční rotaci dveří při spuštění hry
        startRotation = transform.localRotation;
        targetRotation = startRotation;
    }

    void Update()
    {
        // Pokud je hráč blízko a stiskne klávesu E
        if (isPlayerNear && Input.GetKeyDown(KeyCode.E))
        {
            isOpen = !isOpen; // Přepne stav dveří (pokud byly zavřené, budou otevřené a naopak)

            if (isOpen)
            {
                // Vypočítá cílovou rotaci pro otevřené dveře
                targetRotation = startRotation * Quaternion.Euler(0, openAngle, 0);
            }
            else
            {
                // Nastaví cílovou rotaci zpět na výchozí (zavřenou)
                targetRotation = startRotation;
            }
        }

        // Plynule otáčí dveřmi z aktuální rotace do cílové rotace (Slerp zajišťuje plynulý přechod)
        // Time.deltaTime zaručuje, že rychlost otevírání je nezávislá na FPS
        transform.localRotation = Quaternion.Slerp(transform.localRotation, targetRotation, Time.deltaTime * smooth);
    }

    // Metoda se zavolá, když nějaký objekt vstoupí do Trigger collideru (zóny kolem dveří)
    void OnTriggerEnter(Collider other)
    {
        // Zkontrolujeme, zda objekt, který vstoupil, je hráč
        if (other.CompareTag("Player"))
        {
            isPlayerNear = true;
        }
    }

    // Metoda se zavolá, když objekt opustí Trigger collider
    void OnTriggerExit(Collider other)
    {
        if (other.CompareTag("Player"))
        {
            isPlayerNear = false;
        }
    }
}