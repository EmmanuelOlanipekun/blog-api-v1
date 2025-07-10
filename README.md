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
   - [Login](#User-Login)
- [Users](#User)
   - [Get my profile](#User-Profile)
   - [Get all users](#Get-all-users)
   - [Get profile views](#Get-profile-views)
   - [Update user details](#Update-user-details)
   - [Update user password](#Update-user-password)
   - [Update profile picture](#Update-user-profile-picture)
   - [User following](#User-following)
   - [User unfollowing](#User-unfollowing)
   - [User blocking](#User-blocking)
   - [User unblocking](#User-unblocking)
   - [User delete account](#User-delete-account)
   - [Admin block account](#Admin-block-account)
   - [Admin unblock account](#Admin-unblock-account)


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

# API Reference
## User Login

```http
POST api/v1/users/login
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | no       |
| `email` | `string` | Your email        | yes       |
|`password`| `string`| Your password     | yes       |


# User

## User profile

```http
GET api/v1/users/profile/
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## Get all users
```http
GET api/v1/users/
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | no       |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## Get profile views
```http
GET api/v1/users/profile-viewers/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## Update user details
```http
PUT api/v1/users/update-user/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | yes       |
|`password`| `string`| Your password     | no        |

## Update user password
```http
PUT api/v1/users/update-password
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | yes       |

## Update user profile picture
```http
PUT api/v1/users/profile-photo-upload
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | no       |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |
|`image` | `file` | Your profile photo   | yes       |

## User following
```http
PUT api/v1/users/following/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |


## User unfollowing
```http
PUT api/v1/users/unfollowing/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## User blocking
```http
PUT api/v1/users/block/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## User unblocking
```http
PUT api/v1/users/unblock/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## User delete account
```http
DELETE api/v1/users/delete-account/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## Admin block account
```http
PUT api/v1/users/admin-block/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |

## Admin unblock account
```http
PUT api/v1/users/admin-unblock/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | no        |
|`password`| `string`| Your password     | no        |







