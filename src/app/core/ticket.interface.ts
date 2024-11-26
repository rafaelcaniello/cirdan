export interface Ticket {
	id: string;
	protocol: string;
	type: TicketTypeEnum;
	subject: string;
	category: string;
	urgency: TicketUrgencyEnum;
	status: string;
	justification: TicketJustificationEnum;
	createdDate: string;
	owner: user; // responsável
	ownerTeam: string;
	createdBy: user; // solicitante
	serviceFirstLevel?: string; // primeiro nível de serviço
	serviceSecondLevel?: string; // segundo nível de serviço
	serviceThirdLevel?: string; // terceiro nível de serviço
	resolvedIn: string;
	closedIn: string;
	canceledIn: string;
	reopenedIn: string;
	lastActiondate: string;
	lastUpdate: string;
	clients: user[]; // clientes
	customFieldValues: [customFieldValues]; // para saber se é FSM ou CMMS
}

export interface TicketSummary {
	id: string;
	protocol: string;
	type: TicketTypeEnum;
	subject: string;
	category: string;
	urgency: TicketUrgencyEnum;
	status: string;
	justification: TicketJustificationEnum;
	createdDate: string;

}

export interface user {
	id: string;
	businessName: string;
	email: string;
}

export interface customFieldValues {
	items: [customFieldValuesItems];
}

export interface customFieldValuesItems {
	customFieldItem: string;
}

export enum TicketTypeEnum {
	Interno = 1,
	Público = 2
}

export enum TicketUrgencyEnum {
	'01 - Alta' = 1,
	'02 - Média' = 2,
	'03 - Baixa' = 3
}

export enum TicketJustificationEnum {
	'Triagem' = 1,
	'A Fazer' = 2,
	'Fazendo' = 3,
	'Validação Interna' = 4,
	'Devbox' = 5,
	'Devbox Validado' = 6,
	'Publicação' = 7
}

export enum UserEnum {
  User1 = 'User 1',
  User2 = 'User 2',
  User3 = 'User 3',
  User4 = 'User 4',
}

export const users = [
  { id: '1', businessName: 'User 1', email: 'user1@example.com' },
  { id: '2', businessName: 'User 2', email: 'user2@example.com' },
  { id: '3', businessName: 'User 3', email: 'user3@example.com' },
  { id: '4', businessName: 'User 4', email: 'user4@example.com' },
];

