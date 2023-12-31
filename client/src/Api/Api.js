import { Axioss } from "../utils/axios";

export const Auth = async () => {
  try {
    const { data } = await Axioss.get("authlocal");
    if (data.error) {
      console.log("errot");
    }
    return data;
  } catch (error) {}
};
export const PrevUrlApi = async (pageNo) => {
  try {
    const { data } = await Axioss.get("/prevurl",{params:{pageNo}});
    if (data.error) {
      console.log("errot");
    }
    return data;
  } catch (error) {}
};
export const LoginApi = async (email, password) => {
  try {
    const { data } = await Axioss.post("/login", { email, password });
    if (data.error) {
      console.log("errot");
    }
    return data;
  } catch (error) {}
};
export const SignupApi = async (email, name, password) => {
  try {
    const { data } = await Axioss.post("/signup", { email, name, password });
    if (data.error) {
      console.log("errot");
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const URLApi = async (url) => {
  try {
    const { data } = await Axioss.post("/url", { url });
    if (data.error) {
      console.log("errot");
    }
    return data;
  } catch (error) {}
};

export const LogoutApi = async () => {
  try {
   
    const { data } = await Axioss.get("/logout");
   
    if (data.error) {
      console.log("errot");
    }
    return data;
  } catch (error) {}
};
