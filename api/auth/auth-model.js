const db = require('../../data/dbConfig.js');

function getUser () {
return db("users")
}

function findByUsername (username) {
return db("users").where("username", username).first()
}

function findById (id) {
return db("users").where("id", id).first()
}

async function createUser (user) {
const [id] = await db("users").insert(user)
return findById(id)
}

module.exports = {
    getUser,
    findByUsername,
    findById,
    createUser
}