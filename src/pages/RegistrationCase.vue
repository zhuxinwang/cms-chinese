<template>
    <div>
      <Row class="public-row">
        <Col :xs="0" :sm="1" :md="2" :lg="4" class="public-col"></Col>
        <Col :xs="0" :sm="23" :md="19" :lg="15" class="carousel-col-height-aoto">
          <h3>注册服务申请案例</h3>

          <div class="case-info">
            <Row>
              <Col class="registration-case" v-for="(item,index) in registrationCaseList" span="6" :offset="index===0 ? 0 : 3">
                <Card :bordered="false">
                  <p class="case-title">{{item.title}}</p>
                  <p class="case-time">{{item.createTime}}</p>
                  <p class="case-summary">{{item.summary}}</p>
                  <div>
                    <div class="case-img">
                      <img class="case-img" v-show="item.thumbnailUrl"  v-bind:src="item.thumbnailUrl"/>
                    </div>
                    <Button class="case-button" v-on:click="jumpCaseDetail(item.aid)">查看案例</Button>
                  </div>

                </Card>
              </Col>
            </Row>
          </div>
        </Col>
        <Col :xs="0" :sm="1" :md="2" :lg="5" class="public-col"></Col>

      </Row>
      <div class="page-paging">
        <Page :total=totalElements :current=page :page-size=size @on-change="handlePage" show-total/>
      </div>
    </div>

</template>

<script>
    export default {
      name: "RegistrationCase"
      , data(){
        return {
          page: 1
          , size: 9
          , totalElements: 0
          , registrationCaseList: []
        }
      }
      
      , created:function () {
        this.registrationCase(0,9)
      }

      , methods: {
        registrationCase: function (page,size) {
          let that = this;
          let registrationCaseParam = {
            languageTypeId: that.$GLOBAL.CHINESE_WEBSITE
            , page: page
            , size: size
          };
          this.$network.post(that.$GLOBAL.homePageRegistrationCase, registrationCaseParam, null, function (data) {
            that.registrationCaseList = data.content;
            //获取总页数
            that.totalElements = data.totalElements;
            //拼接图片访问地址
            let listLength = that.registrationCaseList.length;
            for (let i = 0; i < listLength; i++) {
              if (that.registrationCaseList[i].thumbnailUrl) {
                that.registrationCaseList[i].thumbnailUrl = that.$GLOBAL.UrlPrefix + that.registrationCaseList[i].thumbnailUrl;
              }
              that.registrationCaseList[i].createTime = that.$GLOBAL.timeConversion(that.registrationCaseList[i].createTime);
            }
            console.log(that.registrationCaseList)
          })
        }

        //2.页码发生变化
        , handlePage: function (value) {
          this.page = value;
          //由于接口是从0开始的，而页面page控件是从1开始的
          let pageNum = this.page - 1;
          this.registrationCase(pageNum,this.size)
        }

        //3.查看案例详情
        , jumpCaseDetail: function (aid) {
          this.$router.push({ path: 'registrationcasedetails', query: { caseAid: aid }});
        }
      }
    }
</script>

<style scoped>

.case-info{
  margin-top: 1rem;
  background-color: rgba(45,140,240,.07);
}

.registration-case{
  margin-top: 2rem;
  margin-left: 5.2rem;
  margin-bottom: 1rem;
}


.case-title{
  font-size: 1rem;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;width:100%;
}

.case-time{
  padding-bottom: 0.2rem;
  border-bottom: 1px solid #2D8CF0;
}

.case-summary{
  margin-top: 0.8rem;
  overflow: hidden;
  text-overflow: ellipsis;width:100%;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
  height: 3rem;
}
.case-img{
  margin-top: 0.5rem;
  height: 4rem;
  width: 10rem;
  vertical-align: bottom;
}

.case-button{
  position: absolute;
  right: 1rem;
  bottom: 1rem;
}


</style>
