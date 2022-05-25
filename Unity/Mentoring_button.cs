using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Mentoring_button : MonoBehaviour
{
    public GameObject panel1;
    public GameObject panel2;
    public GameObject panel3;
    public GameObject ok1;
    public GameObject ok2;
    public GameObject ok3;
    public GameObject okSign;

    // Start is called before the first frame update
    void Start()
    {
        panel1.gameObject.SetActive(false);
        panel2.gameObject.SetActive(false);
        panel3.gameObject.SetActive(false);
        ok1.gameObject.SetActive(false);
        ok2.gameObject.SetActive(false);
        ok3.gameObject.SetActive(false);
        okSign.gameObject.SetActive(false);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void mentoring1Set()
    {
        panel1.gameObject.SetActive(true);
        ok1.gameObject.SetActive(true);
        panel2.gameObject.SetActive(false);
        ok2.gameObject.SetActive(false);
        panel3.gameObject.SetActive(false);
        ok3.gameObject.SetActive(false);
    }
    public void mentoring2Set()
    {
        panel2.gameObject.SetActive(true);
        ok2.gameObject.SetActive(true);
        panel1.gameObject.SetActive(false);
        ok1.gameObject.SetActive(false);
        panel3.gameObject.SetActive(false);
        ok3.gameObject.SetActive(false);
    }
    public void mentoring3Set()
    {
        panel3.gameObject.SetActive(true);
        ok3.gameObject.SetActive(true);
        panel2.gameObject.SetActive(false);
        ok2.gameObject.SetActive(false);
        panel1.gameObject.SetActive(false);
        ok1.gameObject.SetActive(false);
    }
    public void OkButton()
    {
        okSign.gameObject.SetActive(true);
        StartCoroutine(signExit());
    }
    IEnumerator signExit()
    {
        yield return new WaitForSeconds(2);
        okSign.gameObject.SetActive(false);
    }
}
