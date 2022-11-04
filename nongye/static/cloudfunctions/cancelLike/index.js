// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = "ojWaB5KA_Zwu7RWAsB8ENXiTKnr8"
    const db = cloud.database()
    //修改点赞数-1
    const _ = db.command
    await db.collection('community').doc(event.community_id).update({
    data: {
        number: _.inc(-1)
    }
    })
    //删除点赞记录
    const result = await cloud.database().collection('like').where({
        openid:openid,
        community_id:event.community_id
    }).remove()
    if(result.stats.removed > 0){
        return{
            code:200,
            msg:'取消点赞成功!'
        }
    }else{
        //取消点赞失败，数据复原
        await db.collection('community').doc(event.community_id).update({
            data: {
                number: _.inc(1)
            }
            })
        return{
            code:200,
            msg:'取消点赞失败!'
        }
    }
}