import crypto from 'crypto-js'

let region = 'oss-cn-guangzhou'
let	accessKeyId = 'LTAI5t6Sk1MmWpd3WDfeSycV'
let	accessKeySecret = '25s35myFs8DLGWSDO3ZXduAhGLq4Ri'
let	bucket = 'munongxing'

//1.计算签名
function computeSignature(accessKeySecret, canonicalString) {
  return crypto.enc.Base64.stringify(crypto.HmacSHA1(canonicalString, accessKeySecret));
}
//2.设置policy过期时间
const date = new Date()
date.setHours(date.getHours() + 1)
const policyText = {
    expiration: date.toISOString(), // 设置policy过期时间。
    conditions: [
        // 限制上传大小。
        ["content-length-range", 0, 1024 * 1024 * 1024],
    ],
};
var buffer = new Buffer.from(JSON.stringify(policyText));
const policy = buffer.toString('base64')// policy必须为base64的string
const signature = computeSignature(accessKeySecret, policy)  //签名
const host = `https://${bucket}.${region}.aliyuncs.com`

/**
 * 上传图片
 * @param {*String } filePath 文件路径
 * @param {*String } type 上传的文件类型：'user'|'lease'|interactive''
 */
export function uploadImage({ filePath, type }) {
	return new Promise(resolve => {
		// 文件名
		let date = new Date()
		let time = '' + date.getFullYear() + (date.getMonth() + 1) + date.getDate()
    let curtime = `${type}/` + time + '_' + date.getTime()
		let fileext = filePath.split('.')[1]
    let newfile = curtime + '.' + fileext
		wx.uploadFile({
			url: host, 
			filePath,
			name: 'file',
			formData:{
				 'key': newfile,  //设置文件上传至OSS后的文件路径。例如：test/myphoto.jpg
				 'policy': policy,
				 'OSSAccessKeyId': accessKeyId,
				 'signature': signature,
				 //'x-oss-security-token': accessKeySecret  //使用STS签名时必传
			},
			success:(res)=>{
					//上传成功
					if(res.statusCode === 204){
						// 访问上传后的图片：domain+savePath
						resolve(host + '/' + newfile)
					}
			}
		})
	})
}
