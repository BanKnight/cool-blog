const fs = require("fs")
const path = require("path")
const sqlite = require("sqlite3")
const mongo = require("mongodb")

const config = require("../../config")

const server = require("../head")
const me = server.modules.db

const data = me.data

me.start = async function()
{
    const connect_str = `mongodb://${config.db.host}:${config.db.port}`

    return new Promise((resolve,reject)=>
    {
        mongo.connect(connect_str,(err,client)=>
        {
            if(err)
            {
                console.log(err)
                resolve(false)
            }
            else
            {
                data.db = client.db(config.db.db)
                console.log(`connect ${connect_str} ok`)
                resolve(true)
            }
        })
    })
}