// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const db = cloud.database()

    //查找用户是否收藏
    const record = await db.collection('usercollect').where({
        user_id:openid,
        collect_id:event._id,
        type:event.type
    }).get()

    if(record.data.length > 0){
        return{
            isCollect:true,
            msg:"该用户已经收藏该记录!"
        }
    }else{
        return{
            isCollect:false,
            msg:"该用户未收藏该记录!"
        }
    }
}