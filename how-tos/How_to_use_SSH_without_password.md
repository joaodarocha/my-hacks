Using **Git-Bash for Windows**

1-Generate new SSH key pair

(**choose a name for your key - we'll use `id-new-key` on this example**)

    $>cd /<PATH_TO_GIT>/etc/ssh/
    $>ssh-keygen -t rsa

2-Copy the public key to the target machine(Ubuntu)

(**you will be prompted to enter your password**)

    $>ssh-copy-id -i /c/Program\ Files/Git/etc/ssh/id-new-key.pub <target-username>@192.168.56.101

3-Verify that the new key was copied to the target machine(Ubuntu)
    
    Go to file ~/.ssh/authorized_keys and check if the text matches the id-new-key.pub that was generated on the client machine(Windows)

4-Update ssh_config file to use the new private key

Add the following line on the end of file
      

    IdentityFile /<PATH_TO_GIT>/etc/ssh/id-new-key
