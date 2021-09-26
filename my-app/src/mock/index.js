import Mock from 'mockjs'
import initialData from './initial-data.js'
Mock.mock('/api/list', 'get', (req) => {
    // const type = JSON.parse(req.body).type
    return initialData

})
export default Mock