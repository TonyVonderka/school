using UnityEngine;
using UnityEngine.AI;
using TMPro;
using UnityEngine.SceneManagement;

public class MonsterAI : MonoBehaviour
{
    [Header("Reference")]
    public Transform player;               // Odkaz na pozici hráče
    public TMP_Text warningText;           // UI text pro varování hráče
    public GameObject flashlightOnObject;  // Odkaz na svítící část baterky (pro detekci světla)

    [Header("Nastavení UI a chování")]
    public float warningDistance = 15f;    // Vzdálenost, kdy se zobrazí varování
    public float killDistance = 2f;        // Vzdálenost, na kterou monstrum hráče zabije
    public float requiredHideTime = 2f;    // Jak dlouho musí hráč zůstat skrytý (držet Q)
    
    [Header("Nastavení spawnování")]
    public float minSpawnDistance = 30f;   // Minimální vzdálenost od hráče pro nové zrození monstra
    public float mapSize = 100f;           // Velikost mapy pro náhodné generování pozice

    private NavMeshAgent agent;            // Komponenta pro hledání cesty k hráči
    private Animator animator;             // Komponenta pro animování monstra
    private float currentHideTime = 0f;    // Časovač pro schovávání
    private Vector3 lastPlayerPos;         // Ukládá pozici hráče z minulého snímku pro detekci pohybu

    void Start()
    {   
        // Během hry schováme a uzamkneme kurzor myši na střed obrazovky
        Cursor.visible = false;
        Cursor.lockState = CursorLockMode.Locked;
        
        agent = GetComponent<NavMeshAgent>();
        animator = GetComponentInChildren<Animator>(); 
        
        if (warningText != null) warningText.gameObject.SetActive(false);
        lastPlayerPos = player.position;

        // Umístí monstrum na bezpečné místo hned na začátku
        SpawnMonsterSafely();
    }

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
        else
        {
            // Pokud je monstrum daleko, schováme varování a resetujeme časovač
            warningText.gameObject.SetActive(false);
            currentHideTime = 0f;
        }

        // Řízení animací podle toho, zda se monstrum hýbe
        if (animator != null)
        {
            if (agent.velocity.magnitude > 0.05f)
            {
                animator.SetBool("isWalking", true); 
            }
            else
            {
                animator.SetBool("isWalking", false);
            }
        }
    }

    // Metoda pro bezpečné přemístění monstra daleko od hráče
    void SpawnMonsterSafely()
    {
        Vector3 safePosition = Vector3.zero;
        bool foundSafePosition = false;
        int attempts = 0;

        // Hledáme náhodnou pozici, zkoušíme to maximálně 30krát
        while (!foundSafePosition && attempts < 30)
        {
            float randomX = Random.Range(0f, mapSize);
            float randomZ = Random.Range(0f, mapSize);
            
            Vector3 randomPoint = new Vector3(randomX, 50f, randomZ);
            
            // Vzdálenost potenciálního bodu od hráče
            float distanceToPlayer = Vector3.Distance(new Vector3(randomX, player.position.y, randomZ), player.position);

            // Pokud je bod dostatečně daleko od hráče
            if (distanceToPlayer >= minSpawnDistance)
            {
                NavMeshHit hit;
                // Zkontrolujeme, zda na tomto náhodném bodě existuje NavMesh (zda tam monstrum může stát)
                if (NavMesh.SamplePosition(randomPoint, out hit, 100f, NavMesh.AllAreas))
                {
                    safePosition = hit.position;
                    foundSafePosition = true; // Našli jsme správnou pozici
                }
            }
            attempts++;
        }

        // Pokud jsme našli bezpečnou pozici, přesuneme tam monstrum
        if (foundSafePosition)
        {
            agent.enabled = false; // Musíme agenta vypnout před teleportací
            transform.position = safePosition;
            agent.enabled = true;  // Opětovné zapnutí agenta
            
            if (agent.isOnNavMesh)
            {
                agent.ResetPath(); // Vymaže starou cestu
                agent.velocity = Vector3.zero; 
            }
            
            if (animator != null) 
            {
                animator.SetBool("isWalking", false); 
            }
        }
        
        currentHideTime = 0f;
        if (warningText != null) warningText.gameObject.SetActive(false);
    }

    // Načte scénu menu při prohře
    void GameOver()
    {
        SceneManager.LoadScene("MenuScene");
    }
}