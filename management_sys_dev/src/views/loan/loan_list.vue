<template>
    <div>
        <div class="admin_list_title">
                <el-badge :value="1800" class="item">
                    <el-button size="small">全部客户</el-button>
                </el-badge>
                <el-badge :value="1800" class="item">
                    <el-button size="small">待审核</el-button>
                </el-badge>
                <el-badge :value="1800" class="item">
                    <el-button size="small">审核通过</el-button>
                </el-badge>
                <el-badge :value="1800" class="item">
                    <el-button size="small">审核驳回</el-button>
                </el-badge>
        </div>
        <div style="padding-top: 10px;border-top: 10px solid #eee;border-bottom: 10px solid #eee;">
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <div style="display:block;">
                    <el-form-item label="客户信息">
                        <el-input v-model="form.user" placeholder="邮箱/姓名/手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="所属城市">
                        <el-select v-model="form.region" placeholder="全部">
                        <el-option label="上海" value="shanghai"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="注册时间">
                        <el-date-picker
                            v-model="value7"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </el-form-item>
                </div>
                <el-form-item label="推荐人">
                    <el-input v-model="form.user" placeholder="推荐ID/手机号"></el-input>
                </el-form-item>
                <el-form-item label="审核时间">
                    <el-date-picker
                        v-model="value7"
                        type="daterange"
                        align="right"
                        unlink-panels
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :picker-options="pickerOptions2">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button @click="reset();">重 置</el-button>
                    <el-button type="primary" @click="doQuery()">确 认</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div style="margin-top:10px;">
            <el-button type="" @click="exportData()" icon="el-icon-download">导出</el-button>
            <el-button type="" @click="refreshData()" icon="el-icon-refresh">刷新</el-button>
        </div>
         <el-table
            :data="list_data"
            border
            fit
            stripe
            style="width: 100%;margin-top: 10px;">
            <el-table-column
                type="selection"
                align="center">
            </el-table-column>
            <el-table-column
                prop="borrowerNo"
                label="编号"
                align="center">
            </el-table-column>
            <el-table-column
                prop="borrowerName"
                label="客户姓名">
            </el-table-column>
            <el-table-column
                prop="phoneNum"
                align="center"
                label="手机号">
            </el-table-column>
            <el-table-column
                prop="borrowMoney"
                align="center"
                label="借款金额">
            </el-table-column>
            <el-table-column
                prop="borrowCycle"
                align="center"
                label="借款期限">
            </el-table-column>
            <el-table-column
                prop="city"
                align="center"
                label="所属城市">
            </el-table-column>
            <el-table-column
                prop="createtime"
                align="center"
                label="注册时间">
            </el-table-column>
            <el-table-column
                :prop="accountStatus"
                align="center"
                :formatter="accountStatusFormatter"
                label="账号状态">
            </el-table-column>
            <el-table-column
                prop="auditStatus"
                align="center"
                :formatter="auditStatusFormatter"
                label="审核状态">
            </el-table-column>
            <el-table-column
                label="操作"
                align="center"
                width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="viewInfo(scope.row)">查看</el-button>
                    <el-button type="text" size="small" @click="editInfo(scope.row)">编辑</el-button>
                    <el-button type="text" size="small" @click="userClose(scope.row)">停用</el-button>
                    <el-button type="text" size="small" v-if="scope.row.auditStatus!=0" @click="showAudit(scope.row)">详情</el-button>
                    <el-button type="text" size="small" v-if="scope.row.auditStatus==0" @click="audit(scope.row)">审核</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div style="text-align:center;margin-top:20px;">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-size="pageSize"
                layout="total, prev, pager, next, jumper"
                :total="totalSize">
            </el-pagination>
        </div>
    </div>
</template>
<script>
    import api from '../../api'
    import {
        mapGetters,
        mapActions
    } from 'vuex'
    import Vali from '../../utils/validate_rules'
    import util from '../../utils/util'
    import mock from '../../utils/mock'
    export default {
        data: function() {
            return {
                list_data:[],
                pageSize:10,
                totalSize:50,
                currentPage: 1,
                form: {
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
                
            }
        },
        mounted: function() {
        },
        computed: {
            ...mapGetters(['getUserInfo', 'getLeftBig', 'getRightNavLinks', 'getNavMenu']),
        },
        methods: {
            ...mapActions(['removeUserInfo']),
            load_list(currentPage){
                let self=this;
                api.borrower_list({
                    pageSize:this.pageSize,
                    currentPage:currentPage
                })
                .then((data)=>{
                    console.log(JSON.stringify(data));
                    var _data = util.formatJson(data);
                    if (_data.code == 0) {
                        self.list_data=_data.data.borrower_list;
                    }
                })
                .catch((error)=>{
                    self.$message.error({
                        message: '未知错误,请联系管理员！'
                    });

                })
            },
            exportData(){//导出
                
            },
            refreshData(){//刷新

            },
            doQuery(){
                
            },
            reset(){

            },
            editInfo(row){//编辑信息
                this.$router.push({name:'loan_editSave', params: { id: row.id }});
            },
            viewInfo(row){//查看信息
                this.$router.push({name:'loan_info', params: { id: row.id }});
            },
            audit(row){//审核
                this.$router.push({name:'loan_audit', params: { id: row.id }});
            },
            userClose(){//账号停用

            },
            showAudit(){//查看审核信息
                this.$router.push({name:'loan_showAudit', params: { id: row.id }});
            },
            // showAdminAdd(){
            //     this.$router.push({name:'authority_admin_add'});
            // },
            // editAdmin(row){
            //     this.$router.push({name:'authority_admin_edit', params: { id: row.id }});
            // },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.load_list(val);
            },
            accountStatusFormatter(row, column) {
                if(row.accountStatus == 0){
                    return "启用"
                }else{
                    return "停用"
                }
            },
            auditStatusFormatter(row, column) {
                if(row.auditStatus == 0){
                    return "待审核";
                }else if(row.auditStatus == 1){
                    return "审核通过";
                }else{
                    return "已驳回";
                }
            }
            
        },
        created: function() {
            this.load_list(this.currentPage);
        }
    }
</script>
<style>
.admin_list_title{margin-bottom:10px;}
.el-badge:first-child{margin-left: 0;}
.el-badge{margin-left: 50px;}
</style>
