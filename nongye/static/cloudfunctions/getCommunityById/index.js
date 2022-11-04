// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    if(event._id == null && event._id == ""){
        return{
            code:500,
            msg:"未传入社区记录id"
        }
    }
    const resultdata = []
    const community = await cloud.database().collection('community').doc(event._id).get()
    const user = await cloud.database().collection('user').where({
        openid:community.data.openid
    }).get()

    community.data.headimage = user.data[0].headimage
    community.data.username = user.data[0].username
    resultdata.unshift(community.data)
    return{
        code:200,
        data:resultdata
    }
}