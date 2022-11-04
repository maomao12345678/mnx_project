// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const leasesList = []
    let default_limit = 10
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = event.page * default_limit
    }
    
    const leases = await  cloud.database().collection('lease')
    .where({     
        user_id: openid
    })
    .skip(default_skip).limit(default_limit)
    .orderBy('createtime','asc')
    .get()
    //遍历社区记录，增加用户头像和用户名信息
    for(let i = 0; i< leases.data.length;i++){
        let openid = leases.data[i].user_id
        let lease = leases.data[i]
        let user = await cloud.database().collection('user').where({
            openid:openid
        }).get()
        
        lease.headimage = user.data[0].headimage
        lease.username = user.data[0].username
        leasesList.unshift(lease)
    }
    return{
        data:leasesList,
        code:200
    }
}