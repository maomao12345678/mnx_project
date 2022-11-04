// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 取消收藏
//传入参数：machine_id
exports.main = async (event, context) => {
    const openid =  cloud.getWXContext().OPENID //用户唯一标识
    const result =  await cloud.database().collection('usercollect').where({
        user_id: openid,
        collect_id: event._id,
        type:event.type
    }).remove()
    
    if(result.stats.removed === 1){
        return {
            code:200,
            msg: "取消收藏成功!"
        }
    }else{
        return {
            code:500,
            msg: "取消收藏失败!"
        }
    }
}