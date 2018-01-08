<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div style="display:block;">
            <el-form-item label="客户编号">
                242423235235
            </el-form-item>
            <el-form-item label="注册时间">
                2018-12-23    12：23：22
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="客户手机">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="客户邮箱">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="客户姓名">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="客户性别">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="借款金额">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="借款期限">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="推荐人">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
            <el-form-item label="推荐人ID">
                <el-input v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="所属城市">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="账户状态">
                <el-select v-model="formInline.region" placeholder="活动区域">
                <el-option label="男" value="shanghai"></el-option>
                <el-option label="女" value="beijing"></el-option>
                </el-select>
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="备注">
                <el-input type="textarea"  :autosize="{ minRows: 2, maxRows: 4}" v-model="formInline.user" placeholder="审批人"></el-input>
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保 存</el-button>
            </el-form-item>
        </div>
    </el-form>
</template>
<script>
    import api from '../../api'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import Vali from '../../utils/validate_rules'
    import util from '../../utils/util'
    
    export default {
        data: function() {
            return {
                list_data:[],
                formInline: {
                    user: '',
                    region: ''
                },
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                value7: '',
                currentPage4: 4
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
            editAdmin(row){
                this.$router.push({name:'authority_admin_edit', params: { id: row.id }});
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
        created: function() {
            this.load_list();
        }
    }
</script>
<style>
.admin_list_title{margin-bottom:10px;}
.el-badge:first-child{margin-left: 0;}
.el-badge{margin-left: 50px;}
</style>
