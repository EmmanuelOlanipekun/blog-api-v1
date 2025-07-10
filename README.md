# Blog API Project

## Tech Stack

__Server:__ Node, Express, MongoDB, Mongoose, JWT

# API FEATURES
- Authentication & Authorization
- Post CRUD operations
- Comment functionality
- System blocking user if inactive for 30 days
- Admin blocking a user
- A user blocking different users
- Last date a post was created
- Check last day a user was active
- Changing user award based on number of post
- User following and unfollowing other users
- Following and followers count
- Profile viewers count
- Post created count
- Get blocked user count
- Password update
- Profile photo upload
- Account deletation

# ENDPOINTS
- [API Authentication](#API-Authentication)
   - [Register a new API client](#Register-a-new-API-client)
   - [Login](https://www.github.com/octokatherine)
- [Users](https://www.github.com/octokatherine)
   - [Get my profile](https://www.github.com/octokatherine)
   - [Get all users](https://www.github.com/octokatherine)
   - [Get profile views](https://www.github.com/octokatherine)
   - [Update user detail](https://www.github.com/octokatherine)
   - [Update user password](https://www.github.com/octokatherine)
   - [Update profile picture](https://www.github.com/octokatherine)
   - [User following](https://www.github.com/octokatherine)
   - [User unfollowing](https://www.github.com/octokatherine)
   - [User blocking](https://www.github.com/octokatherine)
   - [User unblocking](https://www.github.com/octokatherine)
   - [User delete account](https://www.github.com/octokatherine)


# API Authentication
Some endpoints may require authentication. For example, to create/update/delete a post, u need to register your API client and obtain the access token.

The endpoints that require authentication expect a bearer token in the `Authorization Header`.

__Example__:

`Authorizatio: Bearer YOUR TOKEN`

## Register a new API client
```http
POST api/v1/users/register
```
The request body need to be in JSON format.









