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
- [Users](#Users)
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

- [Posts](#Posts)
   - [Create post](#Create-post)
   - [Fetch all posts](#Fetch-all-posts)
   - [Fetch a post](#Fetch-a-post)
   - [Like a post](#Like-a-post)
   - [Dislike a post](#Dislike-a-post)
   - [Post views](#Post-views)
   - [Delete a post](#Delete-a-post)
   - [Update a post](#Update-a-post)
 
- [Comments](#Comments)
   - [Create a comment](#Create-a-comment)
   - [Delete a comment](#Delete-a-comment)
   - [Update a comment](#Update-a-comment)
 
- [Categories](#Categories)
   - [Create a category](#Create-a-category)
   - [Fetch all categories](#Fetch-all-categories)
   - [Fetch a category](#Fetch-a-cayegory)
   - [Delete a category](#Delete-a-category)
   - [Update a category](#Update-a-category)
  
   


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


# Users

## User profile

```http
GET api/v1/users/profile/
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |


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
| `id`    | `string` | Your id           | yes       |

## Update user details
```http
PUT api/v1/users/update-user/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `email` | `string` | Your email        | yes       |

## Update user password
```http
PUT api/v1/users/update-password
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
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
| Parameter | Type | Description          | Required  |
| :---------| :----| :--------------------| :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | id of user to follow  | yes       |

## User unfollowing
```http
PUT api/v1/users/unfollowing/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | id of user to unfollow | yes     |

## User blocking
```http
PUT api/v1/users/block/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | id of user to block  | yes       |

## User unblocking
```http
PUT api/v1/users/unblock/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | id of user to unblock  | yes     |

## User delete account
```http
DELETE api/v1/users/delete-account/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | Your id              | yes       |

## Admin block account
```http
PUT api/v1/users/admin-block/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | id to be blocked by admin | yes       |

## Admin unblock account
```http
PUT api/v1/users/admin-unblock/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `id` | `string` | id to be unblocked by admin  | yes      |

# Posts

## Create post
```http
POST api/v1/posts/create-post
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `title` | `string` | Post title         | yes       |
|`description`| `string`| Post description | yes      |
|`category` | `_id` | Post Category       | yes       |

## Fetch all posts
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |

## Fetch a post
```http
GET api/v1/posts/fetch-post/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Post id               | yes       |

## Like a post
```http
GET api/v1/posts/like-post/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Post id               | yes       |

## Dislike a post
```http
GET api/v1/posts/dislike-post/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Post id               | yes       |

## Post views
```http
GET api/v1/posts/post-views/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Post id               | yes       |

## Delete a post
```http
DELETE api/v1/posts/delete-post/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Post id               | yes       |

## Update a post
```http
PUT api/v1/posts/update-post/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Post id               | yes       |

# Comments

## Create a comment
```http
POST api/v1/comments/create-comment/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
|`description` | `string` | Comment description | yes |
| `id` | `string` | Post id               | yes       |

## Delete a comment
```http
DELETE api/v1/comments/delete-comment/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
| `id` | `string` | Comment id               | yes    |

## Update a comment
```http
PUT api/v1/comments/updatee-comment/:id
```
| Parameter | Type | Description          | Required  |
| :---------| :----| :----------------    | :---------|
|`authentication` | `string` | Your token | yes       |
|`description` | `string` | Comment description | yes |
| `id` | `string` | Comment id               | yes       |

# Categories

## Create a category
```http
POST api/v1/categories/create-category
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `title`    | `string` | Category title | yes       |

## Fetch all categories
```http
GET api/v1/categories/fetch-categories
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|

## Fetch a category
```http
GET api/v1/categories/fetch-category/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
| `id`    | `string` | Category id       | yes       |

## Delete a category
```http
DELETE api/v1/categories/delete-category/:id
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token  | yes      |
| `id`    | `string` | Category id       | yes       |

## Update a category
```http
PUT api/v1/categories/create-category
```
| Parameter | Type | Description         | Required  |
| :---------| :----| :----------------   | :---------|
|`authentication` | `string` | Your token | yes      |
| `title`    | `string` | Category title | yes       |
| `id`    | `string` | Category id       | yes       |





