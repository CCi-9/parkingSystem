<template>
    <div class="box">
        <Table border size="small"
               ref="selection"
               :columns="columns"
               width="1300" :data="data">
            <template slot-scope="{ row, index }" slot="time">
                <Time :time="row.bookTime" :interval="1" />
            </template>
        </Table>
    </div>

</template>

<script>

    export default {
        name: "GroupManager",
        components: {},
        data() {
            return {
                columns: [
                    {
                        title: 'id',
                        key: 'id',
                        width: 200,
                    },
                    {
                        title: '预定时间',
                        key: 'bookTime',
                    },
                    {
                        title: '预定截止时间',
                        key: 'bookEndTime',
                    },
                    {
                        title: '已付款',
                        key: 'fee',
                    },
                    {
                        title: '电话号码',
                        key: 'phone',
                    },
                    {
                        title: '倒计时',
                        key: 'time',
                        slot:'time'
                    },
                ],
                data: [],
            }
        },
        methods: {
            getCurrentBook(){
                console.log("发送了一个book请求")
                let that = this
                this.axios.get(
                    "http://localhost:8089/web/getCurrentBook",
                    {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                            'Access-Control-Allow-Origin': "http://localhost:8080"
                        },
                    },
                ).then(function (response) {
                    console.log(response)
                    that.data = response.data.data
                })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        },
        mounted() {
            this.getCurrentBook()
            window.setInterval(()=>{
                setTimeout(this.getCurrentBook,0)
            },30000)
            /*


             */
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