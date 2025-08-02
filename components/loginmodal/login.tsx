import React, { useState } from 'react';
import { signIn } from "next-auth/react"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ReCAPTCHA from "react-google-recaptcha";
import loginModalStyles from './modalStyles';
import { Button, Divider, IconButton, TextField } from '@mui/material';

import { toast } from 'react-toastify';

interface MyComponentProps {
  open: boolean;
  handleClose: Function;
}



function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const Login: React.FC<MyComponentProps> = ({ handleClose, open }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    organization: ''
  });
  const [errors, setErrors] = useState<any>({});
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };


  const onHandleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors: any) => ({ ...prevErrors, [name]: '' }));
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    const validationErrors = validateLoginForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("LOGIN...");
    try {
      setLoading(true);
      const email = formData.email;
      const password = formData.password;

      const result = await signIn("credentials", {
        redirect: false,
        email,
        password
      });
      console.log("RESULT:", result);
      if (result)
        if (result.ok) {
          toast.success("Login  successfully");
          handleClose();
        } else {
          toast.error(result?.error || "Something went wrong");
        }

      setLoading(false);
    } catch (e) {
      console.error("Error connecting to the server.", e);
      toast.error("Server error");

    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const data = { ...formData, recaptchaToken };
      const response = await fetch(`${process.env.API}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (response.ok) {
        toast.success(result.msg);
        handleClose();
      } else {
        toast.error(result?.err || "Something went wrong");
      }

      setLoading(false);
    } catch (e) {
      console.error("Error connecting to the server.", e);
      toast.error("Server error");

    } finally {
      setLoading(false);
    }


  };

  const validateForm = () => {
    let errors: any = {};
    if (!formData.password.trim()) {
      errors.name = 'Password is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (activeTab === 1 && !formData.organization.trim())
      errors.organization = 'Password is required.';
    if (activeTab === 1 && !formData.name.trim())
      errors.name = 'Password is required.';
    if (activeTab === 1 && !recaptchaToken)
      errors.recaptcha = 'Complete the recaptcha.';
    return errors;
  };

  const validateLoginForm = () => {
    let errors: any = {};
    if (!formData.password.trim()) {
      errors.name = 'Password is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Invalid email format';
    }


    return errors;
  }

  return (
    <div>
      <Modal
        open={open}
        onClose={() => handleClose()}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={loginModalStyles.modalBox}>
          <Box
            sx={loginModalStyles.modalHeader}>
            <Typography
              variant='h6'
              sx={{
                color: "#000"
              }}>
              Please Login to continue
            </Typography>
            <IconButton>
              <CloseIcon onClick={() => handleClose()} />
            </IconButton>

          </Box>
          <Tabs
            value={activeTab}
            onChange={handleChange}
            aria-label="basic tabs example"
            centered
            sx={loginModalStyles.tabs}
          >
            <Tab label="Sign In" {...a11yProps(0)} />
            <Tab label="Sign Up" {...a11yProps(1)} />
          </Tabs>
          <form onSubmit={e => {
            e.preventDefault();
            activeTab === 1 ?
              handleSubmit(e) :
              handleLogin(e);
          }}>
            {
              activeTab === 1 &&
              <TextField
                fullWidth
                onChange={onHandleChange}
                label="name"
                name='name'
                value={formData.name}
                margin='normal'
                error={!!errors.name}
                helperText={errors.name}
              />


            }
            <TextField
              fullWidth
              onChange={onHandleChange}
              label="E-mail"
              name='email'
              value={formData.email}
              margin='normal'
              error={!!errors.email}
              helperText={errors.email}
            />

            <TextField
              type='password'
              fullWidth
              onChange={onHandleChange}
              label="password"
              name='password'
              value={formData.password}
              margin='normal'
              error={!!errors.password}
              helperText={errors.password}
            />
            {
              activeTab === 1 && (
                <TextField
                  type='text'
                  fullWidth
                  onChange={onHandleChange}
                  label="organization"
                  name='organization'
                  value={formData.organization}
                  margin='normal'
                  error={!!errors.organization}
                  helperText={errors.organization}
                />
              )
            }
            {
              activeTab === 1 && (
                <ReCAPTCHA
                  sitekey={process.env.CLIENT_SIDE!}
                  onChange={setRecaptchaToken}
                />
              )
            }
            {
              activeTab === 1 && errors.recaptcha && (
                <p style={{ color: "red" }} >{errors.recaptcha}</p>
              )
            }
            <Button
              fullWidth
              variant='contained'
              type='submit'
              sx={loginModalStyles.button}
              disabled={loading}
            >{
                loading ?
                  activeTab === 0 ?
                    "Signing In..." :
                    "Signing Up..." :
                  activeTab === 0 ?
                    "Sign In" :
                    "Sign Up"
              }</Button>
          </form>
          <Divider sx={{ my: 2 }} >or</Divider>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }} >
            <Button
              variant='outlined'
              startIcon={<GoogleIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{
                marginRight: "8px",
                backgroundColor: "red"
              }}
              onClick={() => signIn("google")}
            >
              Login with google
            </Button>
            <Button
              variant='outlined'
              startIcon={<FacebookIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{
                marginRight: "8px",
                backgroundColor: "#3b5998"
              }}
              onClick={() => signIn("facebook")}
            >
              Login with Facebook
            </Button>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1 }} >
            <Button
              variant='outlined'
              startIcon={<LinkedInIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{
                marginRight: "8px",
                backgroundColor: "#445c8f"
              }}
              onClick={() => signIn("linkedin")}
            >
              Login with LinkedIn
            </Button>
            <Button
              variant='outlined'
              startIcon={<GitHubIcon />}
              sx={{ textTransform: "none", color: "#fff" }}
              fullWidth
              style={{
                marginRight: "8px",
                backgroundColor: "black"
              }}
              onClick={() => signIn("github")}
            >
              Login with GitHub
            </Button>
          </Box>
          <Typography
            variant='body2'
            align='center'
            sx={{
              mt: 1,
              color: "black",
              fontSize: 14
            }}
          >
            By creating this account, you agree to our privacy policy & Cookie
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Login