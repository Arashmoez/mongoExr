
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



