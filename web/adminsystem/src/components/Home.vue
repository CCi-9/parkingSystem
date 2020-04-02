<template>
    <div class="layout">
        <Layout class="layout-content">
            <Sider ref="side1" hide-trigger collapsible :collapsed-width="20" v-model="isCollapsed" class="layout-content-sider">
                <Menu  accordion theme="light" width="auto" style="margin-right: -1px" >
                    <Submenu name="2">
                        <template slot="title">
                            <Icon type="ios-speedometer" size="20"></Icon>
                            客户
                        </template>
                        <MenuItem name="2-1" @click.native="showMenu('/index/user')">客户信息</MenuItem>
                    </Submenu>
                    <Submenu name="3">
                        <template slot="title">
                            <Icon type="ios-grid"></Icon>
                            记录
                        </template>
                        <MenuItem name="3-1" @click.native="showMenu('/index/parkingRecord')">停车记录</MenuItem>
                        <MenuItem name="3-2" @click.native="showMenu('/index/rechargeRecord')">账单</MenuItem>
                    </Submenu>
                    <Submenu name="4">
                        <template slot="title">
                            <Icon type="ios-settings"></Icon>
                            停车状态
                        </template>
                        <MenuItem name="4-1" @click.native="showMenu('/index/parkingCar')">停车场</MenuItem>
                        <MenuItem name="4-2" @click.native="showMenu('/index/currentBook')">目前预定用户</MenuItem>
                        <MenuItem name="4-3" @click.native="showMenu('/index/waitQueue')">目前排队用户</MenuItem>
                    </Submenu>
                </Menu>
            </Sider>
            <Content class="allPage">
                <router-view></router-view>
<!--
                <component :is="pageId"></component>
-->
            </Content>
        </Layout>
    </div>
</template>
<script>


    export default {
        name: "Home",
        data () {
            return {
                isCollapsed: false,
                pageId:'eList',
                timer: this.getTime()
            }
        },
        components:{

        },

        methods: {


            getTime:function(){
                let d = new Date;
                let M = (d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                let D = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
                return d.getFullYear() + "年" + M + "月" + D + "号" +
                    "星期" + "日一二三四五六".charAt(d.getDay());
            },

            showMenu(page){
                console.log(page)
                this.pageId = page;
                this.$router.push({path: page})
            }

        },
        onLoad(){

        }
    }
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    .layout{
        border: 0px solid #d7dde4;
        background: #d6fbea;
        position: relative;
        border-radius: 0px;
        overflow: hidden;
        height: 100vh;
    }
    .layout-header{
        margin: 0;
        padding: 0;
        height: 50px;
        background: #fff;
        margin-bottom: 5px;
    }



    .layout-content-sider{
        background: #d6fbea;
        overflow-y:auto;
    }
    .layout-content-sider::-webkit-scrollbar{
        width: 0px;
        background: #d6fbea;
    }
    .layout-content{
        height: 100%;
    }

    .allPage{
        width: 90%;
        height: 100%;
        padding-right: 5px;
    }
    .allPage>*{
        height: 100%;
    }
    .ivu-menu-light {
        background: #d6fbea;
        color: #8d8d8d;
    }
    .ivu-menu-item {
        color: #8d8d8d;
    }
    .ivu-menu-item-selected{
        color: white !important;
        background: #2d8cf0 !important;
        z-index: 2;
    }
</style>