// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 添加用户收藏
/*
传入参数：
machine_id(string) 机械信息id
*/
exports.main = async (event, context) => {
   const openid =  cloud.getWXContext().OPENID //用户唯一标识
   const type = event.type
       //时间
    const date = new Date(new Date().getTime()+(parseInt(new Date().getTimezoneOffset()/60) + 8)*3600*1000)
    const date_str = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate() + " " + date.getHours() + ":" +date.getMinutes();
    if(type == null || type == "" || typeof(type) == 'undefined'){
        return{
            code:500,
            msg:'请传入type'
        }
    }
	//查找用户是否收藏
	    const record = await cloud.database().collection('usercollect').where({
	        user_id:openid,
	        collect_id:event._id,
	        type:event.type
	    }).get()
	
	    if(record.data.length > 0){
	        return{
	            isCollect:true,
	            msg:"该用户已经收藏该记录!"
	        }
	    }
    if(type === 1){ //机械设备
        const result = await cloud.database().collection('usercollect')
        .add({
            data:{
                collect_id: event._id,
                user_id: openid,
                createtime:date_str,
                type:1
            }
        })
    }

    if(type === 2){ //农业知识
        const result = await cloud.database().collection('usercollect')
        .add({
            data:{
                collect_id: event._id,
                user_id: openid,
                createtime:date_str,
                type:2
            }
        })
    }

    if(type === 3){ //农资百科
        const result = await cloud.database().collection('usercollect')
        .add({
            data:{
                collect_id: event._id,
                user_id: openid,
                createtime:date_str,
                type:3
            }
        })
    }

    if(type === 4){ //社区记录
        const result = await cloud.database().collection('usercollect')
        .add({
            data:{
                collect_id: event._id,
                user_id: openid,
                createtime:date_str,
                type:4
            }
        })
    }
    return{
        code:200,
        msg:'收藏成功'
    }
  
}