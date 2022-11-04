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
    }
    //修改社区记录表点赞数 f6e08a646274feff0180f3c6216ddb48
    const community = await cloud.database().collection('community').doc(event.community_id).get()
    const num = community.data.number + 1
    await cloud.database().collection('community').where({
        _id:event.community_id
    }).update({
        data:{
            number:num
        }
    })
    
    //将点赞记录插入点赞表
    cloud.database().collection('like').add({
        data:{
            openid:openid,
            community_id:event.community_id
        }
    })

    return{
        code:200,
        msg:'点赞成功!'
    }
}