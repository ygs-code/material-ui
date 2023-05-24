import "client/assets/css/base.less";
import "./index.less";

import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  CssBaseline,
  Grid,
  Link,
  Paper,
  TextField,
  Typography
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import word from "client/assets/img/word2.png";
import { login } from "client/assets/js/request/index";
import FormItem from "client/component/FormItem";
import Message from "client/component/Message";
import VerificationCode from "client/component/VerificationCode";
import { mapRedux } from "client/redux";
import { addRouterApi } from "client/router";
import { checkEmail, checkPassword, checkPhone, checkUser } from "client/utils";
import { createForm } from "rc-form";
import React, { memo } from "react";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"版权所有 © "}
      <Link color="inherit"></Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

const Index = memo((props) => {
  const {
    pushRoute,
    routePaths,
    form,
    dispatch: {
      user: { setUserInfo }
    }
  } = props;

  const { validateFields } = form;

  const onFinish = async (values) => {
    const { data } = await login(values);

    const { token } = data;

    localStorage.setItem("token", token);

    setUserInfo(data);

    Message.success("登录成功");
    setTimeout(() => {
      pushRoute(routePaths.officeDocument);
    }, 1500);
  };

  const handleSubmit = async (event) => {
    validateFields((error, values) => {
      if (!error) {
        onFinish(values);
      } else {
        console.error(error);
      }
    });
    // const data = new FormData(event.currentTarget);

    event.preventDefault();
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${word})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: "rgb(249, 250, 255)",
            backgroundSize: "cover",
            // backgroundAttachment: "fixed",
            backgroundPosition: "center center"
            // zoom: "50%",
            // transform: "scale(0.5)" /* 缩放比例 */,
            // transformOrigin: "0 0" /* 缩放的原点 */

            // // 居中
            // background-position: center center;

            // /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
            // background-attachment: fixed;
            // background-size: cover;
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              登录
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1, width: "calc(100% - 70px)" }}>
              <FormItem
                className="padding-top-15"
                rules={[
                  {
                    required: true,
                    message: "请输入用户名或手机号或邮箱"
                  },
                  {
                    validator: (rule, value) => {
                      if (
                        checkUser(value) ||
                        checkPhone(value) ||
                        checkEmail(value)
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject("格式不正确请重新输入");
                    }
                  }
                ]}
                label="用户名/手机号/邮箱"
                form={form}
                // span={24}
                name="name">
                <TextField
                  required
                  fullWidth
                  placeholder="请输入用户名/手机号/邮箱"
                  variant="outlined"
                />
              </FormItem>

              <FormItem
                label="密码"
                name="password"
                className="padding-top-15"
                // span={24}
                rules={[
                  {
                    required: true,
                    message: "请输入密码"
                  },
                  {
                    validator: (rule, value) => {
                      if (!checkPassword(value)) {
                        return Promise.reject(
                          "密码最少为8位，并且最少含有字母和数字组成"
                        );
                      }
                      return Promise.resolve();
                    }
                  }
                ]}
                form={form}>
                <TextField
                  required
                  placeholder="请输入密码"
                  variant="outlined"
                  type="password"
                  fullWidth
                  autoComplete="current-password"
                />
              </FormItem>

              {/*验证码*/}

              <VerificationCode form={form} className="padding-top-15" />

              {/*
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                登录
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    忘记密码
                  </Link>
                </Grid>
                <Grid item>
                  <Link
                    href="#"
                    variant="body2"
                    onClick={(event) => {
                      pushRoute(routePaths.register);
                      event.preventDefault();
                    }}>
                    注册
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
});

export default mapRedux()(
  addRouterApi(
    createForm({
      name: "LogIn"
    })(Index)
  )
);
