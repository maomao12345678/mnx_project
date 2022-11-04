// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    cloud.database(); //初始化数据库
    const db = cloud.database()
    const key = event.key
    const _ = db.command 
    let default_limit = 10
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = event.page * default_limit
    }
    const result = await db.collection("machine").where(_.or([{
        name: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      },
      {
        intro: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();
     return result
}