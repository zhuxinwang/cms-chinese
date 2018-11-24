//导入全局参数
import GLOBAL from './Global'

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
 * 发起网络请求，请求接口
 * @param {Function} method 请求的方式[get/post]
 * @param {String} url 接口url
 * @param {Object} params 请求的参数
 * @param {Function} success 成功回调函数
 * @param {Function} failure 失败回调函数
 */
function networkAxios(method, url, params, success, failure) {
    let token = localStorage.getItem("token");

    //1.将请求参数转为formData模式，解决文件上传问题
    let formdata = new FormData();
    if (params) {
        for(let item in params){
            formdata.append(item,params[item])
        }
        //重新给params赋值
        params = formdata;
    }
    //2.处理带有请求头参数
    axios({
        method: method,
        url: url,
        // 请求方式不同使用不懂的参数名称
        data: method === 'POST' ? params : null,
        params: method === 'GET' ? params : null,
        headers: {'token': token},
        withCredentials: false
    }).then(function (res) {
        if (res.data.success === true) {
            if (success) {
                success(res.data.data)
            }
        } else {
            if (failure) {
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
    get: function (url, params, success, failure) {
        return networkAxios('GET'.url, params, success, failure)
    },
    post: function (url, params, success, failure) {
        return networkAxios('POST', url, params, success, failure)
    }
}
