import { connect, ConnectOptions } from 'mongoose'; // Importation de Mongoose et des options de connexion

export const dbConnect = () => { // Exportation de la fonction dbConnect pour établir la connexion à la BDD
    connect(process.env.MONGO_URI!, { // Connexion à MongoDB en utilisant l'URI défini dans les variables d'environnement
        useNewUrlParser: true, // Utilisation du nouvel analyseur d'URL de MongoDB
        useUnifiedTopology: true // Utilisation de la topologie unifiée de MongoDB
    } as ConnectOptions).then( // Utilisation des options de connexion
        () => console.log('connexion avec succès'), 
        (error) => console.log(error) 
    )
}
