/**
 * @author Christian Brel <christian@pulsetotem.fr, ch.brel@gmail.com>
 */

/// <reference path="../../t6s-core/core-backend/scripts/server/RouterItf.ts" />
/// <reference path="../../t6s-core/core-backend/scripts/Logger.ts" />

/// <reference path="../core/TwitterStreamerManager.ts" />
/// <reference path="../core/StreamClient.ts" />

/**
 * SearchesRouter class.
 *
 * @class SearchesRouter
 * @extends RouterItf
 */
class SearchesRouter extends RouterItf {

	/**
	 * Constructor.
	 */
	constructor() {
		super();
	}

	/**
	 * Method called during Router creation.
	 *
	 * @method buildRouter
	 */
	buildRouter() {
		var self = this;

		// Define '/run' route.
		this.router.post('/run', function(req : any, res : any) { self.runSearch(req, res); });
	}

	/**
	 * Run Search in params.
	 *
	 * @method runSearch
	 * @param {Express.Request} req - Request object.
	 * @param {Express.Response} res - Response object.
	 */
	runSearch(req : any, res : any) {
		if(typeof(req.body.search) == "undefined"
			|| typeof(req.body.search.id) == "undefined"
			|| typeof(req.body.search.oauth) == "undefined"
			|| typeof(req.body.search.keywords) == "undefined") {

			res.status(500).send("Missing some params to run search.");
			return;
		}

		var self = this;

		TwitterStreamerManager.startSearch(req.body.search);
	}
}