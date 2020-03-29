const mongoose = require('mongoose');
var ConfigLoader = require('../config/ConfigLoader');
var config = new ConfigLoader();
const loggingService = require('./LoggingService');

/**
 * Singleton Mongo service wrapper class to connect to Mongo
 * */

class MongoService {

	constructor() {
		console.log('MongoService init');
		//this.logger = loggingService.getDefaultLogger();
	}

	/**
	 * Initialize a Mongo connection
	 * @author  Pijus Kumar Sarker
	 * @param void
	 * @return void
	 * @exception IOException On input error.
	 * @see IOException
	 * */
	initialize() {
		try {
			console.log('Mongo Initialize');
			let hostName = config.get('database.mongo.hostName');
			if(process.env.NODE_ENV === 'production') {
				let auth = process.env.MONGO_USERNAME + ':' + process.env.MONGO_PASSWORD;
				let connectionString = process.env.MONGO_URLS + '/' + process.env.MONGO_DB_NAME + '?readPreference=secondary&replicaSet=' + process.env.MONGO_REPLICA_SET;
				loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: Mongo connection string: ' + connectionString);
				hostName = 'mongodb://' + auth + '@' + connectionString;
			}
			// Set up default mongoose connection
			let options = {
				useNewUrlParser: true,
				autoReconnect: true,
				connectTimeout: 10000,
				poolSize: 10,
				reconnectTries: Number.MAX_VALUE,
				reconnectInterval: 500,
				bufferCommands: false,
				bufferMaxEntries: 0
			};

			if(process.env.NODE_ENV === 'production') {
				options.auth = {
					authdb: 'admin'
				}
			}
			console.log('hostName :', hostName);
			mongoose.set('useCreateIndex', true);
			mongoose.connect(hostName, options, function (error) {
				console.log('Connect :', hostName);
				if (error) {
					console.log(error);
					loggingService.getDefaultLogger().error('[MONGODB]-[CONNECTION]-ERROR: MongoDB CONNECT error: ');
				}
				loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: MongoDB CONNECT Successful: ');
			});

			// Get Mongoose to use the global promise library
			mongoose.Promise = global.Promise;

			// Bind listeners to mongo connection events
			mongoose.connection.on("connecting", (ref) => {
					//this.logger.info('[MONGODB]-[CONNECTION]-INFO: Connecting to MongoDB', JSON.stringify(ref));
				loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: Connecting to MongoDB');
			});
			mongoose.connection.on("connected", (ref) => {
				loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: Connected to MongoDB');
			});

			mongoose.connection.once("open", (ref) => {
				loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: Connection opened');
			});

			mongoose.connection.on("reconnected", (ref) => {
				loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: Reconnected');
			});

			mongoose.connection.on("error", (error) => {
				loggingService.getDefaultLogger().error('[MONGODB]-[CONNECTION]-ERROR: MongoDB Error: ', JSON.stringify(error));
			});

			mongoose.connection.on("disconnected", (ref) => {
				loggingService.getDefaultLogger().error('[MONGODB]-[CONNECTION]-ERROR: MongoDB Disconnected: ', JSON.stringify(ref));

				setTimeout(() => {
					mongoose.connect(hostName, options);
				}, 250);
			});

		} catch (ex) {
			console.log(ex);
			loggingService.getDefaultLogger().error('[MONGODB]-[CONNECTION]-ERROR: MongoDB CONNECT exception: ' + JSON.stringify(ex));
		} finally {
			loggingService.getDefaultLogger().info('[MONGODB]-[CONNECTION]-INFO: Leaving MongoDB CONNECT block');
		}
	}

	/**
	 * Get instance of DB Client
	 * @author Pijus Kumar Sarker
	 * @param void
	 * @return returns mongoose instance
	 * */
	getClient() {
		return mongoose;
	}
}

const mongoService = new MongoService;
Object.freeze(mongoService);
module.exports = mongoService;
