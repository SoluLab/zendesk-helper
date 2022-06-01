import zendesk, { Users, Tickets } from 'node-zendesk';

interface AuthResult {
	role: any;
	active: any;
	verified: any;
}

interface TicketModel {
	ticketObject: Tickets.CreateModel;
	userObject: any;
}

declare class ZendeskHelper {
	constructor(username: string, apiToken: string, remoteUri: string);
	zendeskClient: zendesk.Client;

	GetClient(): zendesk.Client;

	Verify(): Promise<AuthResult>;

	CreateUser(user: any): Promise<Users.ResponsePayload | Users.ListPayload>;

	GetUsersURL(): string;

	GetUserByEmail(email: string): Promise<Users.ListPayload>;

	GetUserByZendeskId(id: number): Promise<Users.ResponsePayload>;

	GetGroupsURL(): string;

	GetTicketsURL(): string;

	CreateTicket(ticketOptions: TicketModel): Promise<Tickets.ResponsePayload>;

	GetTicketById(ticketId: number): Promise<Tickets.ResponsePayload>;
}

export default ZendeskHelper;
