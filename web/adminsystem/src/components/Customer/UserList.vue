<template>
    <div class="box">
        <Table border size="small"
               ref="selection"
               @on-select="count++"
               @on-select-cancel="count--"
               @on-select-all="count = allCount"
               @on-select-all-cancel="count = 0"
               :columns="columns"
               width="1300" :data="data">
            <template slot-scope="{ row, index }" slot="operate">
                <a href="javascript:void(0)">查看汽车</a>
                <a href="javascript:void(0)" style="margin-left: 5px" @click="deleteRow(index,row.id)">删除</a>
            </template>
        </Table>
        <p style="margin: 10px 0">已选中 {{count}} 条, 共 {{allCount}} 条 </p>

        <Page :total="11"/>
    </div>

</template>

<script>

    export default {
        name: "GroupManager",
        components: {},
        data() {
            return {
                count: 0,
                allCount: 7,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center',
                    },
                    {
                        title: 'id',
                        key: 'id',
                        width: 100,
                    },

                    {
                        title: '用户名',
                        key: 'username',
                        width: 100,
                    },
                    {
                        title: '手机号码',
                        key: 'phone',
                        width: 200,
                    },
                    {
                        title: '性别',
                        key: 'sex',
                    },
                    {
                        title: '余额',
                        key: 'balance',
                    },

                    {
                        title: '操作',
                        key: 'operate',
                        width: 180,
                        slot: 'operate',
                    },
                ],
                data: [
                    {
                        id: "6",
                        username: "caicai",
                        phone: "13532736612",
                        sex: "男",
                        balance: "-1.0",
                    },
                ],
            }
        },
        methods: {
            handleSelectAll(status) {
                this.$refs.selection.selectAll(status);
            },
            deleteRow(index, id) {
                let that = this
                this.$Modal.confirm({
                    title: '确定要删除该记录吗？',
                    onOk: () => {
                        that.axios.post(
                            "http://localhost:8089/web/deleteUser",
                            {},
                            {
                                headers: {
                                    'Content-Type': 'application/x-www-form-urlencoded',
                                },
                                params: {
                                    id: id
                                }
                            }
                        ).then(function (response) {
                            that.$Message.info(response.data.message);
                            that.data.splice(index, 1)
                        })

                    },
                    onCancel: () => {

                    }
                });

            },

        },
        mounted() {
            let that = this
            this.axios.get(
                "http://localhost:8089/web/getUserByPage",
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': "http://localhost:8080"
                    },
                    params:{
                        page:1
                    }
                },
            ).then(function (response) {
                console.log(response)
                that.data = response.data.data
            })
                .catch(function (error) {
                    console.log(error);
                });
        },
        watch: {},
        computed: {}
    }
</script>

<style scoped>
    .box {
        padding: 15px;
    }

    Button {
        margin-top: 10px;
        margin-right: 20px;
        margin-bottom: 40px;
    }

</style>