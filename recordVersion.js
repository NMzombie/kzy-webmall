const fs = require('fs')
const path = require('path')
const task = require('./task')
let mode = process.argv[2] || 'pro'
if (mode === 'betadev') {
    mode = 'beta'
}

/**
 * 获取当前编译结果的文件列表
 * 递归遍历文件夹，记录完整文件路径
 * @param {string} dirPath 交付件文件夹路径
 */
function getCurrDistFileList (dirPath = './dist/static/') {
    let list = []
    const files = fs.readdirSync(dirPath)
    files.forEach(file => {
        const filePath = path.join(dirPath, file)
        if (fs.statSync(filePath).isFile()) {
            list.push(path.relative('./dist/', filePath))
        } else {
            list = list.concat(...getCurrDistFileList(filePath))
        }
    })
    return list
}

/**
 * 指定环境更新版本记录
 * 记录n个版本的所有文件名；去重保留n个版本用到的文件
 * @param {string} mode 环境
 */
function resetHistory (mode) {
    // 记录每个版本信息的文件
    const historyFath = `./.deploy/${mode}/history.js`
    // 不同环境对应不同文件夹
    const staticDir = `./.deploy/${mode}/`
    const staticDir2 = `./.deploy/${mode}/static`

    const preAllDist = require(historyFath)
    const currDist = getCurrDistFileList()
    const newAllDist = []

    preAllDist.push(currDist)

    const listLen = preAllDist.length
    const retainSet = new Set()
    for (let i = listLen - 1; i >= 0; i--) {
        const item = preAllDist[i]
        if (listLen - i <= task.maxHistoryNum) {
            // 指定版本数量内：保留
            // 记录用到了哪些文件，用于后续删除判断
            newAllDist.unshift(item)
            if (typeof item === 'string' || typeof item === 'number') {
                retainSet.add(item)
            } else if (Array.isArray(item)) {
                item.forEach(ii => {
                    retainSet.add(ii)
                })
            }
        } else {
            // 指定版本数量外：删除
            // 删除此版本中，在所有‘保留’版本未用到的文件
            // if (typeof item === 'string' || typeof item === 'number') {
            //   task.rmFiles(staticDir, new RegExp(item), true)
            // } else if (Array.isArray(item)) {
            //   item.forEach(ii => {
            //     if (!retainSet.has(ii)) {
            //       console.log(path.join(staticDir, ii))
            //       fs.unlinkSync(path.join(staticDir, ii))
            //     }
            //   })
            // }
        }
    }

    removeFiles(staticDir2, (filePath, name) => {
        const match = name.match(/^(\d{13})/)
        if (match && match[0]) {
            return !retainSet.has(Number(match[0])) && !retainSet.has(match[0])
        } else {
            return !retainSet.has(path.relative(staticDir, filePath))
        }
    })

    fs.writeFileSync(historyFath, `module.exports = ${JSON.stringify(newAllDist, undefined, 2)}`)
}

function removeFiles (dirPath, fn) {
    let files
    try {
        files = fs.readdirSync(dirPath, {
            withFileTypes: true
        })
    } catch (e) {
        return
    }

    if (fn && files && files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            const fileItem = files[i]
            let filename = fileItem.name
            let filePath = dirPath + '/' + filename
            const isFile = fileItem.isFile()
            const isDir = fileItem.isDirectory()
            if (isFile && fn(filePath, filename)) {
                fs.unlinkSync(filePath)
            } else if (isDir) {
                removeFiles(filePath, fn)
            }
        }
    }
}

resetHistory(mode)
