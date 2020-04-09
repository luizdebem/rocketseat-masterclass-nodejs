sconst os = require('os');
const log = require('./logger');
const { freemem, totalmem } = os;

setInterval(() => {
  const total = parseInt(totalmem() / 1024 / 1024);
  const mem = parseInt(freemem() / 1024 / 1024);
  const percents = parseInt((mem / total) * 100);

  const stats = {s
    free: `${mem} MB`,
    total: `${total} MB`,
    usage: `${percents}%`
  }
  console.clear();
  console.log('- - - MEMORY STATS - - -');
  console.table(stats);

  log(`${JSON.stringify(stats)} -> ${Date()}\n`);
}, 1000);