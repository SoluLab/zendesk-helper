# <center>Zendesk Helper Library</center>
***

## Install
---

<strong>To use the package, just do the standard</strong>

    $ npm install --save zendesk-helper


## Startup
---

* <strong>CommonJS</strong>

```js

var Zendesk = require('zendesk-helper');

var zendeskHelper = new Zendesk('username', 'apiToken', 'remoteUrl');

```
* <strong>ESM</strong>

```js

import Zendesk  from 'zendesk-helper';

const zendeskHelper = new Zendesk('username', 'apiToken', 'remoteUrl');

```

## Usage
---

* <strong>GetClient</strong>

```js
// It returns zendesk client object

const client = zendeskHelper.GetClient();

```

* <strong>Verify</strong>

```js
// authanticates the user
// returns an object of role,active status and verification status
// it returns promise so resolve the promise

const user = await zendeskHelper.Verify();
```

* <strong>CreateUser</strong>

```js
// creates a user if not availavle
// it returns the created user
// it takes one argument userObject
// it returns promise so resolve the promise

const user = await zendeskHelper.CreateUser(
	{
		email:'abc@example.com',
		firstName:'Rakesh',
		middleName:'Kumar', // Optional
		lastName:'Mishra',
		...
	}
);
```

* <strong>GetUsersURL</strong>

```js
// it returns the url of users

const usersUrl = zendeskHelper.GetUsersURL();
```

* <strong>GetUserByEmail</strong>

```js
// it returns the user of given email
// it returns promise so resolve the promise

const user = await zendeskHelper.GetUserByEmail(email);
```

* <strong>GetUserByZendeskId</strong>

```js
// it returns the user of given zendeskId
// it returns promise so resolve the promise

const user = await zendeskHelper.GetUserByZendeskId(zendeskId);
```

* <strong>GetGroupsURL</strong>

```js
// it returns the group url

const groupUrl = zendeskHelper.GetGroupsURL();
```

* <strong>GetTicketsURL</strong>

```js
// it returns the tickets url

const ticketsUrl = zendeskHelper.GetTicketsURL();
```

* <strong>CreateTicket</strong>

```js
// it returns the created ticket
// takes two arguments ticketObject and userObject
// if user exists creates ticket for that user
// if user not exist creates user and ticket for that user as well
// it returns promise so resolve the promise

const ticket = await zendeskHelper.CreateTicket({
	ticketObject:{...},
	userObject:{...},
});
```

* <strong>GetTicketById</strong>

```js
// it return the ticket for given ticketId
// takes to arguments ticketId
// it returns promise so resolve the promise

const ticket = await zendeskHelper.GetTicketById(ticketId)
```