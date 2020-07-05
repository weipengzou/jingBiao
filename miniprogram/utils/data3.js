const team = [{
		id: 1,
		src: 'http://manager.kenput.cn/static/img/ps1.jpg',
		title: '舒予导师',
		content:"医学学士、MBA工商管理硕士上市公司人力资源总监、运营总监亲子导师，婚姻家庭两性关系导师，国家高级心理咨询师，NLP企业教练"
	},
	{
		id: 2,
		src: 'http://manager.kenput.cn/static/img/ps2.jpg',
		title: '兰政教授',
		content:'广西体育高等专科学校校园足球教育研究与培训中心主任,广西体育高等专科学校体育与教育副主任,教育部首批选派赴法国进行校园足球教练员留学人员'
	},
	{
		id: 3,
		src: 'http://manager.kenput.cn/static/img/ps2.jpg',
		title: '冯国雄导师',
		content:'国内外著名企业咨询管理师、培训导师、人本领导力导师、教练、竞彪商学院导师'
	},
	{
		id: 4,
		src: 'http://manager.kenput.cn/static/img/ps1.jpg',
		title: '杨燕华女士',
		content:'近15年小学、幼儿园教育经验、行业经验、竞彪科技创始人之一'
	}

]

function getTeamList() {
	let list = []
	for (let i = 0; i < team.length; i++) {
		let obj = {}
		obj.id = team[i].id
		obj.src = team[i].src
		obj.title = team[i].title
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
