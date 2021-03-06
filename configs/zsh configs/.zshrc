# Path to your oh-my-zsh installation.
 export ZSH=/$HOME/.oh-my-zsh

# ZSH THEME #
 ZSH_THEME="powerlevel9k/powerlevel9k"

### POWERLEVEL9k SETTING ###
 # POWERLEVEL9K MODE
 POWERLEVEL9K_MODE='nerdfont-complete'
 #By default, powerlevel9k is a single-lined prompt. If you would like to have the segments display on one line
 POWERLEVEL9K_PROMPT_ON_NEWLINE=true
 # If you would like to add a newline after each prompt / print loop
 POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
 POWERLEVEL9K_SHORTEN_DIR_LENGTH=2
 POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(os_icon dir vcs)
 POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(virtualenv date)
 POWERLEVEL9K_DATE_FORMAT="%D{%H:%M \uf017 %d.%m.%y}"
 POWERLEVEL9K_OS_ICON_BACKGROUND="white"
 POWERLEVEL9K_OS_ICON_FOREGROUND="black"
 POWERLEVEL9K_DIR_HOME_FOREGROUND="white"
 POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND="white"
 POWERLEVEL9K_DIR_DEFAULT_FOREGROUND="white"
 POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
 POWERLEVEL9K_SHORTEN_DIR_LENGTH=6

# Uncomment the following line to display red dots whilst waiting for completion.
 COMPLETION_WAITING_DOTS="true"

# Uncomment the following line if you want to change the command execution time
# stamp shown in the history command output.
# The optional three formats: "mm/dd/yyyy"|"dd.mm.yyyy"|"yyyy-mm-dd"
 HIST_STAMPS="dd.mm.yyyy"

# Which plugins would you like to load? (plugins can be found in ~/.oh-my-zsh/plugins/*)
# Custom plugins may be added to ~/.oh-my-zsh/custom/plugins/
# Example format: plugins=(rails git textmate ruby lighthouse)
# Add wisely, as too many plugins slow down shell startup.
 plugins=(git)

 source $ZSH/oh-my-zsh.sh

# Plugins
 source $HOME/.oh-my-zsh/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# NVM configs
 export NVM_DIR="$HOME/.nvm"
  [ -s "/usr/local/opt/nvm/nvm.sh" ] && . "/usr/local/opt/nvm/nvm.sh"  # This loads nvm
  [ -s "/usr/local/opt/nvm/etc/bash_completion.d/nvm" ] && . "/usr/local/opt/nvm/etc/bash_completion.d/nvm"  # This loads nvm bash_completion

# Rbenv
 export PATH="$HOME/.rbenv/bin:$PATH"
 eval "$(rbenv init -)"

# Rbens PATH
 export PATH=/$HOME/.npm-global/bin:/$HOME/.npm-global/bin:/$HOME/.rbenv/shims:/$HOME/.rbenv/bin:/$HOME/bin:/$HOME/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/games:/usr/local/games:/snap/bin

# Yarn
 export PATH="$HOME/.yarn/bin:$HOME/.config/yarn/global/node_modules/.bin:$PATH"

# Rbenv - ruby-build
 export PATH="$HOME/.rbenv/plugins/ruby-build/bin:$PATH"

# Elastic Beanstalk CLI
 export PATH="$HOME/.local/bin:$PATH"

# PostGreSQL
 export PATH="/usr/local/opt/postgresql@12/bin:$PATH"

# Aliases
# For a full list of active aliases, run `alias`.
 alias zshconfig="vim ~/.zshrc"
 alias ohmyzsh="cd ~/.oh-my-zsh"
 alias gitconfig="vim ~/.gitconfig"
 alias sshconfig="sudo vim /etc/ssh/ssh_config"
 alias rdb="rails db:drop && rails db:create && rails db:schema:load && rails db:seed"
 alias rs="rails s -b 'ssl://0.0.0.0:3000?key=./localhost/localhost.key&cert=./localhost/localhost.crt'"
 alias rake='noglob rake'
 alias ignoreFile="git update-index --assume-unchanged path/to/file"
 alias unIgnoreFile="git update-index --no-assume-unchanged path/to/file"


