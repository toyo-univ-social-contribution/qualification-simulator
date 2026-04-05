import https from 'https';
import fs from 'fs';

https.get('https://www.kinzai.or.jp/fp/nittei-fp/48581.html', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const text = data.replace(/<[^>]+>/g, '\n').replace(/\n+/g, '\n');
    fs.writeFileSync('kinzai.txt', text);
  });
});
