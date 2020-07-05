const team = [
		{id:1,src:'http://manager.kenput.cn/static/img/te/1.jpg',title:'竞彪团队'},
		{id:2,src:'http://manager.kenput.cn/static/img/te/2.jpg',title:'竞彪团队'},
		{id:3,src:'http://manager.kenput.cn/static/img/te/3.jpg',title:'竞彪团队'},
		{id:4,src:'http://manager.kenput.cn/static/img/te/4.jpg',title:'竞彪团队'},
		{id:5,src:'http://manager.kenput.cn/static/img/te/5.jpg',title:'竞彪团队'},
		{id:6,src:'http://manager.kenput.cn/static/img/te/6.jpg',title:'竞彪团队'},
		{id:7,src:'http://manager.kenput.cn/static/img/te/7.jpg',title:'竞彪团队'},
		{id:8,src:'http://manager.kenput.cn/static/img/te/8.jpg',title:'竞彪团队'}
	]
	
function getTeamList(){
	let list = []
	for(let i = 0; i < team.length; i++){
		let obj = {}
		obj.id = team[i].id
		obj.src = team[i].src
		obj.title = team[i].title
		list.push(obj)
	}
	return list
}

function getTeamDetail(e){
	let msg = {
		code:'404',
		team:{}
	}
	for(let i = 0; i < team.length; i++){
		if(e == team[i].id){
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