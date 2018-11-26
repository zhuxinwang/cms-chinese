<template>
    <div class="public-width">
        <div class="term">
            <div class="term-header">
                <Input search enter-button placeholder="输入关键字搜索" v-model="seachKey" class="term-seach" @on-search="seachClick"/>
            </div>
            <div v-if="termList.length === 0" class="term-nothave">没有相关术语</div>
            <table class="term-table" v-if="termList.length > 0">
                <tr>
                    <th>术语名称</th>
                    <th>解释</th>
                    <th>查看中文</th>
                </tr>
                <tr v-for="item in termList">
                    <td>(Q)SAR and SAR(Q)SAR and SAR <span>{{item.title}}</span></td>
                    <td><span>{{item.summary}}</span>
                    </td>
                    <td>
                        <button class="term-btn" @click="jumpTermDetail(item.aid)">中文</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Term"
        , data(){
            return{
                termList:[]
                , page: 0
                , size: 10

                // 搜索关键词
                , seachKey:''
            }
        }
        , created() {
            this.getTermListByKey();
        }
        ,methods:{
            // 根据输入的条件搜索术语列表
            getTermListByKey(){
                let getTermListByKeyParam = {
                    languageTypeId: this.$GLOBAL.CHINESE_WEBSITE,
                    typeID: this.$GLOBAL.articleTypeForTerm,
                    page: this.page,
                    size: this.size,
                    tagList:'-1',
                    title:this.seachKey ? this.seachKey : '-1'
                };

                // 请求列表
                let that = this;
                this.$network.post(that.$GLOBAL.getNews, getTermListByKeyParam, function (data) {
                    console.log(data.content);
                    that.termList = data.content;
                });
            },

            // 点击搜索按钮
            seachClick(){
                this.getTermListByKey();
            },

            // 术语详情
            jumpTermDetail: function (aid) {
                this.$router.push({path: 'termdetail', query: {articleAid: aid}});
            }
        }
    }
</script>

<style scoped>
    .term {
        /*width: 1000px;*/
        margin: 0 auto;
    }

    .term-header {
        padding: 10px 0 20px ;
        font-size: 1.2rem;
        font-weight: 600;
    }

    .term-header > div{
        margin: auto;
        width: 70%;
    }

    .term-seach {
        margin-left: 2rem;
        width: 25rem;
    }

    .term-table {
        margin-top: 1rem;
        width: 100%;
        border-collapse: collapse;
    }

    .term-table > tr > td,
    .term-table > tr > th {
        border: 1px solid #ddd;
        padding: .6rem .6rem;
        height: 2.6rem;
    }

    .term-table > tr > td img {
        width: 1rem;
        height: 1rem;
        padding-top: .2rem;
    }

    .term-table > tr > td:first-child,
    .term-table > tr > td:last-child {
        min-width: 16rem;
        padding: .6rem .5rem;
        font-size: 1rem;
        font-weight: 600;
    }

    .term-table > tr > td:last-child {
        text-align: center;
    }

    .term-btn {
        padding: .2rem 2rem;
        background-color: transparent;
        color: #999;
        border: 1px solid #999;
        border-radius: 4px;
        cursor: pointer;
    }

    .term-nothave{
        text-align: center;
        color: #999;
        font-size: 18px;
        margin-bottom: 50px;
    }
</style>
