using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class scene_change : MonoBehaviour
{
    // Start is called before the first frame update
    void Start()
    {
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    public void SceneChange()
    {
        SceneManager.LoadScene("MainScene");
    }
    public void SceneHosil()
    {
        SceneManager.LoadScene("hosil1F");
    }
    public void Scene2F()
    {
        SceneManager.LoadScene("hosil2F");
    }
    public void Scene3F()
    {
        SceneManager.LoadScene("hosil3F");
    }
    public void Scene4F()
    {
        SceneManager.LoadScene("hosil4F");
    }
    public void SceneMenu()
    {
        SceneManager.LoadScene("MenuScene");
    }
    
    public void ReservationScene()
    {
        SceneManager.LoadScene("reservationMenu");
    }
    public void AroundScene()
    {
        SceneManager.LoadScene("360scene1");
    }
    public void VR_1() //중앙 씬
    {
        SceneManager.LoadScene("360scene1");
    }
    public void VR_2() //1163 앞
    {
        SceneManager.LoadScene("360scene3");
    }
    public void VR_3() //끝에 안쪽
    {
        SceneManager.LoadScene("SampleScene 1");
    }
    public void VR_4() //멘실 복도
    {
        SceneManager.LoadScene("SampleScene 2");
    }
    public void VR_5() //중앙 북카페
    {
        SceneManager.LoadScene("SampleScene3");
    }
    public void VR_6() //맨실 안쪽
    {
        SceneManager.LoadScene("SampleScene 4");
    }
    public void VR_7() //끝 북카페
    {
        SceneManager.LoadScene("SampleScene");
    }
}
