import React from "react";
import { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

function RegLogin() {
  const [Redirect, setRedirect] = useState(false);
  //isSignup set to false kyuki pahele screen pe login page dikhega
  const [isSignUp, setisSignUp] = useState(false);
  //sare cheezen jo hame lagegi wo yaha par hum retrieve kar rhe hai front end se taaki backend me bhej sake
  const [input, setinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const submitform = async (event) => {
    //page reload na ho submission pe isliye event.preventDefault
    event.preventDefault();
    if (!isSignUp) {
      //means isSignUp =false toh login page hai
      if (input.email !== "" && input.password !== "") {
        //login page se sirf email aur password lenge taki check kar sake sahi hai ya nahi
        const inputdata = {
          name: input.name,
          email: input.email,
          password: input.password,
        };
        //backend-frontend connection code
        try {
          const response = await axios.post(
            "http://localhost:5000/login",
            inputdata,
            {
              withCredentials: true,
            }
          );
          if (response.status === 204 || response.status === 200) {
            setRedirect(true);
          } else {
            console.log("Invalid password");
            alert("Invalid password");
          }

          // if (Redirect) {
          //   return <Navigate to={"/demo"} />;
          // }
        } catch (error) {
          console.error(error);
          alert("Error logging in");
        }
      }
      //agar email ya password me se koi bhi field missing hai toh ye error aaega
      else {
        toast.error("Please fill the missing fields");
      }
    }
    //ye block of code ab signup ke liye
    else {
      if (input.name !== "" && input.email !== "" && input.password !== "") {
        //signup ka saara data backend me bhejna hai database me store karne ke liye isliye inputdata me sab le liya frontend se
        const inputdata = {
          name: input.name,
          email: input.email,
          password: input.password,
        };
        //to check data jaa rha hai ya nahi console.log karaya
        console.log(inputdata);

        //frontend-backend connection
        axios
          .post("http://localhost:5000/signup", inputdata)
          .then((res) => console.log(res));
        console.log(inputdata);
        //if connection successful, ie data gaya db me sahi se from signup page toh href se login page pe redirect ho jaaenge
        // window.location.href = "/login";
      } //end of if
      //else me error denge agar fname , email ya password me se koi bhi ek missing hai toh
      else {
        toast.error("Please fill the missing fields");
      }
    }
  }; //end of submit form
  {
    Redirect && <Navigate to={"/demo"} />;
  }
  const HandleChange = (event, data) => {
    //  event.preventDefault();
    setinput({ ...input, [data]: event.target.value });
  };

  return (
    <div>
      <form>
        {/*box bana diya */}
        <Box
          display="flex"
          flexDirection={"column"}
          maxWidth={400}
          alignItems="centre"
          justifyContent={"centre"}
          margin="auto"
          marginTop={5}
          padding={5}
          borderRadius={5}
          boxShadow={"5px 5px 10px #ccc"}
          sx={{
            ":hover": {
              boxShadow: "10px 10px 20px #ccc",
            },
          }}
        >
          {/*Login - SignUp toggle btn */}
          <Typography variant="h2" padding={3} textAlign="center">
            {isSignUp ? "SignUp" : "Login"}
          </Typography>
          {/* agar signUp page pe hai toh jo textboxes chahiye uske liye ye hai , ye textboxes sirf tab dikhenge jab signup page pe hai isliye &&(and operator use kiya hai) */}

          <TextField
            margin="normal"
            variant="outlined"
            type={"text"}
            placeholder="Name"
            onChange={(event) => HandleChange(event, "name")}
            value={input.name}
          />

          {/* {isSignUp && <PictureUploads onPictureUpload={handlePictureUpload} />} */}
          {/* Email textbox /  no (and statement(&&)) here cause email signup login dono pe rhega */}
          <TextField
            margin="normal"
            variant="outlined"
            type={"email"}
            placeholder="Email"
            onChange={(event) => HandleChange(event, "email")}
            value={input.email}
          />
          {/* Password textbox /  no (and statement(&&)) here cause email password login dono pe rhega */}
          <TextField
            margin="normal"
            variant="outlined"
            type={"password"}
            placeholder="Password"
            onChange={(event) => HandleChange(event, "password")}
            value={input.password}
          />
          <Button
            sx={{ marginTop: 3, borderRadius: 3 }}
            variant="contained"
            color="warning"
            onClick={submitform}
          >
            {isSignUp ? "SignUp" : "Login"}
          </Button>
          <Button
            onClick={() => setisSignUp(!isSignUp)}
            sx={{ marginTop: 3, borderRadius: 3 }}
          >
            {!isSignUp ? "Go To SignUp" : "Back to Login"}
          </Button>
        </Box>
        <ToastContainer />
      </form>
    </div>
  );
}

export default RegLogin;