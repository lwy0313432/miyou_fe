import Vue from 'vue'
import { WEBAPI_ROOT, WEBPAYAPI_ROOT } from './config'
export default {
    dologin(params){
        //登录
        const req = Vue.http.post(WEBAPI_ROOT + '/dologin',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    islogin(params){
        //是否登录
        const req = Vue.http.post(WEBAPI_ROOT + '/islogin',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    logout(){
        //退出
        const req = Vue.http.post(WEBAPI_ROOT + '/logout');
        return req.then((response) => Promise.resolve(response.data));
    },
    admin_my_menu() {
        //我的菜单·
        const req = Vue.http.post(WEBAPI_ROOT + '/admin_my_menu');
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_menu_list() {
        //菜单列表
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_menu_list');
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_menu_add(params){//添加菜单
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_menu_add',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_admin_list(){//管理员列表
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_admin_list');
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_admin_add(params){//添加管理员
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_admin_add',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_admin_del(params){//删除管理员
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_admin_del',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_admin_getinfo(params){//管理员权限列表
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_admin_getinfo',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_admin_updateAdmin(params){//修改管理员信息
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_admin_updateAdmin',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_menu_del(params){//删除菜单
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_menu_del',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    authority_menu_edit(params){//编辑菜单
        const req = Vue.http.post(WEBAPI_ROOT + '/authority_menu_edit',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    usercenter_change_myPasswd(params){//修改密码
        const req = Vue.http.post(WEBAPI_ROOT + '/usercenter_change_myPasswd',params);
        return req.then((response) => Promise.resolve(response.data));
    },
    borrower_list(params){//客户列表
        const req = Vue.http.post(WEBAPI_ROOT + '/borrower_list',params);
        return req.then((response) => Promise.resolve(response.data));
    }
}