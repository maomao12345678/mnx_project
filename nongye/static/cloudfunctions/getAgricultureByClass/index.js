// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 根据类别获取农业知识信息
//传入参数：type(number):类别 limit(number):记录数 page(number):页码
exports.main = async (event, context) => {
    let default_limit = 10
    let default_skip  = 0
    let default_type = 1

    if(event.limit !=null && event.limit!=""){
        defalt_limit = event.limit
    }
    if(event.page !=null && event.page != ""){
        default_skip = event.page * default_limit
    }
    if(event.type !=null && event.type != ""){
        default_type = event.type
    }
    const agricultureList =  cloud.database().collection('agriculture')
    .skip(default_skip).limit(default_limit).where({
        type1: default_type
    })
    .get()
    return agricultureList
}