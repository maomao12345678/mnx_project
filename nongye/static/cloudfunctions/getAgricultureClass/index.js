// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取农业知识类别信息
exports.main = async (event, context) => {
    const agricultureclass = await cloud.database().collection('agricultureclass').get()
    return agricultureclass
}