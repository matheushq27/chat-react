export type usersType = {
    user: string
    name: string
    surname: string
    email: string
    password: string
}

export type usersTypeFriend = {
    users: arrayUserFriend[]
}

export type arrayUserFriend = {
    user: string
    name: string
    email: string
}