// 清洗接口数据，转换为页面所需要的数据

// 机器列表转换
export function machineListsFilter(list) {
	return list.map(data => {
		return {
			_id: data._id,
			title: data.name,
			image: data.image,
			intro: data.intro,
			type: data.typ1_name,
			isCollect: false
		}
	})
}

// 搜索页- 机器列表转换
export function searchMachineFilter(list) {
	return list.map(data => {
		return {
			_id: data._id,
			title: data.name,
			image: data.image,
			content: data.intro,
			type: data.typ1_name,
			isCollect: false
		}
	})
}
// 搜索页- 农业知识列表转换
export function searchAgriculturalFilter(list) {
	return list.map(data => {
		return {
			title: data.title,
			image: data.image,
			video: data.vedio,
			time: data.createtime,
			content: data.content,
			isVideo: data.isvedio,
			type: data.type1_name,
			setype: data.type2_name,
			_id: data._id
		}
	})
}
// 搜索页 - 租赁列表转换
export function searchLeaseFilter(list) {
	return list.map(data => {
		return {
			image: data.images[0],
			imageArr: data.images,
			type: data.machine_type,
			money: data.price,
			userImage: data.headimage,
			userName: data.username,
			title: data.content,
			location: data.address,
			time: data.createtime,
			_id: data._id
		}
	})
}
// 机器类别列表转换
export function machineModulesFilter(list) {
	return list.map(data => {
		return {
			title: data.classname,
			image: data.image,
			type: data.class,
			_id: data._id
		}
	})
}
// 农业知识推荐转换
export function agriculturalRecommendFilter(list) {
	return list.map(data => {
		return {
			title: data.title,
			image: data.image,
			video: data.vedio,
			time: data.createtime,
			content: data.content,
			isVideo: data.isvedio,
			type: data.type1_name,
			setype: data.type2_name,
			_id: data._id
		}
	})
}
// 农业知识类别列表转换
export function agriculturalModulesFilter(list) {
	return list.map(data => {
		return {
			title: data.classname,
			image: data.image,
			type: data.class,
			_id: data._id
		}
	})
}

// 农业知识列表转换
export function agriculturalListFilter(list) {
	return list.map(data => {
		return {
			title: data.title,
			image: data.image,
			video: data.vedio,
			time: data.createtime,
			content: data.content,
			isVideo: data.isvedio,
			type: data.type1_name,
			setype: data.type2_name,
			_id: data._id
		}
	})
}

// 租赁列表转换
export function leaseListFilter(list) {
	return list.map(data => {
		return {
			image: data.images[0],
			imageArr: data.images,
			type: data.machine_type,
			money: data.price,
			userImage: data.headimage,
			userName: data.username,
			title: data.content,
			location: data.address,
			time: data.createtime,
			_id: data._id
		}
	})
}
// 租赁评论转换
export function leaseCommentFilter(list) {
	return list.map(data => {
		return {
			_id: data._id,
			username: data.username,
			image: data.headimage,
			time: data.createtime,
			message: data.content
		}
	})
}
// 我的部分转换
export function myFilter(list) {
	return list.map(data => {
		return {
			username: data.username,
			avatarUrl: data.headimage,
			describe: data.introduction,
			phoneNumber: data.phone,
			address: data.address,
			_id: data._id
		}
	})
}

// 社区博客展示部分转换
export function communityBlogsFilter(list) {
	return list.map(data => {
		if(data.isvisible==false){
			return 
		}
		return {
			blogPhoto: data.images,
			blogTitle: data.title,
			blogContent: data.content,
			blogCreateTime: data.createtime,
			blogId: data._id,
			blogUserName: data.username,
			blogUserPhoto: data.headimage,
		}
	})
}

//我的发布
export function myBlogsFilter(list) {
	return list.map(data => {
		// if(data.isvisible==false){
		// 	return 
		// }
		// if(data.username!='maomao'){
		// 	return 
		// }
		return {
			blogPhoto: data.images,
			blogTitle: data.title,
			blogContent: data.content,
			blogCreateTime: data.createtime,
			blogId: data._id,
			blogUserName: data.username,
			blogUserPhoto: data.headimage,
		}
	})
}

//社区博客评论
export function communityBlogFilter(list) {
	return list.map(data => {
		return {
			commentUserPhoto: data.headimage,
			commentUserName: data.username,
			commentCreateTime: data.createtime,
			commentContent: data.content,
		}
	})
}

//饲料转换
export function feedFilter(list) {
	return list.map(data => {
		return {
			feedName: data.title,
			feedContent: data.content,
			feedImage: data.image,
			feedId: data._id,
		}
	})
}

//肥料转换
export function fertilizerFilter(list) {
	return list.map(data => {
		return {
			fertilizerName: data.title,
			fertilizerContent: data.content,
			fertilizerImage: data.image,
			fertilizerId: data._id,
			fertilizerType: data.type1,
			fertilizerTypeName: data.type1_name,
		}
	})
}

//农药转换
export function medicineFilter(list) {
	return list.map(data => {
		return {
			medicineName: data.title,
			medicineContent: data.content,
			medicineImage: data.image,
			medicineId: data._id,
		}
	})
}

//农资收藏转换
export function nongziCollectFilter(list) {
	return list.map(data => {
		return {
			nongziCollectName: data.title,
			nongziCollectContent: data.content,
			nongziCollectImage: data.image,
			nongziCollectId: data._id,
			nongziCollectType: data.production_type,
		}
	})
}


