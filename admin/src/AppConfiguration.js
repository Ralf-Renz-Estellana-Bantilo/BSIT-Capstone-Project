class AppConfiguration {
	constructor() {
		this.CONFIGURED_URL = undefined;
	}

	url() {
		const currentURL = window.location.href;

		if (currentURL.includes("localhost")) {
			this.CONFIGURED_URL = "http://localhost:2000";
		} else {
			this.CONFIGURED_URL =
				"https://job-search-system-catarman.herokuapp.com";
		}

		return this.CONFIGURED_URL;
	}
}

export default new AppConfiguration();
