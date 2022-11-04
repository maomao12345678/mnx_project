// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const commentList = []
    let default_limit = 10
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = (event.page-1) * default_limit
    }
    //查询总记录数
    const count = await  cloud.database().collection('comment')
    .where({
        community_id: event.community_id
    }).count()
    const maxPage = parseInt(count.total%default_limit)==0 ? parseInt(count.total/default_limit):parseInt(count.total/default_limit)+1
    const comments = await  cloud.database().collection('comment')
    .where({
        community_id: event.community_id
    })
    .orderBy('createtime','desc')
    .skip(default_skip).limit(default_limit)
    .get()
    comments.data = comments.data.reverse()
    //遍历社区记录，增加用户头像和用户名信息
    for(let i = 0; i< comments.data.length;i++){
        let openid = comments.data[i].openid
        let comment = comments.data[i]
        let user = await cloud.database().collection('user').where({
            openid:openid
        }).get()
        
        comment.headimage = user.data[0].headimage
        comment.username = user.data[0].username
        commentList.unshift(comment)
    }
    return{
        data:commentList,
        maxPage:maxPage,
        code:200
    }
}