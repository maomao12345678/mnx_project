// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const openid = event.openid
    const user =  cloud.database().collection('user').where({
        openid:openid
    }).get()
    return user
}