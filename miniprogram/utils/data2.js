const team = [{
		id: 1,
		src: 'http://manager.kenput.cn/static/img/le/1.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/1.jpg',
		title2:'园区展示',
		title: '认真练习',
		name: 'Andy1',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 2,
		src: 'http://manager.kenput.cn/static/img/le/2.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/2.jpg',
		title2:'园区展示',
		title: '教练指导学员',
		name: 'Jacky',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 3,
		src: 'http://manager.kenput.cn/static/img/le/3.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/3.jpg',
		title2:'园区展示',
		title: '学员竞技',
		name: 'Leon',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 4,
		src: 'http://manager.kenput.cn/static/img/le/4.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/4.jpg',
		title2:'园区展示',
		title: '认真上课',
		name: 'Lilei',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 5,
		src: 'http://manager.kenput.cn/static/img/le/5.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/5.jpg',
		title2:'园区展示',
		title: '刻苦练习',
		name: 'HanMeimei',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 6,
		src: 'http://manager.kenput.cn/static/img/le/6.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/6.jpg',
		title2:'园区展示',
		title: '认真听讲',
		name: 'Lucy',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 7,
		src: 'http://manager.kenput.cn/static/img/le/7.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/7.jpg',
		title2:'园区展示',
		title: '刻苦练习',
		name: 'Lili',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	},
	{
		id: 8,
		src: 'http://manager.kenput.cn/static/img/le/8.jpg',
		src2: 'http://manager.kenput.cn/static/img/ye/8.jpg',
		title2:'园区展示',
		title: '合照',
		name: 'Tom',
		age:4,
		school:'第一幼儿园',
		content:'喜欢上幼儿园，喜欢运动'
	}
]

function getTeamList() {
	let list = []
	for (let i = 0; i < team.length; i++) {
		let obj = {}
		obj.id = team[i].id
		obj.src = team[i].src
		obj.title = team[i].title
		obj.src2 = team[i].src2
		obj.title2 = team[i].title2
		obj.name = team[i].name
		obj.age = team[i].age
		obj.school = team[i].school
		obj.content = team[i].content
		list.push(obj)
	}
	return list
}

function getTeamDetail(e) {
	let msg = {
		code: '404',
		team: {}
	}
	for (let i = 0; i < team.length; i++) {
		if (e == team[i].id) {
			msg.code = '200'
			msg.team = team[i]
			break
		}
	}
	return msg
}

module.exports = {
	getTeamList,
	getTeamDetail
}
