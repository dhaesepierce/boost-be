const {MongoClient} = require('mongodb');
const RegExp = require('regexp')
const uri = 'mongodb+srv://dhaesepierce:YqaDaJ32XJC2KDnA@cluster0.ctdj2b5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

async function getClient(){
    const client = new MongoClient(uri);
    await client.connect();
    return client
    
}

async function postData(data){
    let client = await getClient()
    const db = client.db('boosts')
    const collection = db.collection('ChainData')
    await collection.insertMany(data)
    client.close()
    return
}
async function getData(name){
    let client = await getClient()
    const db = client.db('boosts')
    const collection = db.collection('ChainData')
    let query = {}
    query.name = {$regex: name,$options: 'i'}
    const data = await collection.find(query).toArray();
    client.close()
    return data
}
module.exports = {
    postData: postData,
    getData: getData
}