// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//根据id获取生产记录信息
exports.main = async (event, context) => {
    const data_type = event.data_type
    const id = event._id
    const db = cloud.database()
    if(data_type === 1){
        const data = db.collection('production_feed').doc(id).get()
        return data
    }

    if(data_type === 2){
        const data = db.collection('production_fertilizer').doc(id).get()
        return data
    }

    if(data_type === 3){
        const data = db.collection('production_medicine').doc(id).get()
        return data
    }

}