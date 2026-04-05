using UnityEngine;

public class RandomAmbientSound : MonoBehaviour
{
    public AudioSource audioSource;    // Komponenta pro přehrávání zvuku
    public AudioClip[] spookySounds;   // Pole obsahující různé děsivé zvuky
    
    [Header("Nastavení časovače")]
    public float minTime = 15f; // Minimální čas do přehrání dalšího zvuku
    public float maxTime = 40f; // Maximální čas do přehrání dalšího zvuku
    
    private float timer; // Aktuální odpočet času

    void Start() 
    {
        // Při startu nastavíme první náhodný odpočet
        SetRandomTimer();
    }

    void Update() 
    {
        // Odečítáme čas proběhlý od posledního snímku
        timer -= Time.deltaTime;
        
        // Pokud časovač vypršel
        if (timer <= 0) 
        {
            PlayRandomSound(); // Přehraje zvuk
            SetRandomTimer();  // Nastaví nový náhodný odpočet do dalšího zvuku
        }
    }

    // Vybere náhodný zvuk z pole a přehraje ho
    void PlayRandomSound() 
    {
        if (spookySounds.Length > 0) 
        {
            int randomIndex = Random.Range(0, spookySounds.Length);
            audioSource.clip = spookySounds[randomIndex];
            audioSource.Play();
        }
    }

    // Nastaví časovač na náhodnou hodnotu mezi minTime a maxTime
    void SetRandomTimer() 
    {
        timer = Random.Range(minTime, maxTime);
    }
}