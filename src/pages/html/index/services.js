import axios from 'axios';
import { Toast } from 'vant';
export const base = 'http://116.62.186.169:8903/api';
export const src ='http://116.62.186.169:8903/static/upload/';
const path = 'prod';

export const getPath = ()=>{
    if(path == 'dev') {
        return '';
    }else{
        return api.wgtRootDir +'/dist';
    }
}

var instance = axios.create({
    baseURL: base,
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
export const getVideo = ()=>instance.get(`/radio`);
export const getVideoDetail = (id)=>instance.get(`/radio/${id}`);
export const postVoice = params=>instance.post('/radio/voice',params);