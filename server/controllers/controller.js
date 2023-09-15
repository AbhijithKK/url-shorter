import { jwtSign, jwtVerify } from "../helpers/Jwt.js";
import { Sanitize, ShortUrl } from "../helpers/helpers.js";
import signUpModel from "../modules/signUp.js";
import bcrypt from "bcrypt";
import URLModel from "../modules/url.js";

export const SignUp = async (req, res) => {
  try {
    const name = await Sanitize(req.body.name);
    const email = await Sanitize(req.body.email);
    let password = await bcrypt.hash(req.body.password, 10);

    const data = await signUpModel.create({
      name: name,
      email: email,
      password: password,
    });
    if (data) {
      res.json({ success: true });
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ error: true });
  }
};
export const Login = async (req, res) => {
  try {
    const email = await Sanitize(req.body.email);
    let password = req.body.password;
    const data = await signUpModel.findOne({ email: email });
    if (data != null) {
      password = await bcrypt.compare(password, data.password);
      if (password == true) {
        let jwt = await jwtSign(data._id);
        res
          .cookies("user", jwt, { sameSite: "none", https: false })
          .json({ success: true });
      } else {
        res.json({ success: false });
      }
    }
  } catch (error) {
    res.json({ error: true });
  }
};
export const Auth = async (req, res) => {
  try {
    let value = false;
    const verify = await jwtVerify(req.cookie("user"));
    if (verify?.data) {
      const data = await signUpModel.findOne({ _id: verify?.data?.data });
      if (data !== null) {
        value = true;
      } else {
        value = false;
      }
    }
    res.json({ success: value });
  } catch (error) {
    res.json({ error: true });
  }
};
export const PostUrl = async (req, res) => {
  try {
    const { url } = req.body;
    const { newUrl, uid } = await ShortUrl(url);
    const verify = await jwtVerify(req.cookie("user"));
    if (verify?.data) {
      const data = await signUpModel.findOne({ _id: verify?.data });
      if (data !== null) {
        await URLModel.updateOne(
          { _id: verify.data?.data },
          {
            mainUrl: url,
            modifyedUrl: newUrl,
            urlId: uid,
          }
        );
        res.json({ newURL: newUrl });
      } else {
        res.json({ error: true });
      }
    }
  } catch (error) {
    res.json({ error: true });
  }
};

export const redirector = async (req, res) => {
  try {
    const id = req.params.req;
    let data = await URLModel.findOne({ urlId: id });
    if (data != null) {
      res.redirect(data.mainUrl);
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ error: true });
  }
};

export const LogOut = async (req, res) => {
  try {
    res.cookie("user", "");
  } catch (error) {
    res.json({ error: true });
  }
};
