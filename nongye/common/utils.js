// 此文件存放一些公共工具函数

// 日期排序
export function dateSort(arr) {
	return arr.sort((a,b) => {
		let ay = a.time.split("-")[0]
		let am = a.time.split("-")[1]
		let by = b.time.split("-")[0]
		let bm = b.time.split("-")[1]
		// 年份相同, 月份降序排序
		if (!(ay - by)) {
			return bm - am
		}
		return by - ay
	})
}

// 将句子分句，输出句子数组
export function splitSentense(content) {
	let splitInfo = content.split(/[！。]+/)
	splitInfo = splitInfo.map(data => {
		return data + '。'
	})
	delete splitInfo.pop()
	return splitInfo
} 