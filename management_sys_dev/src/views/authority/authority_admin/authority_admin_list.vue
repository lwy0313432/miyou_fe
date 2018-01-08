<template>
    <div>
        <div class="admin_list_title">
             <el-button @click="showAdminAdd()"><i class='el-icon-plus'></i>添加管理员</el-button>
        </div>
         <el-table
            :data="list_data"
            border
            style="width: 100%">
            <el-table-column
                prop="username"
                label="管理员"
                width="180">
            </el-table-column>
            <el-table-column
                prop="role"
                label="角色"
                width="180">
            </el-table-column>
            <el-table-column
                prop="authority"
                label="权限">
            </el-table-column>
            <el-table-column
                label="操作">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="editAdmin(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="isDelAdmin(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- <el-dialog title="添加管理员" :visible.sync="dialogFormVisible" width='600px'>
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                <el-input v-model="form.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input v-model="form.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="中文名" :label-width="formLabelWidth">
                <el-input v-model="form.real_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth">
                    <el-select v-model="form.role" placeholder="请选择">
                        <el-option
                        v-for="item in roles"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addAdmin()">保 存</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
    import api from '../../../api'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import Vali from '../../../utils/validate_rules'
    import util from '../../../utils/util'
    
    export default {
        data: function() {
            return {
                list_data:[]
            }
        },
        mounted: function() {
            
    
        },
        computed: {
            ...mapGetters(['getUserInfo', 'getLeftBig', 'getRightNavLinks', 'getNavMenu']),
        },
        methods: {
            ...mapActions(['removeUserInfo']),
            load_list(){
                let self=this;
                api.authority_admin_list({})
                .then((data)=>{
                    // console.log(data)
                    var _data = util.formatJson(data);
                    if (_data.code == 0) {
                        self.list_data=_data.data.admin_list;
                    }

                })
                .catch((error)=>{
                    self.$message.error({
                        message: '未知错误,请联系管理员！'
                    });

                })
            },
            showAdminAdd(){
                this.$router.push({name:'authority_admin_add'});
            },
            addAdmin(){
                this.dialogFormVisible = false;
                console.log("提交数据："+this.form.username+"_"+this.form.password+"_"+this.form.real_name+"_"+this.form.role)
                api.authority_admin_add({
                    username:this.form.username,
                    password:this.form.password,
                    real_name:this.form.real_name,
                    role:this.form.role
                })
                .then((data)=>{
                    var _data = util.formatJson(data);
                    console.log(_data)
                    if (_data.code == 0) {
                        this.$message('添加成功');
                        this.load_list();
                    }else{
                         this.$message.error(_data.message);
                    }
                })
                .catch((error)=>{
                    self.$message.error({
                        message: '未知错误,请联系管理员！'
                    });
                })
            },
            isDelAdmin(row) {
                this.$confirm('删除管理员, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.delAdmin(row);
                }).catch(() => {
                    console.log("已取消删除");       
                });
            },
            delAdmin(row){
                api.authority_admin_del({
                    id:row.id
                })
                .then((data)=>{
                    var _data = util.formatJson(data);
                    console.log(_data)
                    if (_data.code == 0) {
                        this.$message({
                            message: '删除成功',
                            type: 'success'
                        });
                        this.load_list();
                    }else{
                        this.$message.error(_data.message);
                    }
                })
                .catch((error)=>{
                    self.$message.error({
                        message: '未知错误,请联系管理员！'
                    });
                })
            },
            editAdmin(row){
                this.$router.push({name:'authority_admin_edit', params: { id: row.id }});
            }
        },
        created: function() {
            this.load_list();
        }
    }
</script>
<style>
.admin_list_title{margin-bottom:10px;}
</style>
