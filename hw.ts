
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';
import fs from 'fs'
import { MongoClient } from 'mongodb'
import dotenv from 'dotenv'
import path from 'path'

const envPath = path.resolve(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
    dotenv.config({ path: envPath });
};

(async () => {

    const client = new MongoClient("mongodb://practicedb10:vQ2jo7n4cQireAHeGF254PQyf@udb.qepal.com:8302/?authSource=admin");

    try {
        await client.connect();
        console.log('Connected to the MongoDB server');
        const db = client.db('practicedb10');

        let s = await db.collection("students")
        // let r = await s.find({transport:new RegExp("bus","i")}).toArray()
        // let r = await s.findOne({name:new RegExp("Mary")})
        // let r = await s.find({name:new RegExp("mary")}).toArray()
        // let r = await s.find({name:new RegExp("mary","i")}).toArray()
        // let r = await s.find({name:/mary/i}).toArray()

        // let queryQuiz = await s.find({
        //     $or: [
        //         { exam: { $elemMatch: { name: 'math', score: { $gt: 90 } } } },
        //         { exam: { $elemMatch: { name: 'math', score: { $gt: 90 } } } },
        //     ]
        // }).sort({_id:1}).limit(3).project({name:1}).toArray()



        // let queryQuiz2 = await s.find({
        //     violations: {$size:0}
        // }).sort({height:-1}).project({name:1, height:1, _id:0}).toArray()


        // let test = await s.updateOne({name:"Velasquez Bernard", status:"deactive"},{
        //     $unset:{
        //         "contact.gmail":true
        //     },
        //     $set:{
        //         email:"velber@gmail.com"
        //     }        
        // })
        
        // console.log(test)

                // homework

        let hw1 = await s.find({$and:[
            {exam:{$elemMatch:{score:{$gt:70, $lt:90}}}},
            {$or:[
                {gender:"male"},
                {height:{$lt:160}}
            ]}
        ]}).toArray()

        let hw2 = await s.find({
            exam:{$elemMatch:{score:{$ngt:90}}}
        }).sort({'name':1}).project({name:1, exam:1}).toArray()

        let hw3 = await s.find({
            $or:[
                {height:{$lt:165}, exam:{$elemMatch:{score:{$gt:70}, name:'physics'}}},
                {height:{$gt:165}, exam:{$elemMatch:{score:{$lt:70}, name:'math'}}}

            ]
        }).sort({'height':-1}).project({name:1, height:1, exam:1}).toArray()

        let hw4 = await s.countDocuments({
            $and:[
                {firstchild:"no"},
                {violations:{$nor:[{violations:{$size:1}}, {violations:{$size:2}}]}}
            ]
        })

        let hw5 = await s.find({
            $and:[
                {parentedu:"associate's degree"},
                {pmartialstatus:"married"},
                {$nor:[{violations:{$size:1}}, {violations:{$size:2}}, {violations:{$size:3}}, {violations:{$size:4}}]}
            ]
        }).sort({name:1}).limit(3).toArray()

<<<<<<< HEAD
=======
        console.log(hw5)
>>>>>>> 2c04fb4b33996555c08d774b1754db3d82d2df4d

        let hw6 = await s.find({
            sport:{$ne:"never"},
            gender:"female"
        }).toArray()

        let hw7 = await s.find({
            height:{
                $mod:[10,0]
            },
            pmartialstatus:"married"
        }).project({name:1, height:1, pmartialstatus:1}).toArray()

        let hw8 = await s.find({
            exam:{$elemMatch:{name:'math', score:{$gt:55, $lt:85}}}
        }).sort({'name':1}).project({name:1, exam:{score:1, name:1}}).limit(2).toArray();

        let hw8_stringify = JSON.stringify(hw8)

        console.log(hw8_stringify)


        let hw9 = await s.find({
            name: new RegExp('Anthony')
        }).toArray()

        let hw10 = await s.find({
            name: new RegExp('an'),
            height: {$mod:[5,0]},
            sport: {$ne:"never"},
            exam:{$elemMatch:{score:{$gt:75}, name:'math'}},
            violations:{$size:{$lt:2}}
        }).project({name:1, height:1, sport:1, exam:{score:1}, violations:1}).toArray();

        let hw10_stringify = JSON.stringify(hw10)

        console.log(hw10_stringify)


        process.exit()

    } catch {
        console.log("Failed to connect to Mongo Server.")
    }
})()



