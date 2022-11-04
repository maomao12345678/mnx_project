// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    const content = event.content
    const title = event.title
    const images = event.images
    const id = event._id
    const isvisible = event.isvisible
       const result =  await cloud.database().collection('community').where({
            _id:id
        }).update({
            data:{
                content:content,
                title:title,
                images:images,
                isvisible:isvisible
            }
        })
        return result
    }