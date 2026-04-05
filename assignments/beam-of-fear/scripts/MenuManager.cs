using UnityEngine;
using UnityEngine.SceneManagement; 

public class MenuManager : MonoBehaviour
{   
    void Start()
    {
        // V menu potřebujeme vidět myš a moci s ní volně hýbat, 
        // proto ji zviditelníme a odemkneme
        Cursor.visible = true;
        Cursor.lockState = CursorLockMode.None;
    }

    // Metoda přiřazená na tlačítko "Hrát"
    public void PlayGame()
    {
        // Načte herní scénu podle jejího názvu
        SceneManager.LoadScene("GameScene");
    }

    // Metoda přiřazená na tlačítko "Konec"
    public void QuitGame()
    {
        Debug.Log("Hra se vypnula!"); // Vypíše zprávu do konzole (pro testování v editoru)
        Application.Quit();           // Ukončí zkompilovanou hru
    }
}