using UnityEngine;

public class JumpScareTrigger : MonoBehaviour
{
    public AudioSource scareSound; // Zdroj zvuku pro lekačku
    private bool hasTriggered = false; // Pojistka, aby se lekačka nespustila vícekrát

    // Zavolá se, když něco vstoupí do oblasti spouštěče
    void OnTriggerEnter(Collider other)
    {
        // Pokud je to hráč a lekačka se ještě nespustila
        if (other.CompareTag("Player") && !hasTriggered)
        {
            scareSound.Play();   // Přehraje strašidelný zvuk
            hasTriggered = true; // Zaznamená, že už se lekačka stala
            
            // Zničí tento objekt (spouštěč) po 12 sekundách, 
            // aby už nezabíral paměť a nemohl se omylem znovu aktivovat
            Destroy(gameObject, 12f); 
        }
    }
}