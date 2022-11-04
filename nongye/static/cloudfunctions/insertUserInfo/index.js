// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const user = await cloud.database().collection('user').where({
        openid:openid
    }).get()
    //数据库已有用户信息
    if(user.data.length > 0){
        return{
            code:500,
            msg:'数据库已存在用户记录'
        }
    }
    const username = event.username
    const headimage = event.headimage
    const introduction = event.introduction
    const phone = event.phone
    const address = event.address
    if (typeof username === 'undefined' || username == null || username === ''){
        username == ""
    }
    if (typeof headimage === 'undefined' || headimage == null || headimage === ''){
        headimage == ""
    }
    if (typeof introduction === 'undefined' || introduction == null || introduction === ''){
        introduction == ""
    }
    if (typeof phone === 'undefined' || phone == null || phone === ''){
        phone == ""
    }
    if (typeof address === 'undefined' || address == null || address ===''){
        address == ""
    }
   const result =   cloud.database().collection('user').add({
        data:{
            openid:openid,
            username: username,
            headimage:headimage,
            introduction:introduction,
            phone:phone,
            address:address
        }
    })
    return result
}