'use client'
import { UploadOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Form, Input, message, Modal, Upload } from 'antd';
import { useEffect, useState } from 'react';
import {getLoginUser, updateMyUser} from "@/api/userController";
import {checkIn, getUserById1} from "@/api/scoreController";
import {uploadFileMinio} from "@/api/fileController";

const UserProfile = () => {
  const [form] = Form.useForm();
  const [isSignedIn, setSignedIn] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);

  const [userData, setUserData] = useState<API.BaseResponseLoginUserVO>();

  const [score, setScore] = useState<API.BaseResponseLong>();
  const [avatarUrl, setAvatarUrl] = useState<string>();

  const fetchData = async () => {
    try {
      const [userRes, scoreRes] = await Promise.all([

          getLoginUser(),
          getUserById1()
      ]);

      if (userRes.data) {
        setUserData(userRes);
      } else {
        message.error(userRes.message);
      }

      if (scoreRes.data) {
        setScore(scoreRes);
      } else {
        message.error(scoreRes.message);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  /**
   * 签到逻辑
   */
  const handleSignIn = async () => {
    // const res = await checkInUsingPost();
    const res = await checkIn();
    if (res.data === '签到成功') {
      setSignedIn(true);
      fetchData();
      message.success(res.data);
    } else {
      message.error(res.message);
      setSignedIn(false);
    }
  };

  const handleRecharge = () => {
    message.info('敬请期待');
  };

  const handleEditProfile = () => {
    setModalVisible(true);
    form.setFieldsValue({ userName: userData?.data?.userName });
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUserInfo: API.UserUpdateMyRequest = {
        userAvatar: avatarUrl,
        userName: form.getFieldValue('userName'),
      };
      // const updateUserInfo = await updateMyUserUsingPost(updatedUserInfo);
      const updateUserInfo = await updateMyUser(updatedUserInfo);

      if (updateUserInfo.data) {
        message.success('保存成功！');
        fetchData(); // 获取最新的用户信息和积分
        setModalVisible(false);
      } else {
        message.error(updateUserInfo.message);
      }
    } catch (e) {
       console.error(e);
    }
  };

  /**
   * 头像上传到阿里云对象存储服务中，返回对应的url地址
   * @param info
   */
  const handleAvatarChange = async (info) => {
    try {
      // const res = await uploadFileUsingPost(info);
      const res = await uploadFileMinio(info);
      if (res.data) {
        setAvatarUrl(res.data);

      }
    } catch (error) {
      console.error('Error in handleAvatarChange:', error);
    }
  };

  const uploadButton = (
    <div>
      <UploadOutlined />
      <div style={{ marginTop: 8 }}>上传</div>
    </div>
  );

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        paddingLeft: '20px',
        paddingTop: '20px',
      }}

    >
      <Card style={{  textAlign: 'center', padding: 20 }}>
        <Avatar size={80} src={userData?.data?.userAvatar} />
        <h2 style={{ fontSize: 24 }}>{userData?.data?.userName}</h2>
        <p style={{ fontSize: 18 }}>积分：{score?.data}</p>
        <Button
          type="primary"
          size="large"
          onClick={handleSignIn}
          disabled={isSignedIn}
          style={{ fontSize: 18 }}
        >
          {isSignedIn ? '已签到' : '签到'}
        </Button>

        <Button style={{ marginTop: 10, fontSize: 18 }} size="large" onClick={handleRecharge}>
          充值积分
        </Button>
        <Button style={{ marginTop: 10, fontSize: 18 }} size="large" onClick={handleEditProfile}>
          编辑个人信息
        </Button>
      </Card>

      <Modal
        title="编辑个人信息"
        visible={isModalVisible}
        onOk={handleSaveProfile}
        onCancel={() => setModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="昵称" name="userName">
            <Input />
          </Form.Item>
          <Form.Item label="头像">
            <Upload showUploadList={false} beforeUpload={() => false} onChange={handleAvatarChange}>
              {userData?.data?.userAvatar ? (
                <Avatar size={40} src={avatarUrl ? avatarUrl : userData?.data?.userAvatar} />
              ) : (
                uploadButton
              )}
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );

};

export default UserProfile;
