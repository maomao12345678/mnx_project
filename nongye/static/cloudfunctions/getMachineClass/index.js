// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取知识设备页面机械类别信息
exports.main = async (event, context) => {
    const machineClass = cloud.database().collection('machineclass').get()
    return machineClass
}