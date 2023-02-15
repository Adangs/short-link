//算法过程：
// 将长网址md5生成32位签名串,分为4段, 每段8个字节；
// 对这四段循环处理, 取8个字节, 将他看成16进制串与0x3fffffff(30位1)与操作, 即超过30位的忽略处理；
// 这30位分成6段, 每5位的数字作为字母表的索引取得特定字符, 依次进行获得6位字符串；
// 总的md5串可以获得4个6位串；取里面的任意一个就可作为这个长url的短url地址；
/**
 * 生成短链接key
 * @param {string} url 原始地址
 * @param {number} min 生成长度
 * */
const md5 = require('md5')

const useShortLinkKey = (url, min = 4) => {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const md5Url = md5(url || '')
  const keys = []
  let i
  let len = min || 4
  for(; i < len; i++){
    const subHex = md5Url.substr(i * 8, 8)
    const outChars = []
    let lHexLong = 0x3FFFFFFF & parseInt(subHex, 16)
    let j = 0;
    for(; j < len.size; j++){
      const index = 0x0000003D & lHexLong;
      outChars.push(chars.substr(index, 1));
      lHexLong = lHexLong >> 5
    }
    keys.push(outChars.join(''));
  }
  return keys.join('');
}

module.exports = useShortLinkKey
