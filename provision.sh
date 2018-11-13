#https://wiki-ebabel.herokuapp.com/index.php?title=Vagrant-nodejs-angularjs-tutorial

 #! /bin/bash
 if [ ! -f /home/vagrant/already-installed-flag ]
 then
   echo "*********UBUNTU UPDATE*********"
   sudo apt-get update
   lsb_release -a

   echo "*********BUILD ESSENTIAL*********"
   sudo apt-get -qq -y install build-essential libssl-dev

   echo "*********INSTALL TREE*********"
   apt-get -qq -y install tree
   tree --version

   echo "*********INSTALL UNZIP*********"
   apt-get -qq -y install unzip
   unzip -v
   touch /home/vagrant/already-installed-flag

   echo "*********INSTALL GIT*********"
   apt-get -qq -y install git
   git --version
   git config --global user.name "jgregorio"
   git config --global user.email gregoriojesus0@gmail.com

<<<<<<< HEAD
   echo "*********INSTALL LIB FOR PUPPETTER / SPA PRERENDER*********"
   sudo apt-get install gconf-service -y
   sudo apt-get install libasound2 -y
   sudo apt-get install libatk1.0-0 -y
   sudo apt-get install libc6 -y
   sudo apt-get install libcairo2 -y
   sudo apt-get install libcups2 -y
   sudo apt-get install libdbus-1-3 -y
   sudo apt-get install libexpat1 -y
   sudo apt-get install libfontconfig1 -y
   sudo apt-get install libgcc1 -y
   sudo apt-get install libgconf-2-4 -y
   sudo apt-get install libgdk-pixbuf2.0-0 -y
   sudo apt-get install libglib2.0-0 -y
   sudo apt-get install libgtk-3-0 -y
   sudo apt-get install libnspr4 -y
   sudo apt-get install libpango-1.0-0 -y
   sudo apt-get install libpangocairo-1.0-0 -y
   sudo apt-get install libstdc++6 -y
   sudo apt-get install libx11-6 -y
   sudo apt-get install libx11-xcb1 -y
   sudo apt-get install libxcb1 -y
   sudo apt-get install libxcomposite1 -y
   sudo apt-get install libxcursor1 -y
   sudo apt-get install libxdamage1 -y
   sudo apt-get install libxext6 -y
   sudo apt-get install libxfixes3 -y
   sudo apt-get install libxi6 -y
   sudo apt-get install libxrandr2 -y
   sudo apt-get install libxrender1 -y
   sudo apt-get install libxss1 -y
   sudo apt-get install libxtst6 -y
   sudo apt-get install ca-certificates -y
   sudo apt-get install fonts-liberation -y
   sudo apt-get install libappindicator1 -y
   sudo apt-get install libnss3 -y
   sudo apt-get install lsb-release -y
   sudo apt-get install xdg-utils -y
   sudo apt-get install wget -y

   #echo "*********CONFIG NODE_MODULES*********"
   #mkdir /home/vagrant/node_modules
   #ln -s /home/vagrant/node_modules /home/vagrant/project/node_modules
=======
   #echo "*********CONFIG NODE_MODULES*********"
   #sudo -H -u vagrant bash -c 'mkdir /home/vagrant/node_modules'
   #sudo -H -u vagrant bash -c 'ln -s /home/vagrant/node_modules /home/vagrant/project/node_modules'
>>>>>>> refs/remotes/origin/master

   #echo "*********INSTALL NVM && NODEJS && NPM*********"
   #TODO change to user vagrant??
  #cd /home/vagrant
  #git clone https://github.com/creationix/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
  #echo "source ~/.nvm/nvm.sh" >> ~/.profile
  #source ~/.profile
<<<<<<< HEAD
  #nvm install $NODE_VERSION
  #nvm alias default $NODE_VERSION
=======
  #nvm install 8.11.2
  #nvm alias default 8.11.3
>>>>>>> refs/remotes/origin/master
  #node -v
  #npm -v

  #echo "*********INSTALL VUE CLI*********"
  #npm install -g vue-cli

  #echo "*********INSTALL PROJECT*********"
  #cd /home/vagrant/project
  #npm install

   echo "*********Done!*********"
 else
   echo "already installed flag set : /home/vagrant/already-installed-flag"
 fi
