const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口文件
const tencentcloud = require("tencentcloud-sdk-nodejs")

const TtsClient = tencentcloud.tts.v20190823.Client

const clientConfig = {
  credential: {
    secretId: "AKIDa9XiqnaARWPURBi5QZXL2b4RluMaZI3d",
    secretKey: "RdcMsAD1by6zf9SYR8cqqcBUXM1SebJo",
  },
  region: "ap-guangzhou",
  profile: {
    httpProfile: {
      endpoint: "tts.tencentcloudapi.com",
    },
  },
};


// 云函数入口函数
exports.main = async (event, context) => {
	const client = new TtsClient(clientConfig)
	const params = {
		Text: event.text,
		SessionId: String(new Date().getTime()),
		VoiceType: 1004
	}
	return new Promise(resolve => {
		client.TextToVoice(params).then(
			(data) => {
				console.log(data);
				resolve(data)
			},
			(err) => {
				console.error("error", err);
				// resolve(err)
			}
		)
	})
}