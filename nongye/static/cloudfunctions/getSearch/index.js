// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    cloud.database(); //初始化数据库
    const db = cloud.database()
    const key = event.key
    const _ = db.command 
    let default_limit = 5
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = event.page * default_limit
    }
    //农业
    const agriculture = await db.collection("agriculture").where(_.or([{
        title: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();
    //机械
    const machine = await db.collection("machine").where(_.or([{
        name: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();

    const feed = await db.collection("production_feed").where(_.or([
      {
        title: db.RegExp({
            regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();
    const fertilizer = await db.collection("production_fertilizer").where(_.or([
      {
        title: db.RegExp({
            regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();
    const medicine = await db.collection("production_medicine").where(_.or([
      {
        title: db.RegExp({
            regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();

    //社区
    const community = await db.collection("community").where(_.or([{
        title: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();
    //租赁
    const lease = await db.collection("lease").where(_.or([{
        content: db.RegExp({
          regexp: '.*' + key,
          options: 'i',
        })
      }
    ])).skip(default_skip).limit(default_limit)
    .get();
     return {
        machine:machine.data,
        agriculture:agriculture.data,
        feed:feed.data,
        fertilizer:fertilizer.data,
        medicine:medicine.data,
        community:community.data,
        lease:lease.data
     }
}