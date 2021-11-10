const jwt = require("../module/jwt");

exports.jwtMiddle =  async (ctx, next) => {
    const token  =ctx.cookies.get('loginToken');
    if(!token) return next(); // 토큰이 없으면 바로 다음 작업을 진행합니다.

        const decode = jwt.verify(token);
        const now = Math.floor(Date.now/ 1000);
        if(decode.iat - now < 60*60*3){
            try{
                const jwtToken =  await jwt.sign(data);
                ctx.cookies.set('loginToken', jwtToken, {maxAge:1000*60*60*7, httpOnly: true});
            }catch(error){
                console.log("jwt create error because " + error);
            }
        }

        return next();
    
};