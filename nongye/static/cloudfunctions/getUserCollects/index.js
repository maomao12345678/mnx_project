// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 获取当前用户收藏列表
exports.main = async (event, context) => {
	const db = cloud.database()
	const openid = cloud.getWXContext().OPENID //用户唯一标识
	let default_limit = 9
    let default_skip  = 0
    if(event.limit!=null && event.limit !=""){
        default_limit = event.limit
    }
    if(event.page!=null && event.page !=""){
        default_skip = event.page * default_limit
    }
	const type = event.type
	const collectList = []
	if(type === 1){ //查询机械设备收藏记录
	 const result = await db.collection('usercollect').where({
			user_id:openid,
			type:1
		}).orderBy('createtime','desc')
		.skip(default_skip).limit(default_limit)
		.get()

		for(let i = 0;i<result.data.length;i++){
			let collect_id = result.data[i].collect_id
			let record = await db.collection('machine').where({
				_id:collect_id
			}).get()
			collectList.unshift(record.data[0])
		}

	}
	if(type === 2){ //查询农业知识收藏记录
		const result = await db.collection('usercollect').where({
			   user_id:openid,
			   type:2
		   }).orderBy('createtime','desc')
		   .skip(default_skip).limit(default_limit)
		   .get()
   
		   for(let i = 0;i<result.data.length;i++){
			   let collect_id = result.data[i].collect_id
			   let record = await db.collection('agriculture').where({
				   _id:collect_id
			   }).get()
			   collectList.unshift(record.data[0])
		   }
   
	   }
	   if(type === 3){ //查询农资百科收藏记录
		default_limit = default_limit / 3
		default_skip = default_skip / 3
		const result = await db.collection('usercollect').where({
			user_id:openid,
			type:3
		}).orderBy('createtime','desc')
		.skip(default_skip).limit(default_limit)
		.get()

		for(let i = 0;i<result.data.length;i++){
			let collect_id = result.data[i].collect_id
			let record = await db.collection('production_feed').where({
				_id:collect_id
			}).get()
			if(record.data.length>0){
				record.data[0].production_type = 1
				collectList.unshift(record.data[0])
			}

			record = await db.collection('production_medicine').where({
				_id:collect_id
			}).get()
			if(record.data.length>0){
				record.data[0].production_type = 3
				collectList.unshift(record.data[0])
			}
			record = await db.collection('production_fertilizer').where({
				_id:collect_id
			}).get()
			if(record.data.length>0){
				record.data[0].production_type = 2
				collectList.unshift(record.data[0])
			}
		}
	   }
	   if(type === 4){ //查询社区记录收藏记录
		const result = await db.collection('usercollect').where({
			   user_id:openid,
			   type:4
		   }).orderBy('createtime','desc')
		   .get()
   
		   for(let i = 0;i<result.data.length;i++){
			   let collect_id = result.data[i].collect_id
			   let record = await db.collection('community').where({
				   _id:collect_id
			   }).get()
			   let userid = record.data[0].openid
			   let user = await cloud.database().collection('user').where({
				openid:userid
			}).get()
			record.data[0].headimage = user.data[0].headimage
			record.data[0].username = user.data[0].username
			collectList.unshift(record.data[0])
		   }
   
	   }
    return {
		data:collectList
	}
}