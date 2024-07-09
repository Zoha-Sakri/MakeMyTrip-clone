import "./new.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import axios from "axios";

const New = ({ inputs, title }) => {
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "upload");
    try {
      // Log the request payload to Cloudinary
      console.log("Uploading to Cloudinary with data:", data);
      const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dvfgrczsy/image/upload", data);
      // Log the response from Cloudinary
      console.log("Cloudinary response:", uploadRes.data);
      const { url } = uploadRes.data;

      const newUser = {
        ...info, img: url,
      };
      // Log the request payload to /auth/register
      console.log("Sending new user data to /auth/register:", newUser);
      const registerRes = await axios.post("/auth/register", newUser);
      // Log the response from /auth/register
      console.log("Response from /auth/register:", registerRes.data);
    } catch (err) {
      if (err.response) {
        console.log("Server responded with a status:", err.response.status);
        console.log("Data:", err.response.data);
      } else if (err.request) {
        console.log("No response received:", err.request);
      } else {
        console.log("Error setting up request:", err.message);
      }
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>

              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                    id={input.id}
                  />
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default New;
