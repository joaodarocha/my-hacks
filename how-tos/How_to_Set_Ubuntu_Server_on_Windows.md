
New development environment:

**First Steps:**

* Install Programs:
* Chrome
* Slack
* Virtual Box
* VSCode
* RubyMine
* Postman
* Sublime

**1 - VBox**

* 1.1 - Set Adapter 1 = NAT (Promiscous Mode = Deny)
* 1.2 - Set Adapter 2 = Host-only Adapter (Promiscous Mode = Allow All)
* 1.3 - Network > Adapter 1 > NAT > Advanced > Port Forwarding > Name-SSH; (Host and Guest Port) 22

**2 - Ubuntu Server**

* 2.1 - https://www.ubuntu.com/download/server (Ubuntu Server x.x.x LTS)
* 2.2 - Instalation
    * 2.2.1 - Select openssh option
    * 2.2.2 - Do not forget to add the proxy
* 2.3 - Create your workspace directory
* 2.4 - ssh-keygen to generate a new SSH key (default name is id_rsa)
* 2.5 - copy your key .pub and paste @ bitbucket (Bitbucket settings -> Security -> SSH Keys -> Add key)
* 2.6 - sudo apt-get install socat
* 2.7 - update/create the ~/.bashrc and ~/.ssh/config files (now or after the 5th/6th step)
* 2.8 - Git
* 2.8.1 
        
        git config --global user.name "Your Name"
* 2.8.2 - git config --global user.email "your@email.com"

**3 - SFTP Net Drive**
* 3.1 - Download: 
* 3.1.1 - https://www.nsoftware.com/netdrive/sftp/download.aspx
* 3.1.2 - email: notme@mail.com
* 3.2 - Settings
* 3.2.1 - Server = 192.168.56.101
* 3.2.2 - Username/Password = <Ubuntu username/password>
* 3.2.3 - Drive Type: Fixed
* 3.2.4 - Compression level: minimum
* 3.2.5 - Specified folder: /home/<your-ubuntu-user>/workspace

**4-Download Git for Windows**
* 4.1 - https://git-scm.com/download/win
* 4.2 - Install GitBash:
* 4.2.1 - Gitbash + Windows Prompt (last option)
* 4.2.2 - Checkout/commit (middle option)
* 4.3 - Create gtBash alias for SSH connection to ubuntu machine:
* 4.3.1 - Open: 
        
        `C:\Users\<windows-user>\AppData\Local\Programs\Git\etc\ssh\ssh_config`
* 4.3.2 - Add to end of file: 
    Host dev
		User <your-ubuntu-user>
		HostName 192.168.56.1
        IdentityFile "/c/Program\ Files/Git/etc/ssh/ubuntu-gui-dt"
        PasswordAuthentication no
        ForwardAgent no

**5 - VSCode**
 * 5.1 Ctrl + Shift + P > Change Default Terminal Shell - GitBash

**6 - RubyMine**
* 6.1 - Settings > Tools > Terminal > Shell Path:

        `C:\Users\<windows-user>\AppData\Local\Programs\Git\bin\bash.exe`
	
---

** end of ~/.bashrc file: **

export PATH="$HOME/.rbenv/bin:$PATH"

http_proxy='http://<your-user>:<your-pass>@empweb1.ey.net:8080'
https_proxy='http://<your-user>:<your-pass>@empweb1.ey.net:8443'

export http_proxy
export https_proxy

eval "$(rbenv init -)"

---

**~/.ssh/config**

Host rackspace
    ProxyCommand  nc -X connect -x http://<your-user>:<your-pass>@your.proxy.url.net:8443 %h %p
    ServerAliveInterval 10

Host=bitbucket.org github.com rubygems.org
    ProxyCommand=socat - PROXY:your.proxy.url:%h:%p,proxyport=8080,proxyauth=<your-user>:'<your-pass>'

Host=*aheadoftax.com *eyplatforms.com
    Port=2284
    ProxyCommand=socat - PROXY:your.proxy.url:%h:%p,proxyport=8443,proxyauth=<your-user>:<your-pass>

Host *
    ServerAliveInterval 60