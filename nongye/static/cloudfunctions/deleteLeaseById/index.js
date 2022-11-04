// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const result = await cloud.database().collection('lease').where({
        user_id:openid,
        _id:event.lease_id
    }).remove()
    if(result.stats.removed > 0){
        return{
            code:200,
            msg:'删除成功!'
        }
    }else{
        return{
            code:500,
            msg:'删除失败!'
        }
    }
}