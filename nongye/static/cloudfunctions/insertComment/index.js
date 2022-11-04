// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID

    //时间
    const date = new Date(new Date().getTime()+(parseInt(new Date().getTimezoneOffset()/60) + 8)*3600*1000)
    let hour = date.getHours() < 10 ? '0'+date.getHours() : date.getHours()
    let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    const date_str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + hour + ":" + minute;
    //插入评论记录
    cloud.database().collection('comment').add({
        data:{
            openid:openid,
            createtime:date_str,
            content:event.content,
            community_id:event.community_id
        }
    })
    return{
        code:200,
        msg:"评论成功!"
    }
}