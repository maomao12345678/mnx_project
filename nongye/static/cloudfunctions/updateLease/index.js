// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    if(event.content == null && event.machine_type==null &&event.images==null && event.price == null && event.address==null){
        return{
            update:0
        }
    }
    const wxContext = cloud.getWXContext()
    const result =  await cloud.database().collection('lease').where({
        _id:event.id
    }).update({
        data:{
            content:event.content,
            images:event.images,
            machine_type:event.machine_type,
            price:event.price,
            address:event.address
        }
    })
    return result
}