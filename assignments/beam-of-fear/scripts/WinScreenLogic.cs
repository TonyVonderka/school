using UnityEngine;
using UnityEngine.SceneManagement;

public class WinScreenLogic : MonoBehaviour
{
    void Start()
    {
        // Při zobrazení vítězné obrazovky uvolníme a zviditelníme kurzor myši,
        // aby mohl hráč klikat na tlačítka
        Cursor.lockState = CursorLockMode.None;
        Cursor.visible = true;
    }

    // Metoda pro tlačítko "Zpět do menu"
    public void GoToMenu()
    {
        SceneManager.LoadScene("MenuScene");
    }

    // Metoda pro tlačítko "Ukončit hru"
    public void QuitGame()
    {
        Application.Quit();
        Debug.Log("Hra se vypnula"); // Výpis pro kontrolu v editoru Unity
    }
}