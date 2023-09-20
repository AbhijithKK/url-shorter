import { OAuth2Client } from "google-auth-library";
import signUpModel from "../modules/signUp.js";
import { jwtSign } from "../helpers/Jwt.js";

export const Gauth = (req, res) => {
  const oAuth2Client = new OAuth2Client(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRECT,
    process.env.GOOGLE_REDIRECT_URL
  );
  const scopes = [
    "https://www.googleapis.com/auth/userinfo.email",
    "openid",
    "https://www.googleapis.com/auth/userinfo.profile openid",
  ];

  const authrizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent",
  });
  res.json({ url: authrizeUrl });
};

export const RedirectUrl = async (req, res) => {
  try {
    const code = req.query.code;
    const oAuth2Client = new OAuth2Client(
      process.env.GOOGLE_ID,
      process.env.GOOGLE_SECRECT,
      process.env.GOOGLE_REDIRECT_URL
    );
    const resp = await oAuth2Client.getToken(code);
    await oAuth2Client.setCredentials(resp.tokens);
    const user = oAuth2Client.credentials;


    const resps = await fetch(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${user.access_token}`
      );
      const data = await resps.json();
      console.log("userdata", data);
      

      const users=await signUpModel.findOne({email:data?.email})
      if (users!==null&&data?.sub==users?.gId) {
          const jwtsigns=await jwtSign(users._id)
         
          res.cookie('user', jwtsigns, {
            sameSite: "None",
            secure: true,
            httpOnly: false,
            maxAge: 100000,
          });
          res.redirect(`${process.env.BASE_URL}/home`);
}else{
  await signUpModel.create({
        name: data.name,
        email: data.email,
        password: data.sub,
        gId:data.sub
      });
      console.log('created');
    res.redirect(`${process.env.BASE_URL}`)
}
   
  } catch (err) {
    console.log("error singn in with google");
  }
};



// sub,name,email
