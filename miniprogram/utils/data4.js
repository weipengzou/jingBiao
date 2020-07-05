const team = [{
		id: 1,
		src: 'http://manager.kenput.cn/static/img/news/n1.jpg',
		title: '热烈祝贺竞彪幼足项目推介会圆满召开',
		sub:'竞彪幼足项目推介会在第二十届广东国际体育用品博览会、粤港澳大湾区体育博览会4号馆主舞台盛大举行……',
		time:'2019-09-19',
		content:'9月19日下午，广州竞彪科技有限责任公司竞彪幼足项目推介会在第二十届广东国际体育用品博览会、粤港澳大湾区体育博览会4号馆主舞台盛大举行，来自全国各地的投资人莅临竞彪展厅并出席了此次推介会。'
	},
	{
		id: 2,
		src: 'http://manager.kenput.cn/static/img/news/n2.jpg',
		title: '竞彪科技亮相2019广东体育博览会',
		sub:'我们也将会通过足球运动来激发每个孩子的品质……',
		time:'2019-09-19',
		content:'我们以运用的是源于德国的BRAVO足球启蒙系统，对应的是勇气（brave）、负责（responsible）、活力（aliveness）、视野（vision）、乐观（optimistic），我们也将会通过足球运动来激发每个孩子的品质。我们将以游戏引入教学，回归快乐的幼儿足球活动，同时解放孩子的天性，让孩子在玩的过程中学习足球知识和技能。'
	},
	{
		id: 3,
		src: 'http://manager.kenput.cn/static/img/news/n3.jpg',
		title: '足球嘉年华，亲子共欢乐',
		sub:'为深入贯彻落实关于振兴中国足球“从娃娃抓起、从基层抓起、从基础抓起……',
		time:'2019-09-19',
		content:'为深入贯彻落实关于振兴中国足球“从娃娃抓起、从基层抓起、从基础抓起”的重要指示精神，扎实推进校园足球“八大体系”建设，下移普及重心，加快推进校园足球普及，夯实校园足球发展根基，教育部于2019年3月印发了《关于开展幼儿足球试点工作的通知》，启动了足球特色幼儿园遴选创建工作。在有关单位自主申报、各级教育行政部门审核推荐的基础上，教育部对各地推荐的足球特色幼儿园进行了综合评定。一共认定了贵港市中山幼儿园等3570所幼儿园为全国足球特色幼儿园。中山幼儿园作为竞彪幼儿足球的合作伙伴之一，以足球为主题开展“足球嘉年华”活动，于2019年11月23日上午8:30热力开动！'
	}
]

function getTeamList() {
	let list = []
	for (let i = 0; i < team.length; i++) {
		let obj = {}
		obj.id = team[i].id
		obj.src = team[i].src
		obj.title = team[i].title
		obj.sub = team[i].sub
		obj.time = team[i].time
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
