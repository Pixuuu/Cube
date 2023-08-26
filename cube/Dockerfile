# Utilisez l'image de base Node.js
FROM node:18.14

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers de package.json et package-lock.json pour installer les dépendances
COPY package*.json ./

# Installez les dépendances
RUN npm install -g @angular/cli
RUN npm install

# Copiez le reste des fichiers de l'application
COPY . .

# Exécutez le serveur de développement Angular
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]