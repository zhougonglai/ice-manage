import React, { useState, useEffect } from 'react';
import { Input, Message, Form, Divider, Checkbox, Icon } from '@alifd/next';
import { useRequest, useHistory, store } from 'ice';
import authService from '@/services/auth';
import md5 from 'md5-js';

import { useInterval } from './utils';
import 'tailwindcss/dist/tailwind.min.css';
import styles from './index.module.scss';

const { Item } = Form;
const DEFAULT_DATA = {
  name: '',
  captcha: '',
  password: '',
  autoLogin: true,
};

const LoginBlock = (props) => {
  const { dataSource = DEFAULT_DATA } = props;
  const [postData, setValue] = useState(dataSource);
  const [isRunning, checkRunning] = useState(false);
  const [second, setSecond] = useState(59);
  const { data: captchaData, request: captchaRequest } = useRequest(
    authService.captcha
  );
  const [userState, userDispatchers] = store.useModel('user');
  const history = useHistory();

  useInterval(
    () => {
      setSecond(second - 1);

      if (second <= 0) {
        checkRunning(false);
        setSecond(59);
      }
    },
    isRunning ? 1000 : null
  );

  useEffect(() => {
    captchaRequest({ height: 38 });
  }, []);

  const formChange = (values) => {
    setValue(values);
  };

  const sendCode = (values, errors) => {
    if (errors) {
      return;
    } // get values.phone

    checkRunning(true);
  };

  const handleSubmit = async (values, errors) => {
    if (errors) {
      console.log('errors', errors);
      return;
    }

    const { code, msg } = await userDispatchers.login({
      ...values,
      captcha_key: captchaData.data.captcha_key,
      password: md5(values.password),
    });
    if (code) {
      captchaRequest({ height: 38 });
      Message.error(msg);
    } else {
      Message.success('登录成功');
      history.push('/');
    }
  };

  const accountForm = (
    <>
      <Item required requiredMessage="必填">
        <Input name="name" maxLength={20} placeholder="用户名" />
      </Item>
      <Item required requiredMessage="必填">
        <Input
          name="captcha"
          maxLength={4}
          placeholder="图形验证码"
          innerAfter={
            captchaData && (
              <img
                className="max-w-none"
                onClick={() => captchaRequest({ height: 38 })}
                src={captchaData.data.img}
                alt="验证码"
              />
            )
          }
        />
      </Item>
      <Item
        required
        requiredMessage="必填"
        style={{
          marginBottom: 0,
        }}
      >
        <Input.Password
          name="password"
          htmlType="password"
          placeholder="密码"
        />
      </Item>
    </>
  );

  return (
    <div className={styles.LoginBlock}>
      <div className={styles.innerBlock}>
        <a href="#">
          <img
            className={styles.logo}
            src="https://jiasu.nn.com/img/logo.png"
            alt="logo"
          />
        </a>
        <div className={styles.desc}>
          <span className={styles.active}>账户密码登录</span>
        </div>

        <Form value={postData} onChange={formChange} size="large">
          {accountForm}

          <div className={styles.infoLine}>
            <Item
              style={{
                marginBottom: 0,
              }}
            >
              <Checkbox name="autoLogin" className={styles.infoLeft}>
                自动登录
              </Checkbox>
            </Item>
          </div>

          <Item
            style={{
              marginBottom: 10,
            }}
          >
            <Form.Submit
              type="primary"
              onClick={handleSubmit}
              className={styles.submitBtn}
              validate
            >
              登录
            </Form.Submit>
          </Item>
        </Form>
      </div>
    </div>
  );
};

export default LoginBlock;
