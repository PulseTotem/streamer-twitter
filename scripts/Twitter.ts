/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../t6s-core/core-backend/scripts/server/Server.ts" />
/// <reference path="../t6s-core/core-backend/scripts/Logger.ts" />
/// <reference path="./database/MongoDBConnection.ts" />
/// <reference path="./routers/SearchesRouter.ts" />

/// <reference path="./mq/MessageQueueConnection.ts" />

/**
 * Represents PulseTotem's Twitter Streamer.
 *
 * @class Twitter
 * @extends Server
 */
class Twitter extends Server {
	/**
	 * Constructor.
	 *
	 * @param {number} listeningPort - Server's listening port.
	 * @param {Array<string>} arguments - Server's command line arguments.
	 */
	constructor(listeningPort : number, arguments : Array<string>) {
		super(listeningPort, arguments);

		this.init();
	}

	/**
	 * Method to init the Twitter server.
	 *
	 * @method init
	 */
	init() {
		var self = this;

		var successMQConnection = function() {
			Logger.debug("Success to connect to MQ Server.");

			self.buildAPI();
		};

		var successDBConnection = function () {
			Logger.debug("Success to connect to Database.");

			MessageQueueConnection.init(successMQConnection);
		};

		MongoDBConnection.init(successDBConnection);
	}

	/**
	 * Method to build API.
	 *
	 * @method buildAPI
	 */
	buildAPI() {
		this.addAPIEndpoint("searches", SearchesRouter);
	}
}

/**
 * Server's Twitter listening port.
 *
 * @property _TwitterListeningPort
 * @type number
 * @private
 */
var _TwitterListeningPort : number = process.env.PORT || 15000;

/**
 * Server's Twitter command line arguments.
 *
 * @property _TwitterArguments
 * @type Array<string>
 * @private
 */
var _TwitterArguments : Array<string> = process.argv;

var serverInstance : Twitter = new Twitter(_TwitterListeningPort, _TwitterArguments);
serverInstance.run();