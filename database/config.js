const mongoose = require('mongoose');
const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB ONLINE');
    } catch(error){
        console.error(error);
        throw new Error('Error al iniciar la BDD. Ver Logs');
    }
};

module.exports = {
    dbConnection
}