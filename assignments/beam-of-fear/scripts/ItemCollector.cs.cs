using UnityEngine;
using TMPro; 
using UnityEngine.SceneManagement;

public class ItemCollector : MonoBehaviour
{
    public int collectedCount = 0; // Počet nasbíraných předmětů
    public int totalItems = 5;     // Celkový počet předmětů potřebných k výhře
    public TextMeshProUGUI counterText; // Odkaz na text v uživatelském rozhraní

    void Start()
    {
        // Aktualizuje UI text hned na začátku (0 / 5)
        UpdateUI();
    }

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

    // Upraví text v UI tak, aby odpovídal aktuálnímu stavu
    void UpdateUI()
    {
        if (counterText != null)
            counterText.text = collectedCount + " / " + totalItems;
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
}