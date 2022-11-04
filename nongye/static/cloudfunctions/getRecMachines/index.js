// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//获取机械数据，limit表示每次查询记录条数，page表示页码
exports.main = async (event, context) => {
    let defalt_limit = 6
    let defalt_skip  = 0

    if(event.limit !=null && event.limit!=""){
        defalt_limit = event.limit
    }
    if(event.page !=null && event.page != ""){
        defalt_skip = event.page * defalt_limit
    }
    //推荐逻辑之后确定


    const machineList =  cloud.database().collection('machine')
    .skip(defalt_skip).limit(defalt_limit)
    .get()
    return machineList
}