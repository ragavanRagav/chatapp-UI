import axios from "axios";
const url = "http://localhost:8080";

const login = async (email) => {
  try {
        const res = await axios
            .post(`${url}/login`, {
                "email": email,
            }
            );
        return res.data;
    } catch (err) {
        console.error("error ->", err);
    }
};
const getMessages = async (email) => {
  try {
        const res = await axios
            .post(`${url}/getMessages`, {
                "email": email,
            }
            );
        return res.data;
    } catch (err) {
        console.error("error ->", err);
    }
};
const getAllVideos = async (email) => {
  try {
        const res = await axios
            .post(`${url}/allvideos`, {
                "email": email,
            }
            );
        return res.data;
    } catch (err) {
        console.error("error ->", err);
    }
};

const uploadVideo=async(data,user)=>{
    try {
        const formdata = new FormData();
        formdata.append('file', data);
        formdata.append('user', user);
        const res = await axios
            .post(`${url}/videoUpload`,formdata,{
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }
        );
        return res?.data;
    } catch (err) {
        console.error("error ->", err);
    }
}
export { login,getMessages,uploadVideo,getAllVideos };