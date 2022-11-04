// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 根据id获取机械信息
// 传入参数：id(string)
exports.main = async (event, context) => {
    const machineList =  cloud.database().collection('machine')
    .where({
        _id: event.id
    })
    .get()
    return machineList
}