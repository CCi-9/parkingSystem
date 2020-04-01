<template>
    <div class="box" style="width: 700px; height: 350px;">
        <div class="cms_login">
            <div class="cms_login_container">
                <div class="cms_login_text">欢迎进入智停车管理系统</div>
                <div class="cms_login_table">
                    <Form ref="formInline" :model="formInline">
                        <FormItem prop="user" class="divBox">
                            <span class="margin_right10">账号</span>
                            <Input v-model="formInline.user" placeholder="请输入用户名" style="width: 300px"/>
                        </FormItem>
                        <FormItem prop="password" class="divBox">
                            <span class="margin_right10">密码</span>
                            <Input v-model="formInline.password" placeholder="请输入密码" type="password"
                                   style="width: 300px"/>
                        </FormItem>
                        <div class="divBox margin_top60">
                            <Button type="info" style="width: 300px" @click="login('formInline')">登陆</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "login",
        data() {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
            }
        },
        methods: {
            login() {
                if (this.formInline.user == '') {
                    this.$Message['error']({
                        background: true,
                        content: '请输入用户名'
                    });
                    return
                }

                if (this.formInline.password == '') {
                    this.$Message['error']({
                        background: true,
                        content: '请输入密码'
                    });
                    return
                }
                let that = this
                this.axios.post(
                    "http://localhost:8089/web/login",
                    {
                        username: this.formInline.user,
                        password: this.formInline.password,
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': "http://localhost:8080"
                        }
                    }
                ).then(function (response) {
                    if (response.data.message != 'success') {
                        that.$Message['error']({
                            background: true,
                            content: response.data.message
                        });
                    } else {
                        that.$router.push({ path: '/index'})
                    }
                })
                    .catch(function (error) {
                        console.log(error);
                    });

            }
        }
    }
</script>

<style scoped>
    * {
        padding: 0;
        margin: 0;
        font-size: 17px;
        font-family: 微软雅黑;
    }

    html, body {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .box {
        margin: 180px auto;
    }

    .cms_login_container {

        padding-top: 10px;
        height: 320px;
        border-radius: 10px;
        box-shadow: inset 0 0 15px #a9e2ff
    }

    .cms_login_text {
        height: 100px;
        width: 100%;
        line-height: 80px;
        text-align: center;
        font-size: 30px;
    }

    .cms_login_table {
        font-size: 18px;
    }

    /* 统一盒子样式 */
    .divBox {
        height: 50px;
        width: 100%;
        line-height: 50px;
        text-align: center;
        overflow: hidden;
    }


    input:focus {
        border-radius: 5px;
        outline: none;
        border: 2px solid #66afe9;
        box-shadow: inset 0 2px 2px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
    }

    .margin_right10 {
        margin-right: 10px;
    }

    .margin_top60 {
        margin-top: 30px;
    }


    .divBox {
        line-height: 32px;
    }

</style>