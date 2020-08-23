# Archimydes Node App


## Technology used
- Node
- Express
- Postgres
- JWT
- Typescript
- TypeORM

## Asumptions
I assumed that the user will specify the acount type when creating a new user

## Endpoint
- POST `http://localhost:3001/api/auth/register` to register an account
```
  {
	"firstName": "Kingsley",
	"lastName": "Obot",
	"email": "kingsley@example.com",
	"password": "secret",
        "role": "Admin" // Optional, default is user
}
```
<br>

- POST `http://localhost:3001/api/auth/login` to login
```
{
	"email": "king@example.com",
	"password": "secret"
}
```
<br>

- POST `http://localhost:3001/api/tickets` to create a ticket. Add token `x-access-token` in the header
```
{
    "summary": "Setup Heroku",
    "description": "Set up heroku server on the project",
    "type": "BugFix",
    "complexity": "Low",
    "completionTime": 2,
    "cost": 2000,
    "status": "New"
}
```
<br>

- GET `http://localhost:3001/api/tickets` to get all tickets (Admin role). Add token `x-access-token` in the header
<br>

- GET `http://localhost:3001/api/tickets/{id}` to get a single ID. You can only get the item you created. Add token `x-access-token` in the header
<br>

- PUT `http://localhost:3001/api/tickets/{id}` to make changes to a ticket (Admin role). Add token `x-access-token` in the header
```
{
    "type": "Enhancement",
    "status": "Accepted" // Note: You can change other fields also.
}
```
<br>
