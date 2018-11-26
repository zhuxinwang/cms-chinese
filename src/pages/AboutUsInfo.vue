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
                    languageTypeId: that.$GLOBAL.CHINESE_WEBSITE,
                    typeID: this.$GLOBAL.articleTypeForAboutUS,
                    page: 0,
                    size: 10
                };
                this.$network.post(that.$GLOBAL.getArticle, aboutUsInfoParam, function (data) {
                    if (data.content.length > 0) {
                        let getDetailsParam = {
                            articleAid: data.content[0].aid
                        };

                        that.$network.post(that.$GLOBAL.articleDetails, getDetailsParam, function (data) {
                            that.aboutUsObj = data;
                            console.log(data)
                        })

                    }
                })
            }
        }

    }
</script>

<style scoped>

</style>
