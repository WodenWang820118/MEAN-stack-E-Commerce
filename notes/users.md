# Authentication
- POST http://localhost:3000/users/login
- body
{
  "email": <email>,
  "passwordHash": <password>
}
- check Atlas database collection
- may register the user using the "password" instead of "passwordHash" since it's confusing