// 定义请求根路径baseUrl
const baseUrl="http://localhost:9091/venueReservation";
//同时并发请求的次数
let ajaxTimes=0;
// 返回请求根路径baseUrl
export const getBaseUrl=()=>{
  return baseUrl;
}
// wx login封装
export const getWxLogin=()=>{
  
  return new Promise((resolve,reject)=>{
    wx.login({
      timeout: 5000,
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}
// wx getUserProfile封装
export const getUserProfile=()=>{
  return new Promise((resolve,reject)=>{
    wx.getUserProfile({
      desc: '获取用户信息',
      success:(res)=>{
        resolve(res)
      },
      fail:(err)=>{
        reject(err)
      }
    })
  });
}



// 后端请求工具类
export const requestUtil=(params)=>{
  //判断url中是否带有 /my/ 请求的是私有的路径 带上header token
  let header={...params.header};
//   if(params.url.includes("/my/") || params.url.includes("/cart") || params.url.includes("/collect")  || params.url.includes("/comment") ||params.url.includes("/suggestInfo") || params.url.includes("/config")){
//       console.log(wx.getStorageSync('token'),'wx.getStorageSync(')
//     //拼接header 带上token
    
//   }
header["token"]=wx.getStorageSync('token')

  var start = new Date().getTime();
  ajaxTimes++;
  wx.showLoading({
    title: '加载中...',
    mask:true
  })
  //模拟网络延迟加载
  while(true){
    if(new Date().getTime()-start>1*100) break;
  }

  return new Promise((resolve,reject)=>{
    wx.request({
      ...params,
      header,
      url:baseUrl+params.url,
      success:(result)=>{
        if(result.data.code == 401) {
            wx.showToast({
                title:'请去登录',
                icon:'none',
                mask:true
              })
              wx.navigateTo({
                url: '/pages/login/login',
              })
        } else {
            resolve(result.data)
        }
      },
      fail:(err)=>{
        console.log(err,'resultresultresult')
        resolve(err)
      },
      complete:()=>{
        ajaxTimes--;
        if(ajaxTimes==0){
          wx.hideLoading();//关闭加载图标
        } 
      }
    })
  });
}


// 后端请求工具类
export const requestUpdateUtil=(params)=>{
    //判断url中是否带有 /my/ 请求的是私有的路径 带上header token
    let header={...params.header};
    // if(params.url.includes("/my/") || params.url.includes("/cart") || params.url.includes("/collect") || params.url.includes("/comment")|| params.url.includes("/config")){
    //     console.log('SDNSDNDN')
    //   //拼接header 带上token
    //   header["token"]=wx.getStorageSync('token')
    // }
    header["token"]=wx.getStorageSync('token')
  
    var start = new Date().getTime();
    console.log(start)
    ajaxTimes++;
    wx.showLoading({
      title: '加载中...',
      mask:true
    })
    //模拟网络延迟加载
    while(true){
      if(new Date().getTime()-start>1*100) break;
    }
  
    return new Promise((resolve,reject)=>{
      wx.request({
        ...params,
        header,
        url:baseUrl+params.url,
        method: 'POST',
        success:(result)=>{
          resolve(result.data)
        },
        fail:(err)=>{
          resolve(err)
        },
        complete:()=>{
          ajaxTimes--;
          if(ajaxTimes==0){
            wx.hideLoading();//关闭加载图标
          }
          
        }
      })
    });
  }