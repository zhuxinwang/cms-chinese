import GLOBAL from './Global' //导入全局参数

/**
 * 引入网络请求工具 axios
 */

var axios = require('axios');

/**
 * 定义网络请求的base地址
 * @type {string}
 */
axios.defaults.baseURL = GLOBAL.BaseURLAPI;

/**
 * 将对象类型的参数转换为post可以接受的fromdata
 * @param dataObj
 */
function transFormRequest(dataObj) {
  let params = '';
  for (let key in dataObj){
    params += encodeURIComponent(key) + '=' + encodeURIComponent(dataObj[key]) + '&'
  }
  return params;
}

/**
 * 发起网络请求，请求接口
 * @param method 请求的方式[get/post]
 * @param url 接口url
 * @param params 请求的参数
 * @param success 成功回调函数
 * @param failure 失败回调函数
 */
function networkAxios(method,url,params,success,failure) {
  let token = localStorage.getItem("token");

  //1.处理带有文件的请求参数
  var formdata = new FormData();
  if(params){
    //有文件
    if(params['file'] !== undefined){
      $.each(params,function (key,value) {
        formdata.append(key,value)
      });
      //重新给params赋值
      params = formdata;
    }else{
      //将参数转换为post请求的方式
      params = transFormRequest(params);
    }
  }
  //2.处理带有请求头参数
  axios({
    method: method,
    url: url,
    // get 请求使用params 而post 请求使用data
    data: method === 'POST' ? params : null,
    params: method === 'GET' ? params : null,
    header: { 'token' : token },
    withCredentials: false
  }).then(function (res) {
    if(res.data.success === true){
      if(success){
        success(res.data.data)
      }
    }else{
      if(failure){
        console.log(res.data.message);
      }
    }
  }).catch(function (err) {
    console.log(err);

  });
}

/**
 * 返回在vue模版中调用
 */
export default {
  get:function (url,params,success,failure) {
    return networkAxios('GET'.url,params,success,failure)
  },
  post:function (url,params,success,failure) {
    return networkAxios('POST',url,params,success,failure)
  }
}
