import {MongoClient} from 'mongodb'
export const MONGO_URL =process.env.MONGO_URL ||'mongodb://localhost:27017/insuranceadmin'
export const mongo = MongoClient.connect(MONGO_URL)
