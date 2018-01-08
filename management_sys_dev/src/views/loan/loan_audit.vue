<template>
    <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <div style="display:block;">
            <el-form-item label="身份证号">
                564 343 906 066 656  6565
            </el-form-item>
            <el-form-item label="储蓄卡号">
                56434 39060 56456 45656 656
            </el-form-item>
        </div>
        <div style="display:block;">
            <el-form-item label="开户行">
                北京人民银行上地支行
            </el-form-item>
        </div>
        <div style="display:block;">
            <img src="" alt="图片">
        </div>
        <div>天机风控系统检测如下：</div>
        <ul>
            <li>天机风控系统检测结果</li>
            <li>天机风控系统检测结果</li>
            <li>天机风控系统检测结果</li>
            <li>天机风控系统检测结果</li>
            <li>天机风控系统检测结果</li>
        </ul>
        <div style="display:block;">
            <el-form-item>
                <el-button type="primary" @click="onSubmit">审核通过</el-button>
                <el-button type="primary" @click="onSubmit">审核不通过</el-button>
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
