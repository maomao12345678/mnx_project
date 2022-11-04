// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const wxContext = cloud.getWXContext()
    const openid = wxContext.OPENID
    const username = event.username
    const headimage = event.headimage
    const introduction = event.introduction
    const phone = event.phone
    const address = event.address
    if (typeof username != 'undefined' || username != null || username != ''){
        cloud.database().collection('user').where({
            openid:openid
        }).update({
            data:{
                username:username
            }
        })
    }

    if (typeof headimage != 'undefined' || headimage != null || headimage != ''){
        cloud.database().collection('user').where({
            openid:openid
        }).update({
            data:{
                headimage:headimage
            }
        })
    }

    if (typeof introduction != 'undefined' || introduction != null || introduction != ''){
        cloud.database().collection('user').where({
            openid:openid
        }).update({
            data:{
                introduction:introduction
            }
        })
    }

    if (typeof phone != 'undefined' || phone != null || phone != ''){
        cloud.database().collection('user').where({
            openid:openid
        }).update({
            data:{
                phone:phone
            }
        })
    }

    if (typeof address != 'undefined' || address != null || address != ''){
        cloud.database().collection('user').where({
            openid:openid
        }).update({
            data:{
                address:address
            }
        })
    }
    return{
        code:200,
        msg:"更新成功!"
    }
}