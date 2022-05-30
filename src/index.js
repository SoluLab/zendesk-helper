import zendesk from 'node-zendesk';

class ZendeskHelper {
	constructor(username, apiToken, remoteUri) {
		this.zendeskClient = zendesk.createClient({
			username: username,
			token: apiToken,
			remoteUri: remoteUri,
		});

		this.GetClient = () => {
			return this.zendeskClient;
		};

		this.Verify = async () => {
			try {
				const response = await this.zendeskClient.users.auth();

				const authResult = {
					role: response.role,
					active: response.active,
					verified: response.verified,
				};

				if (!authResult.active) {
					throw Error('Zendesk account is inactive.');
				}

				return authResult;
			} catch (error) {
				throw Error('Zendesk is not configured properly.');
			}
		};

		this.CreateUser = async (user) => {
			try {
				let { email, firstName, middleName, lastName } = user;

				user.name = `${firstName} ${(middleName = middleName
					? middleName
					: '')} ${lastName}`;
				user.user_fields = {
					_user: user._id ? user._id.toString() : undefined,
				};

				// Verify if user already exits with the email
				const searchResult = await this.GetUserByEmail(email);

				// Get the user data
				let result = searchResult[0];
				if (searchResult.length === 0) {
					const newUser = await this.zendeskClient.users.create({
						user,
					});
					result = newUser;
				}

				// All Done
				return result;
			} catch (error) {
				throw error;
			}
		};

		// USERS

		this.GetUsersURL = () => {
			return `${remoteUri}/users`;
		};

		this.GetUserByEmail = async (email) => {
			const searchResult = await this.zendeskClient.users.search({
				query: `email:${email}`,
			});
			return searchResult;
		};

		this.GetUserByZendeskId = async (id) => {
			try {
				const result = await this.zendeskClient.users.show(id);
				return result;
			} catch (error) {
				throw error;
			}
		};

		// GROUPS

		this.GetGroupsURL = () => {
			return `${remoteUri}/groups`;
		};

		// Tickets

		this.GetTicketsURL = () => {
			return `${remoteUri}/tickets`;
		};

		this.CreateTicket = async (options) => {
			try {
				const { ticketObject, userObject } = options;
				const _user = await this.CreateUser(userObject);
				ticketObject.requester_id = _user.id;

				// Add User Metadata
				ticketObject.custom_fields = {
					_requestedBy: _user.user_fields,
				};

				// Add default priority
				ticketObject.priority = ticketObject.priority
					? ticketObject.priority
					: 'normal';

				const result = await this.zendeskClient.tickets.create({
					ticket: ticketObject,
				});
				return result;
			} catch (error) {
				throw error;
			}
		};

		this.GetTicketById = async (ticketId) => {
			try {
				const result = await this.zendeskClient.tickets.show(ticketId);
				return result;
			} catch (error) {
				throw error;
			}
		};
	}
}

module.exports = ZendeskHelper;
