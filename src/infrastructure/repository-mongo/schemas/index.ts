import { connect } from 'mongoose';


export const dbConnection = async () => {

    try {

        await connect('mongodb://localhost:27017/tienda', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Online');


    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');
    }


}