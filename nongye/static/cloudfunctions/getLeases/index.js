// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database()
    let default_limit = 10
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = event.page * default_limit
    }
    const result = await db.collection('lease')
    .orderBy('createtime','desc')
    .skip(default_skip).limit(default_limit)
    .get()
    result.data = result.data.reverse()
    //遍历社区记录，增加用户头像和用户名信息
    for(let i = 0; i< result.data.length;i++){
        let openid = result.data[i].user_id
        let user = await cloud.database().collection('user').where({
            openid:openid
        }).get()
        
        result.data[i].headimage = user.data[0].headimage
        result.data[i].username = user.data[0].username
    }
    return result;

}