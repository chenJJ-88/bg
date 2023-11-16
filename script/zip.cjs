const fs = require('fs')
const path = require('path')
const archiver = require('archiver')

const output = fs.createWriteStream(path.join(__dirname, '../dist.zip'))

const archive = archiver('zip', { zlib: { level: 9 } })

const rmDirFun = (data, code) => {
  data.forEach((file) => {
    const filePath = path.join(code, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      const subFiles = fs.readdirSync(filePath);
      rmDirFun(subFiles, filePath);
    } else {
      fs.unlinkSync(filePath);
    }

  });
  fs.rmdirSync(code);
  console.log('dist 包已删除');
};
output.on('close', () => {
  console.log(archive.pointer() + ' total bytes');
  console.log('Archiver已完成，输出文件描述符已关闭。');
  console.log('压缩zip完成');


  // 在压缩完成后删除目录
  const distFiles = fs.readdirSync(path.join(__dirname, '../dist'));
  rmDirFun(distFiles, path.join(__dirname, '../dist'));
})

output.on('end', () => {
  console.log('数据压缩完成');
})

output.on('warning', (err) => {
  if (err === 'ENOENT') {
    console.warn('失败，请重试:yarn zip', err);
  } else {
    throw err
  }
})

output.on('error', (err) => {
  throw err
})

// 添加 yarn build 的输出到压缩文件中
archive.directory('dist/', 'dist');
console.log('压缩zip开始');
archive.pipe(output);
// 完成压缩
archive.finalize();
