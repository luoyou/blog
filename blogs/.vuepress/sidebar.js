const fs = require('fs')
const path = require('path')

console.log('USE NODE_ENV:', process.env.NODE_ENV)

/**
 * 获取目录下所有 Markdown 文件
 * @param {String} src 路径字符串
 * @param {String} prefix 给返回值添加前缀
 * @todo 按照时间排序
 */
const getSRCs = (src, prefix = '') => {
  const filenames = []
  const fileTypes = /\.md$/
  const mainFiles = ['index.md', 'README.md']
  try {
    fs.readdirSync(src).forEach(file => {
      if (fileTypes.test(file) > 0) {
        if (!mainFiles.includes(file)) {
          filenames.push(file.replace('.md', ''))
        }
      }
    })
  } catch (err) {
    // 在 Build 时会碰到这个莫名奇妙的错误，
    // 和 __dirname node 执行路径有关，
    // 可以不用管
    console.error('Error in getSRCs : ', err)
  }
  filenames.sort()
  return filenames.map(x => prefix + x)
}

const sidebars = [
  {
    title: '沧海拾遗 / From World',
    label: '心流思绪',
    collapsable: true,
    open: false,
    path: '/flow/',
    children: getSRCs(path.join(__dirname, '../flow'), 'flow/')
  },
  {
    title: 'php',
    label: 'php',
    collapsable: true,
    open: true,
    path: '/php/',
    children: getSRCs(path.join(__dirname, '../php'), 'php/')
  },
  {
    title: 'Secrets',
    collapsable: true,
    open: true,
    path: '/php/',
    children: getSRCs(path.join(__dirname, '../php'), 'php/'),
  },
]
console.log(sidebars)

module.exports = {
  getSidebar() {
    return sidebars
  },
  getRecommends() {
    return {
      心流: {
        url: '/flows/long-night-dream.html',
        label: '长夜梦',
      },
      技术: {
        url: '/articles/css-parser.html',
        label: 'Mini CSS Parser',
      },
    }
  }
}
