# Secret Match API

A RESTful API that allows users to sign up for a "Secret Match" event, be randomly assigned another participant, and view their match.  
Built with **NestJS**, **Prisma**, **PostgreSQL**, and **JWT Authentication**.



## Endpoints

- `POST /users/register`: Register a new user
- `POST /users/login`: Login and receive a JWT
- `POST /match/join`: User joins the Secret Match event (auth required)
- `POST /match/assign`: Randomy assigns matches (admin only)
- `GET /match/view`: User views their assigned match (auth required)
- `PATCH /users/message`: User sets their match message (auth required)
