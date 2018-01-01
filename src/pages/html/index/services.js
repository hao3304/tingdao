import axios from 'axios';
import { Toast } from 'vant';

export const src ='http://116.62.186.169:8903/static/upload';

var instance = axios.create({
    baseURL: 'http://116.62.186.169:8903/api',
    timeout:8000
});

instance.interceptors.response.use(function (response) {
    const rep = response.data;
    if(rep.code == 0) {
        return rep.response;
    }else{
        Toast.fail(rep.msg);
        return null;
    }
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export const login = (params)=>instance.post(`/member/mobile/login`,params);
export const getUserInfo = token=>instance.get(`/member/${token}`);
export const getRadio = ()=>instance.get(`/radio`);
export const getRadioDetail = (id)=>instance.get(`/radio/${id}`);