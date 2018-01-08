import axios from 'axios';
import { Toast } from 'vant';

const ip = 'http://116.62.186.169:8903';

export const base = `${ip}/api`;
export const src =`${ip}/static/upload/`;
export const fmSrc =`${ip}/static/audio/`;
const path = 'dev';

export const getPath = ()=>{
    if(path == 'prod') {
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
export const getVideo = (params)=>instance.get(`/radio`,{params});
export const getVideoDetail = (id)=>instance.get(`/radio/${id}`);
export const postVoice = params=>instance.post('/radio/voice',params);
export const getPush = (id)=>instance.get(`/radio/activity/${id}`);
export const joinActivity = (params)=>instance.post(`/radio/activity/join`,params);
export const getActivity = (params)=>instance.get(`/radio/activity`,{params});
