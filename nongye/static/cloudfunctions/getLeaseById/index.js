// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const db = cloud.database()
    //浏览量+1
    const _ = db.command
        db.collection('lease').doc(event.lease_id).update({
        data: {
            browser_number: _.inc(1)
        }
        })  
    //获取数据
    const resultdata = []
    const lease = await cloud.database().collection('lease').doc(event.lease_id).get()
    const user = await cloud.database().collection('user').where({
        openid:lease.data.user_id
    }).get()

    lease.data.headimage = user.data[0].headimage
    lease.data.username = user.data[0].username
    resultdata.unshift(lease.data)
    return{
        code:200,
        data:resultdata
    }
}