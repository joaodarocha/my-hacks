# Enable Powerlevel10k instant prompt. Should stay close to the top of ~/.zshrc.

# To customize prompt, run `p10k configure` or edit ~/.p10k.zsh.
[[ ! -f ~/.p10k.zsh ]] || source ~/.p10k.zsh

# Initialization code that may require console input (password prompts, [y/n]
# confirmations, etc.) must go above this block; everything else may go below.
if [[ -r "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh" ]]; then
  source "${XDG_CACHE_HOME:-$HOME/.cache}/p10k-instant-prompt-${(%):-%n}.zsh"
fi

# Ignore "completion-dependent directories detected" error
ZSH_DISABLE_COMPFIX=true

# Path to your oh-my-zsh installation.
 export ZSH=/$HOME/.oh-my-zsh

#Supress ZSH initialization warning
typeset -g POWERLEVEL9K_INSTANT_PROMPT=quiet

# ZSH THEME #
 ZSH_THEME="powerlevel10k/powerlevel10k"

### POWERLEVEL9k SETTING ###
 # POWERLEVEL9K MODE
 POWERLEVEL9K_MODE='nerdfont-complete'
 #By default, powerlevel10k is a single-lined prompt. If you would like to have the segments display on one line
 POWERLEVEL9K_PROMPT_ON_NEWLINE=true
 # If you would like to add a newline after each prompt / print loop
 POWERLEVEL9K_PROMPT_ADD_NEWLINE=true
 POWERLEVEL9K_SHORTEN_DIR_LENGTH=2
 POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(os_icon dir vcs)
 POWERLEVEL9K_VIRTUALENV_SHOW_PYTHON_VERSION=true
 POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(pyenv virtualenv nvm date)
 POWERLEVEL9K_DATE_FORMAT="%D{%H:%M \uf017 %d.%m.%y}"
 POWERLEVEL9K_OS_ICON_BACKGROUND="white"
 POWERLEVEL9K_OS_ICON_FOREGROUND="black"
 POWERLEVEL9K_DIR_HOME_FOREGROUND="white"
 POWERLEVEL9K_DIR_HOME_SUBFOLDER_FOREGROUND="white"
 POWERLEVEL9K_DIR_DEFAULT_FOREGROUND="white"§
 POWERLEVEL9K_SHORTEN_STRATEGY="truncate_middle"
 POWERLEVEL9K_SHORTEN_DIR_LENGTH=6
# POWERLEVEL9K_VCS_SHORTEN_LENGTH=12
# POWERLEVEL9K_VCS_SHORTEN_MIN_LENGTH=12
# POWERLEVEL9K_VCS_SHORTEN_STRATEGY=truncate_middle

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
 source $HOME/.oh-my-zsh/custom/plugins/zsh-syntax-highlighting/zsh-syntax-highlighting.zsh

# Activate Python virtualenv 
autoload -U add-zsh-hook
activate-venv() {
  if [[ -z "$VIRTUAL_ENV" ]] ; then
      echo "No activated virtualenv found."
      ## If venv folder is found then activate the vitualenv
      if [[ -e ./venv/bin/activate ]] ; then
	echo "Activating virtualenv in $PWD/venv/bin/activate"
        source ./venv/bin/activate
	echo "Activated $(python -V)"
      fi
  else
    ## check the current folder belong to earlier VIRTUAL_ENV folder
    # if yes then do nothing
    # else deactivate
      parentdir="$(dirname "$VIRTUAL_ENV")"
      if [[ "$PWD" != "$parentdir" ]] ; then
	echo "Deactivating previous virtualenv"
        deactivate
        if [[ -e ./venv/bin/activate ]] ; then
	  echo "Activating virtualenv in $PWD/venv/bin/activate"
          source ./venv/bin/activate
	  echo "Activated $(python -V)"
        fi
      fi
  fi
}
# TO ENABLE auto activating virtual-env environemnt
# UNCOMMENT next 2 lines
# add-zsh-hook chpwd activate-venv
# activate-venv

# NVM configs
  export NVM_DIR="$HOME/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
  [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion

# NVM: load node version from .nvmrc
autoload -U add-zsh-hook
load-nvmrc() {
  local node_version="$(nvm version)"
  local nvmrc_path="$(nvm_find_nvmrc)"

  if [ -n "$nvmrc_path" ]; then
    local nvmrc_node_version=$(nvm version "$(cat "${nvmrc_path}")")

    if [ "$nvmrc_node_version" = "N/A" ]; then
      nvm install
    elif [ "$nvmrc_node_version" != "$node_version" ]; then
      nvm use
    fi
  elif [ "$node_version" != "$(nvm version default)" ]; then
    echo "Reverting to nvm default version"
    nvm use default
  fi
}
add-zsh-hook chpwd load-nvmrc
load-nvmrc

# pyenv - The power of pyenv comes from its control over our shell's path.
# In order for it to work correctly, we need to add the following to our configuration file
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init --path)"
eval "$(pyenv init -)"

# Aliases
# For a full list of active aliases, run `alias`.
alias sourceZshConfig="source ~/.zshrc"
alias zshconfig="vim ~/.zshrc"
alias ohmyzsh="cd ~/.oh-my-zsh"
alias gitconfig="vim ~/.gitconfig"
alias gitconfig-work="vim ~/work/.gitconfig.work"
alias gitconfig-personal="vim ~/personal/.gitconfig.personal"
alias gs="git status"
alias sshconfig="vim ~/.ssh/config"
alias ignoreFile="echo 'git update-index --assume-unchanged path/to/file'"
alias unIgnoreFile="echo 'git update-index --no-assume-unchanged path/to/file'"
alias fixXcode="sudo rm -rf $(xcode-select -print-path) && xcode-select --install"
alias fixProtobuf="node_modules/@google/bracket/python/env/bin/pip uninstall --yes protobuf && node_modules/@google/bracket/python/env/bin/pip install 'protobuf>=3.19.4,<3.20'"
alias dockerClearLogs="echo 'rm /var/lib/docker/containers/*/*.log' | nc -U -w 0 ~/Library/Containers/com.docker.docker/Data/debug-shell.sock"

# Ruby OLD alias
#alias rdb="rails db:drop && rails db:create && rails db:schema:load && rails db:seed"
#alias rs="rails s -b 'ssl://0.0.0.0:3000?key=./localhost/localhost.key&cert=./localhost/localhost.crt'"
#alias rake='noglob rake'

# Load Angular CLI autocompletion.
source <(ng completion script)
#export PATH="/usr/local/opt/openjdk@11/bin:$PATH"

# The next line updates PATH for the Google Cloud SDK.
if [ -f '/Users/joao.rocha/google-cloud-sdk/path.zsh.inc' ]; then . '/Users/joao.rocha/google-cloud-sdk/path.zsh.inc'; fi

# The next line enables shell command completion for gcloud.
if [ -f '/Users/joao.rocha/google-cloud-sdk/completion.zsh.inc' ]; then . '/Users/joao.rocha/google-cloud-sdk/completion.zsh.inc'; fi
