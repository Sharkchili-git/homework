const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const key = 'cookie'

// 1. 从后台获取 session(cookie)
// 2. 保存 cookie 到本地
// 3. 从本地获取cookie 以便携带去后台

function getSessionIdFromResponse(res) {
  var cookie = res.header['Set-Cookie']
  console.log('getSessionIdFromResponse:'+cookie)
  return cookie
}

function setCookieToStorage(cookie) {
  try{
    wx.setStorageSync(key,cookie)
  }catch(e){
    console.log(e)
  }
}

function getCookieFromStorage() {
  var value = wx.getStorageSync(key)
  return value
}
module.exports = {
  formatTime: formatTime,
  getSessionIdFromResponse: getSessionIdFromResponse,
  setCookieToStorage: setCookieToStorage,
  getCookieFromStorage: getCookieFromStorage
}