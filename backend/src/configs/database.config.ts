import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => { // Fonction permettant la connexion à la BDD
    connect(process.env.MONGO_URI!, { // ref fichier .env
        useNewUrlParser: true,
        useUnifiedTopology: true
        // spécifie que Mongoose doit utiliser les nouveaux analyseurs d'URL et la topologie unifiée.
    } as ConnectOptions).then(
        () => console.log('connexion avec succès'),
        (error) => console.log(error)
    )
}

