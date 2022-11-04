// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
//获取生产数据
exports.main = async (event, context) => {
    let default_limit = 10
    let default_skip  = 0
    const data_type = event.data_type
    const db = cloud.database()
    if(event.limit !=null && event.limit!=""){
        default_limit = event.limit
    }
    if(event.page !=null && event.page != ""){
        default_skip = event.page * default_limit
    }

    if(data_type === 1){ //饲料数据
       const data =  db.collection('production_feed')
        .skip(default_skip).limit(default_limit)
        .get()
        return data;
    }

    if(data_type === 2){ //肥料数据
        const data =  db.collection('production_fertilizer')
         .skip(default_skip).limit(default_limit)
         .get()
         return data;
     }

     if(data_type === 3){ //农药数据
        const data =  db.collection('production_medicine')
         .skip(default_skip).limit(default_limit)
         .get()
         return data;
     }
}