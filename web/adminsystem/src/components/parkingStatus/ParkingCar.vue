<template>
    <div class="box">
        <Table border size="small"
               ref="selection"
               :columns="columns"
               width="1300" :data="data">
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
                        title: '车牌号',
                        key: 'carLicence',
                        width: 200,
                    },
                    {
                        title: '停放时间',
                        key: 'parkingTime',
                    },
                    {
                        title: '已付款',
                        key: 'fee',
                    },
                    {
                        title: '电话号码',
                        key: 'phone',
                    },
                ],
                data: [],
            }
        },
        methods: {
            getParkingCar(){
                console.log("发送了一个parking请求")
                let that = this
                this.axios.get(
                    "http://localhost:8089/web/getParkingCar",
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
            this.getParkingCar()
            window.setInterval(()=>{
                setTimeout(this.getParkingCar,0)
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