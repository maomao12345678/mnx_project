// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID

    //查找改用户是否点赞该记录
   const record = await cloud.database().collection('like').where({
        openid:openid,
        community_id:event.community_id
    }).get()

    if(record.data.length > 0){
        return{
            islike:true,
            msg:"该用户已经点赞该记录!"
        }
    }else{
        return{
            islike:false,
            msg:"该用户未点赞该记录!"
        }
    }
}