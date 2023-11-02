import {Sequelize} from 'sequelize'
import "dotenv/config"

 export default new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    "Lok!@#321",
    {
        host:process.env.DB_HOSTNAME,
        dialect:"mysql",
        pool:{
            max:5,
        },    
    }
  );