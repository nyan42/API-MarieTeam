
## Installation de l'API :

  ### La Base de données  
Pour obtenir la base de données de Marie-Team, il faut :
-  Installer MongoDB: [https://www.mongodb.com/download-center/community](https://www.mongodb.com/download-center/community  "https://www.mongodb.com/download-center/community") (configuration basique)

  
### Prérequis pour la BDD :  

* Avoir l'API sur le bureau

* Ouvrir un bloc de commande BASH

* Aller dans son dossier home : ( cd ~ *(ou /c/User/$name)*)

* Lancer la commande `nano .bash_profile`

* Insérer dans ce fichier :

----------------
alias mongod="/c/Program\ files/MongoDB/Server/4.2/bin/mongod.exe"

alias mongo="/c/Program\ Files/MongoDB/Server/4.2/bin/mongo.exe"

alias mongodump="/c/Program\ Files/MongoDB/Server/4.2/bin/mongodump.exe"

alias mongorestore="/c/Program\ Files/MongoDB/Server/4.2/bin/mongorestore.exe"

----------
  Cela permet d'avoir toutes les variables d'environnement nécessaires.

Ensuite dans le Disque Local  C:/ , il faut créer 2 dossiers (l'un dans l'autre, afin d'avoir : 
 
* C:/data/db
 
Ensuite, on peut :
* Se connecter et utiliser MongoDB Compass

  

### Récupération de la BDD

  Faire dans le terminal shell ;
* `mongod`

* Ouvrir un autre terminal et faire :

*` mongorestore -d dbname dbpath `*

  

Example : `mongorestore -d api /c/Utilisateurs/Victor/Bureau/api_Marie-Team/mongo`

  
### Lancer l'API

  + Dans le dossier de l'api lancer la commande :

+  `npm update` ou `npm install`

Puis, lancer la commande : 
+  `nodemon` ou bien `node Server.js`

  L' API est alors fonctionnelle. 