// Random snippet of code I had laying around

export default class Topic() {
	constructor(name, topic, state, convo) {
		this.queries = topic.queries;
		this.query = 0;
		this.state = state || {};
		this.convo = convo;
		this.name = name;
	}

	async handle(message) {
		let result;
		const query = this.queries[this.query];
		try {
			result = await query.handle(this.state, this.convo, message);
		} catch (e) {
			console.error(e);
			this.sendMessage({
				text: messages.error
			});
			return {
				state: this.state,
				done: true,
				next: null
			}
		}

		this.sendMessage(result.message);

		if (result.exit || !result.done) {
			return {/*TODO*/};
		}
	}
}