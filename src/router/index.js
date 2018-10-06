import Vue from 'vue'
import Router from 'vue-router'

import Master from '@/pages/Master' //引入模板页Master
import HomePage from '@/pages/HomePage' //引入主页HomePage
import Statute from  '@/pages/Statute'  //引入法规页面
import News from '@/pages/News'  //引入新闻页面
import RegistrationCase from '@/pages/RegistrationCase' //引入案例页面
import RegistrationCaseDetails from '@/pages/RegistrationCaseDetails' //引入案例详情
import NewsDetails from '@/pages/NewsDetails' //引入新闻详情


Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Master',
      component: Master
    },
    {
      path: '/homepage',
      name: 'HomePage',
      component: HomePage
    },
    {
      path: '/master',
      name: 'Master',
      component: Master,
      children: [
        //主页
        {
          path: 'homepage',
          name: 'HomePage',
          component: HomePage
        }

        //法规
        , {
          path: 'statute',
          name: 'Statute',
          component: Statute
        }

        //新闻资讯
        , {
          path: 'news',
          name: 'News',
          component: News
        }

        //新闻详情
        , {
          path: 'newsdetails',
          name: 'NewsDetails',
          component: NewsDetails
        }

        //案例
        , {
          path: 'registrationcase',
          name: 'RegistrationCase',
          component: RegistrationCase
        }

        //案例详情
        , {
          path: 'registrationcasedetails',
          name: 'RegistrationCaseDetails',
          component: RegistrationCaseDetails
        }



      ]
    }
  ]
})
