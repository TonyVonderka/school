using System.Collections;
using System.Collections.Generic; 
using UnityEngine;

public class Flashlight : MonoBehaviour
{
    // Odkazy na herní objekty reprezentující rozsvícenou a zhasnutou baterku
    public GameObject ON;
    public GameObject OFF;
    
    private bool isON; // Uchovává stav, zda je baterka aktuálně zapnutá

    void Start()
    {
        // Při startu hry nastavíme baterku do výchozího (vypnutého) stavu
        ON.SetActive(false);
        OFF.SetActive(true);
        isON = false;
    }

    void Update()
    {
        // Pokud hráč stiskne klávesu F
        if (Input.GetKeyDown(KeyCode.F))
        {
            if (isON)
            {
                // Pokud byla baterka zapnutá, vypneme ji
                ON.SetActive(false);
                OFF.SetActive(true);
            }
            else 
            {
                // Pokud byla baterka vypnutá, zapneme ji
                ON.SetActive(true);
                OFF.SetActive(false);
            }
            
            // Invertujeme uložený stav baterky
            isON = !isON; 
        }
    }
}