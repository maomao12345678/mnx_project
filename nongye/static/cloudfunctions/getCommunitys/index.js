// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const communityList = []
    let default_limit = 10
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = event.page * default_limit
    }
    
    let communitys = await  cloud.database().collection('community')
    .where({
        isvisible: true
    })
    .orderBy('createtime','desc')
    .skip(default_skip).limit(default_limit)
    .get()
    communitys.data = communitys.data.reverse()
    //遍历社区记录，增加用户头像和用户名信息
    for(let i = 0; i< communitys.data.length;i++){
        let openid = communitys.data[i].openid
        let community = communitys.data[i]
        let user = await cloud.database().collection('user').where({
            openid:openid
        }).get()
        
        community.headimage = user.data[0].headimage
        community.username = user.data[0].username
        communityList.unshift(community)
    }
    return{
        data:communityList,
        code:200
    }
}