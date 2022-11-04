// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
    let skip = Math.floor((Math.random()*100)+1);
    let type1 = Math.floor((Math.random()*7)+1);
    const data = []
    const data1 = await cloud.database().collection('agriculture').where({
        type1: type1
    }).skip(skip).limit(2).get();
    for(let i = 0;i<data1.data.length;i++){
        data.unshift(data1.data[i])
    }
    let type2 = Math.floor((Math.random()*7)+1);
    const data2 = await cloud.database().collection('agriculture').where({
        type1: type2
    }).skip(skip).limit(2).get();
    for(let i = 0;i<data2.data.length;i++){
        data.unshift(data2.data[i])
    }

    let type3 = Math.floor((Math.random()*7)+1);
    const data3 = await cloud.database().collection('agriculture').where({
        type1: type3
    }).skip(skip).limit(2).get();
    for(let i = 0;i<data3.data.length;i++){
        data.unshift(data3.data[i])
    }
    return data

}