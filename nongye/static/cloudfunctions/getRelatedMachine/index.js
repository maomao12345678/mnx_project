// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
     const db = cloud.database()
    const relatedMachines = db.collection('machine').where({
        type1:event.type1,
        type2:event.type2
    }).get()
    return relatedMachines;
}