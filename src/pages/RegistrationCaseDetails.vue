<template>
    <div class="public-width">
      <div class="case-info">
        <div class="case-details-info">
          <div class="case-title">{{registrationCaseObj.title}}</div>
          <div class="case-subtitle">{{registrationCaseObj.subtitle}}</div>
          <div class="case-author"> 作者：<span>{{registrationCaseObj.author}}</span> | <span>{{registrationCaseObj.createTime}}</span> | <span>
            浏览数：{{registrationCaseObj.clickNumber}}</span> <a @click="returnCase()">返回</a></div>
          <div class="case-summary">{{registrationCaseObj.summary}}</div>
          <div class="case-content" v-html="registrationCaseObj.content"></div>
        </div>
        <div class="case-details-recommend">
          <Tabs>
            <TabPane label="推荐阅读">
                <div class="recommend-title" v-for="item in registrationCaseList" @click="jumpRecommend(item.aid)">{{item.title}}</div>
            </TabPane>
          </Tabs>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: "RegistrationCaseDetails"
      , data(){
        return {
          caseAid: 0
          , registrationCaseObj: {}
          , page: 0
          , size: 10
          , registrationCaseList: []
        }
      }
      , created:function () {
        this.caseAid = this.$route.query.caseAid;
        this.registrationCaseDetail(this.caseAid);
        this.registrationCaseRecommend();
      }

      , methods:{
        //1.根据caseAid获取详情
        registrationCaseDetail: function (caseAid) {
          let that = this;
          let registrationCaseParam = {
            articleAid: caseAid
          };
          this.$network.post(that.$GLOBAL.registrationCaseDetails, registrationCaseParam, function (data) {
            that.registrationCaseObj = data;
            that.registrationCaseObj.createTime = that.$GLOBAL.timeConversion(that.registrationCaseObj.createTime);
          })
        }

        //2.返回案例列表
        , returnCase: function () {
          this.$router.push({ path: 'registrationcase'});
        }

        //3.加载推荐阅读
        , registrationCaseRecommend: function () {
          let that = this;
          let registrationCaseParam = {
            languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
            , page: that.page
            , size: that.size
          };
          this.$network.post(that.$GLOBAL.caseApplication, registrationCaseParam, function (data) {
            that.registrationCaseList = data.content;
          })
        }

        //4.点击推荐阅读跳转
        , jumpRecommend: function (aid) {
          this.$router.push({ path: 'registrationcasedetails', query: { caseAid: aid }});
          this.registrationCaseDetail(aid);
        }
      }
    }
</script>

<style scoped>

.case-info{
  display: inline-block
}

.case-details-info{
  float: left;
  width: 80%;
}

.case-details-recommend{
  border-left: 1px solid #D7D7D7;
  margin-top: 0.5rem;
  display: inline-block;
  width: 20%;
}
.case-details-recommend > div{
  margin-left: 0.5rem;
}

.case-title{
  margin-top: 0.5rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;width:100%;
}

.case-subtitle{
  text-align: center;
}

.case-author{
  text-align: center;
}

.case-author > span{
  margin: 0.5rem;

}

.case-summary{
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
}

.recommend-title{
  cursor: pointer;
  margin-bottom: 0.25rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;width:100%;
}

.recommend-title:hover{
  color: #2D8CF0;
  text-decoration: underline
}


@media screen and (min-width: 768px) and (max-width: 959px) {
  .case-details-info{
    width: 100%;
  }

  .case-details-recommend{
    display: none;
  }
}

@media screen and (min-width: 480px) and (max-width: 767px) {
  .case-details-info{
    width: 100%;
  }

  .case-details-recommend{
    display: none;
  }
}

@media screen and (max-width: 479px) {
  .case-details-info{
    width: 100%;
  }

  .case-details-recommend{
    display: none;
  }
}
</style>
