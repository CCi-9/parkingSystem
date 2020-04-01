<template>
    <div class="box">
        <div style="margin-bottom: 20px">
            <DatePicker v-model="date" type="daterange" split-panels separator="~" placeholder="选择日期"
                        style="width: 200px;margin-right: 20px;"></DatePicker>
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
                remark:null,
                pageCount: 0,
                columns: [


                    {
                        title: '车牌号',
                        key: 'carLicence',
                        width: 100,
                    },
                    {
                        title: '停放时间',
                        key: 'startTime',
                        width: 200,
                    },
                    {
                        title: '离开时间',
                        key: 'endTime',
                        width: 200,
                    },

                    {
                        title: '用户名',
                        key: 'username',
                        slot: 'username',
                        width: 100,
                    },

                    {
                        title: '电话号码',
                        key: 'phone',
                        slot: 'phone',
                        width: 200,
                    },
                    {
                        title: '费用',
                        key: 'fee',
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

            selectRecord(){
                this.jump(0)
            },

            jump(page) {
                let that = this
                this.axios.get(
                    "http://localhost:8089/web/getParkingRecord",
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Access-Control-Allow-Origin': "http://localhost:8080"
                        },
                        params: {
                            page: page,
                            startTime:that.date[0],
                            endTime:that.date[1],
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