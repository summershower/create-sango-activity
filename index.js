#! /usr/bin/env node

const inquirer = require('inquirer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

inquirer.prompt([{
    type: 'input',
    name: 'projectName',
    message: '输入活动名称(驼峰英文命名)：',
    validate: function (input) {
        return /^[a-z]+([A-Z][a-z]+)*$/.test(input) || "活动名称只能为驼峰英文命名"
    }
}, {
    type: 'input',
    name: 'chineseName',
    message: '输入活动中文名：'
}, {
    type: 'input',
    name: 'isNeedRoomPlug',
    message: '是否需要房间插件 (Y/N)',
    validate: function (input) {
        return /^[yYnN]{1}$/.test(input) || "请输入y或n"
    }
}, {
    type: 'input',
    name: 'isNeedPinia',
    message: '是否需要Pinia (Y/N)',
    validate: function (input) {
        return /^[yYnN]{1}$/.test(input) || "请输入y或n"
    }
}, {
    type: 'input',
    name: 'isNeedHalfMode',
    message: '是否需要半屏模式 (Y/N)',
    validate: function (input) {
        return /^[yYnN]{1}$/.test(input) || "请输入y或n"
    }
},
{
    type: 'input',
    name: 'isNeedRank',
    message: '是否需要排行榜模版 (Y/N)',
    validate: function (input) {
        return /^[yYnN]{1}$/.test(input) || "请输入y或n"
    }
}
]).then(answer => {
    const templateDir = path.join(__dirname, 'template');
    const templateActivityFileDir = path.join(__dirname, 'template', 'activity');
    const targetPageDir = path.join(process.cwd(), 'src', 'pages', answer.projectName);
    const targetRouterDir = path.join(process.cwd(), 'src', 'routes', 'maps');
    const targetLangDir = path.join(process.cwd(), 'src', 'lang', 'modules');
    const targetLangTitleDir = path.join(process.cwd(), 'src', 'lang', 'modules', 'pageTitle.js');

    answer.lineName = answer.projectName.replace(/([A-Z])/g, "-$&").toLocaleLowerCase(); // 驼峰命名转斜杠命名

    // 拷贝文件函数
    function copyFile(originDir, originFileName, targetDir, targetFileName) {
        // 创建目标文件夹
        fs.mkdirSync(targetDir, { recursive: true }, (err) => {
            if (err) throw err
        })
        ejs.renderFile(path.join(originDir, originFileName), answer, (error, result) => {
            if (error) throw error
            fs.writeFileSync(path.join(targetDir, targetFileName), result)
        })
    }
    // 拷贝文件夹函数
    function copyDir(originDir, targetDir, ignoreFiles = []) {
        // 创建目标主体文件夹
        fs.mkdirSync(targetDir, { recursive: true }, (err) => {
            if (err) throw err
        })
        // 遍历目录
        fs.readdir(originDir, ((err, files) => {
            if (err) throw err
            // 去除忽略的文件
            files = files.filter(v => !ignoreFiles.includes(v));
            files.forEach(file => {
                if (file.startsWith('.')) return; // 跳过隐藏文件
                // 判定是否文件夹
                fs.stat(path.join(originDir, file), (err, stats) => {
                    if (stats.isDirectory()) {
                        // 判定为文件夹, 递归继续遍历
                        copyDir(path.join(originDir, file), path.join(targetDir, file))
                    } else {
                        // 判定为文件
                        copyFile(originDir, file, targetDir, file);
                    }
                })
            })
        }))
    }
    copyFile(templateDir, 'route.ts', targetRouterDir, answer.projectName + '.route.ts'); // 拷贝路由
    copyFile(templateDir, 'lang.js', targetLangDir, answer.projectName + '.js'); // 拷贝多语言文件
    // 追加窗口标题翻译文件
    fs.readFile(targetLangTitleDir, 'utf-8', ((err, file) => {
        if (!err) {
            const res = file.replaceAll('};', `\t${answer.projectName}: '${answer.chineseName}',\n};`)
            fs.writeFileSync(targetLangTitleDir, res)
        }
    }))
    const ignoreFiles = [];
    if (answer.isNeedPinia.toLocaleLowerCase() !== 'y') ignoreFiles.push('store.ts');
    if (answer.isNeedRoomPlug.toLocaleLowerCase() !== 'y') ignoreFiles.push('roomPlug.vue');
    if (answer.isNeedRank.toLocaleLowerCase() !== 'y') ignoreFiles.push('Components');
    copyDir(templateActivityFileDir, targetPageDir, ignoreFiles);
    console.log('创建成功');
})