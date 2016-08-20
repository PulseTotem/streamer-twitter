/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />

var amqplib : any = require('amqplib/callback_api');

/**
 * Message Queue Connection to RabbitMQ.
 *
 * @class MessageQueueConnection
 */
class MessageQueueConnection {

	/**
	 * MQ Connection.
	 *
	 * @property connection
	 * @type any
	 * @static
	 */
	 static connection : any = null;

	/**
	 * Initialize connection with RabbitMQ server.
	 *
	 * @method init
	 * @param {Function} callback - Callback after initialization.
	 * @static
	 */
	static init(callback : Function) {
		if (MessageQueueConnection.connection != null) {
			callback();
		}

		amqplib.connect('amqp://localhost', function(err, conn) {
			if (err) {
				Logger.error("Error while connecting message queue server :", {"error" : err});
				return;
			}

			MessageQueueConnection.connection = conn;
			callback();
		});
	}
}