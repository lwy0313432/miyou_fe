// 引入mockjs
const Mock = require('mockjs');
import { WEBAPI_ROOT } from '../config'

var Random = Mock.Random;

var tmpl = null;//模板数据
var intf = null;//接口地址


// 客户列表
var borrower_list = {
    "code": 0,
    "message": "成功",
    "data":{
        "borrower_list|10-20": [{
            'id|+1':1,
            'borrowerNo|1000-9999':2000,
            'borrowerName':Random.name(),
            'phoneNum':'18515288401',
            'borrowMoney':Random.float(10000, 99999, 2, 2),
            'borrowCycle':'1年2个月',
            'city':'上海',
            'accountStatus|0-1':0,
            'auditStatus|0-2':2,
            'createtime':Random.datetime()
        }]
    }
}
intf = '/borrower_list';
tmpl = borrower_list;

var data = Mock.mock(tmpl)
Mock.mock(WEBAPI_ROOT+intf, data);
