import { jwtSign, jwtVerify } from "../helpers/Jwt.js";
import { Pagination, Sanitize, ShortUrl } from "../helpers/helpers.js";
import signUpModel from "../modules/signUp.js";
import bcrypt from "bcrypt";
import URLModel from "../modules/url.js";

export const SignUp = async (req, res) => {
  try {
    console.log(req.body);
    const name = Sanitize(req.body.name);
    const email = Sanitize(req.body.email);
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
          ?.cookie("user", jwt, {
            sameSite: "None",
            httpOnly: false,
            secure: true,
            maxAge: 10000000,
          })
          .json({ success: true });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ error: true });
  }
};
export const Auth = async (req, res) => {
  try {
    let value = false;
    const verify = await jwtVerify(req.cookies.user);
    if (verify?.data) {
      const data = await signUpModel.findOne({ _id: verify?.data });
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
    console.log(url);
    const { newUrl, uid } = await ShortUrl(url);
    console.log(newUrl);

    const verify = await jwtVerify(req.cookies.user);
    if (verify?.data) {
      const data = await signUpModel.findOne({ _id: verify?.data });
      if (data !== null) {
        await URLModel.create({
          mainUrl: url,
          modifyedUrl: newUrl,
          urlId: uid,
          userId: verify?.data,
        });
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
    const id = req.params.id;
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
export const PrevUrl = async (req, res) => {
  try {
    const verify = await jwtVerify(req.cookies.user);
    const count = await URLModel.count({ userId: verify?.data });
    let { skip, limit, pages } = await Pagination(req.query.pageNo, count, 3);
    if (verify?.data) {
      const data = await signUpModel.findOne({ _id: verify?.data });
      if (data !== null) {
        const data = await URLModel.find({ userId: verify?.data })
          .skip(skip)
          .limit(limit)
          .sort({ _id: -1 })
          .exec();
        res.json({ data: data, pages: pages });
      } else {
        res.json({ success: false });
      }
    } else {
      res.json({ success: false });
    }
  } catch (error) {
    res.json({ error: true });
  }
};
export const LogOut = async (req, res) => {
  try {
    res.cookie("user", "").json({ success: true });
  } catch (error) {
    res.json({ error: true });
  }
};
