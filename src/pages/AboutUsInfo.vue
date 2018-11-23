<template>
    <div class="public-width">
        <div v-html="aboutUsObj.content"></div>
    </div>
</template>

<script>
    export default {
        name: "AboutUsInfo"
        , data() {
            return {
                aboutUsObj: ''
            }
        }
        , created: function () {
            this.aboutUsInfo();
        }

        , methods: {
            //1.加载关于我们界面
            aboutUsInfo: function () {
                let that = this;
                let aboutUsInfoParam = {
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
                };
                this.$network.post(that.$GLOBAL.aboutUsInfo, aboutUsInfoParam, function (data) {
                    that.aboutUsObj = data;
                })
            }
        }

    }
</script>

<style scoped>

</style>
