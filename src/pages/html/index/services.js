import axios from 'axios';
import { Toast } from 'vant';

const ip = 'http://39.106.219.227';

export const base = `${ip}/api`;
export const src =`${ip}/static/upload/`;
export const fmSrc =`${ip}/audio/`;

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
export const getVideo = (params)=>instance.get(`/radio`,{params});
export const getVideoDetail = (id)=>instance.get(`/radio/${id}`);
export const postVoice = params=>instance.post('/radio/voice',params);
export const getPush = (id)=>instance.get(`/radio/activity/${id}`);
export const joinActivity = (params)=>instance.post(`/radio/activity/join`,params);
export const getMyActivity = (params)=>instance.get(`/radio/activity/join`,{params});
export const getActivity = (params)=>instance.get(`/radio/activity`,{params});
export const getColumn = ()=>instance.get(`/radio/column`);
export const getCode = (params)=>instance.get(`/member/code`,{params});
export const getTags = (params)=>instance.get(`/radio/tags`,{params});
export const postTags = (params)=>instance.post(`/radio/tags`,params);
export const getDefaultFm = (params)=>instance.get('/radio/default',{params});
export const setDefalutFm = params =>instance.post('/radio/default',params);

export const getLive = params=>instance.get('/radio/live',{params});
export const getLiveStatus = id=>instance.get(`/radio/live/radio?id=${id}`);

export const putMy = (token,params) => instance.put(`/member/${token}`,params);
export const uploadPic = (params) => instance.post(`/radio/voice/upload/pic`,params);
export const uploadFile = (params) => instance.post(`/radio/voice/upload/file`,params);
export const delPrograms = (params) => instance.post(`/radio/delPrograms`,params);
export const postLucky = (params) => instance.post(`/radio/lucky`,params);

export const getLucky = id =>instance.get(`/radio/lucky/${id}`);

