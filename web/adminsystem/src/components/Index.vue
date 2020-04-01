<template>
    <div class="layout">
        <Layout class="layout-header">
            <div class="left">
                <div class="title">
                    <a href="javascript:void(0)">智停车管理平台</a>
                </div>
            </div>

            <div class="right" >
                <span>欢迎</span>
                <Avatar icon="ios-person" size="large" class="icon" />
                <Dropdown>
                    <a href="javascript:void(0)">
                        cai
                        <Icon type="ios-arrow-down"></Icon>
                    </a>
                    <DropdownMenu slot="list">
                        <DropdownItem>修改密码</DropdownItem>
                        <DropdownItem>注销</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </Layout>
        <Layout class="layout-content">
            <Content class="allPage">

                <home></home>

            </Content>
        </Layout>
        <Layout>
            <Footer style="color: #8d8d8d" class="layout-footer">东莞理工学院 Copyright©2013 Dongguan University Of Technology All Rights Reserved. 粤ICP备05008829号</Footer>
        </Layout>
    </div>
</template>
<script>
    import Home from "./Home";
    export default {
        data () {
            return {
                isCollapsed: false,
                curPage:'index',
                pageId:'index',
                timer: this.getTime()
            }
        },
        components:{
            "home": Home
        },

        methods: {
            jump(){
                this.pageId = 'home';
                this.curPage = 'home'
            },

            getTime:function(){
                let d = new Date;
                let M = (d.getMonth() + 1) < 10 ? ('0' + (d.getMonth() + 1)) : (d.getMonth() + 1);
                let D = d.getDate() < 10 ? ('0' + d.getDate()) : d.getDate();
                return d.getFullYear() + "年" + M + "月" + D + "号" +
                    "星期" + "日一二三四五六".charAt(d.getDay());
            },

            showMenu(){
                this.pageId = 'index';
                this.curPage = 'index'
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
        color: #8d8d8d;
    }
    .layout{
        border: 0px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 0px;
        overflow: hidden;
        height: 100vh;
    }
    .layout-header{
        margin: 0;
        padding: 0;
        height: 50px;
        color: white;
        background: #d6fbea;
        /* background: url("../src/assets/title/titleL.png") no-repeat center center #0b151f;*/
        background-size:80px 150px;
    }
    .left{
        margin: 0  auto;
    }
    .left .title{
        font-family: 黑体;
        font-weight: bold;

        font-size: 30px;
        line-height: 50px;
        float: left;
    }

    .right{
        margin-top: 5px;
        width: 300px;
        position: absolute;
        right: 0;
    }
    .right .icon{
        margin:0 15px;
    }

    .layout-content{
        height: 90%;
        background: #d6fbea;
    }
    .layout-footer{
        text-align: center;
        background: #d6fbea;
        padding: 0;
    }
    .allPage{
        width: 99%;
        margin: 0 auto;
        height: 100%;
    }
    .allPage>*{
        height: 100%;
    }
</style>