// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    
    const data = await cloud.database().collection('agriculture').doc(event._id).get()
    return{
        data:data.data,
        code:200
    }
}