const { toDate } = require("date-fns");

const startUpLogger = () => {
  
  const today = String(toDate(Date.now())).substring(0, 25);
  console.log("###################################");
  console.log(`#          ${String(process.env.NODE_ENV).toUpperCase()}            #`);
  console.log("#                                 #");
  console.log(`#    ${today}    #`);
  console.log("#     powered by                  #");
  console.log("#                SHAN OS          #");
  console.log("#                                 #");
  console.log("###################################");
};

module.exports = startUpLogger;
