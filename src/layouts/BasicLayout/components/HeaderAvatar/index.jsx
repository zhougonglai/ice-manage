import React from 'react';
import { Avatar, Overlay, Menu, Icon } from '@alifd/next';
import { useHistory } from 'ice';
import styles from './index.module.scss';

const { Item } = Menu;
const { Popup } = Overlay;

const UserProfile = ({ name, avatar, mail }) => (
  <div className={styles.profile}>
    <div className={styles.avatar}>
      <Avatar src={avatar} alt="用户头像" />
    </div>
    <div className={styles.content}>
      <h4>{name}</h4>
      <span>{mail}</span>
    </div>
  </div>
);

const HeaderAvatar = (props) => {
  const history = useHistory();
  const logout = () => {
    history.push('/user/login');
  };
  const { name, avatar } = props;
  return (
    <Popup
      trigger={
        <div className={styles.headerAvatar}>
          <Avatar size="small" src={avatar} alt="用户头像" />
          <span
            style={{
              marginLeft: 10,
            }}
          >
            {name}
          </span>
        </div>
      }
      triggerType="click"
    >
      <div className={styles.avatarPopup}>
        <UserProfile {...props} />
        <Menu className={styles.menu}>
          <Item>
            <Icon size="small" type="account" />
            个人设置
          </Item>
          <Item>
            <Icon size="small" type="set" />
            系统设置
          </Item>
          <Item onClick={logout}>
            <Icon size="small" type="exit" />
            退出
          </Item>
        </Menu>
      </div>
    </Popup>
  );
};

HeaderAvatar.defaultProps = {
  name: 'MyName',
  mail: 'name@gmail.com',
  avatar: 'http://dev-admin.leigod.com/static/avatar.png',
};

export default HeaderAvatar;
