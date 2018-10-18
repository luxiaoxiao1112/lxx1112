
const Mock = require('mockjs')
const Random = Mock.Random
const produceData = function(opt){
    // console.log('opt',opt)
    let articles = []
    for(let i = 0; i <30; i++){
        let newArticleObject = {
            title:Random.csentence(5,30),
            thumbnail_pic_s:Random.dataImage('300*250','mock的图片'),
            id:Random.id().substring(0,2),
            date:Random.date(),
            email:Random.email(),
            name:Random.cname()
        }
        articles.push(newArticleObject)
    }
    return {
        data:articles
    }
}
Mock.mock('/user',/post|get/i,produceData)