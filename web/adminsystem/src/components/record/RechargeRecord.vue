<template>
    <div class="box">
        <div style="margin-bottom: 20px">
            <DatePicker v-model="date" type="daterange" split-panels separator="~" placeholder="选择日期"
                        style="width: 200px;margin-right: 20px;"></DatePicker>
            <Select v-model="remark" clearable  style="width: 200px;margin-right: 20px;">
                <Option value="退款" key="退款">退款</Option>
                <Option value="充值" key="充值">充值</Option>
                <Option value="扣费" key="扣费">扣费</Option>
            </Select>
            <Button type="primary" @click="selectRecord">筛选</Button>
        </div>

        <Table border size="small"
               ref="selection"
               :columns="columns"
               width="1300" :data="data">

            <template slot-scope="{ row, index }" slot="username">
                {{row.user.username}}
            </template>

            <template slot-scope="{ row, index }" slot="phone">
                {{row.user.phone}}
            </template>

            <template slot-scope="{ row, index }" slot="operate">
                <a href="javascript:void(0)" style="margin-left: 5px" @click="deleteRow(index,row.id)">删除</a>
            </template>
        </Table>
        <p>{{date}}</p>
        <Page :total="pageCount" @on-change="jump" style="margin-top: 20px" />
    </div>

</template>

<script>

    export default {
        name: "RechargeRecord",
        components: {},
        data() {
            return {
                date:'',
                username:null,
                phone:null,
                remark:null,
                pageCount: 0,
                columns: [
                    {
                        title: '用户名',
                        key: "username",
                        slot: "username",
                        width: 100,
                    },
                    {
                        title: '电话',
                        key: 'phone',
                        slot: "phone",
                        width: 200,
                    },
                    {
                        title: '时间',
                        key: 'time',
                        width: 200,
                    },
                    {
                        title: '费用',
                        key: 'fee',
                    },
                    {
                        title: '备注',
                        key: 'remark',
                    },

                    {
                        title: '操作',
                        key: 'operate',
                        width: 180,
                        slot: 'operate',
                    },
                ],
                data: [],
            }
        },
        mounted() {
            let that = this
            that.jump(0)
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
                            "http://localhost:8089/web/deleteRechargeRecord",
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

            selectRecord(){
                this.jump(0)
            },

            jump(page) {
                let that = this
                this.axios.get(
                    "http://localhost:8089/web/getRechargeRecord",
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Access-Control-Allow-Origin': "http://localhost:8080"
                        },
                        params: {
                            page: page,
                            username: that.username,
                            phone: that.phone,
                            startTime:that.date[0],
                            endTime:that.date[1],
                            remark:that.remark
                        }
                    },
                ).then(function (response) {
                    console.log(response)
                    that.data = response.data.data
                    that.pageCount = parseInt(response.data.message)
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        watch: {},
        computed: {}
    }
</script>

<style scoped>
    .box {
        padding: 15px;
    }

</style>