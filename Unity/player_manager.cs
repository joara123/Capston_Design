using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.SceneManagement;

public class player_manager : MonoBehaviour
{
    public Rigidbody playerRigidbody;
    public Camera fpsCam;

    float MoveSpeed;
    float rotSpeed;
    float currentRot;
    float JumpPower;

    private bool IsJumping;

    // Start is called before the first frame update
    void Start()
    {
        MoveSpeed = 30.0f;
        rotSpeed = 3.0f;
        currentRot = 0f;
        JumpPower = 10.0f;
        IsJumping = false;
    }

    // Update is called once per frame
    void Update()
    {
        PlayerMove();
        RotCtrl();
        Jump();
    }

    void PlayerMove()
    {
        float xInput = Input.GetAxis("Horizontal");
        float zInput = Input.GetAxis("Vertical");

        float xSpeed = xInput * MoveSpeed;
        float zSpeed = zInput * MoveSpeed;

        transform.Translate(Vector3.forward * zSpeed * Time.deltaTime);
        transform.Translate(Vector3.right * xSpeed * Time.deltaTime);
    }
    void Jump()
    {
        if(Input.GetKeyDown(KeyCode.Space))
        {
            if(!IsJumping)
            {
                IsJumping = true;
                playerRigidbody.AddForce(Vector3.up * JumpPower, ForceMode.Impulse);

            }
            else
            {
                return;
            }
        }
    }
    void RotCtrl()
    {
        float rotX = Input.GetAxis("Mouse Y") * rotSpeed;
        float rotY = Input.GetAxis("Mouse X") * rotSpeed;

     
        currentRot -= rotX;

        currentRot = Mathf.Clamp(currentRot, -80f, 80f);

        
        this.transform.localRotation *= Quaternion.Euler(0, rotY, 0);
       
        fpsCam.transform.localEulerAngles = new Vector3(currentRot, 0f, 0f);
    }
    void OnCollisionEnter(Collision collision)
    {
        if (collision.gameObject.CompareTag("point"))
        {
            SceneManager.LoadScene("MenuScene");
        }
        if (collision.gameObject.CompareTag("Ground"))
        {
            IsJumping = false;
        }
    }
}
