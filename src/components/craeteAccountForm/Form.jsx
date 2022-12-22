import React from 'react'
import { Button, Form, Input } from 'antd';
///styles
import './styles.scss'
const Accountform = () => {
  return (
    <>
        <div className="left-col-section">
            <p>General Information</p>
        <Form  layout="vertical" autoComplete="off">
        <Form.Item name="userName" label="User name: ">
          <Input placeholder='User name'/>
        </Form.Item>
        <Form.Item name="fullName" label="Full Name:">
          <Input placeholder='full Name"'/>
        </Form.Item>
        <Form.Item name="Password" label="Password:">
          <Input.Password placeholder='Password'/>
        </Form.Item>
        <Form.Item name="ConfirmPassword" label="Confirm Password:">
          <Input placeholder='Confirm Password'/>
        </Form.Item>
        <Form.Item name="City" label="City:">
          <Input placeholder='City'/>
        </Form.Item>
        <Form.Item name="MobileNumber" label="Mobile Number:">
          <Input placeholder='Mobile Number'/>
        </Form.Item>
        
        
      </Form>

        </div>
        <div className="right-col-section">
        <Form  layout="vertical" autoComplete="off">
        <Form.Item name="Credit Amount" label="Credit Amount:: ">
          <Input placeholder='Credit Amount'/>
        </Form.Item>
        <Form.Item name="User Type" label="User Type:">
          <Input placeholder='Select User Type'/>
        </Form.Item>
        <p>Partnership Information</p>
        <Form.Item name="Partnership With No Return" label="Partnership With No Return:">
          <Input placeholder='Partnership With No Return'/>
        </Form.Item>
        <Form.Item name="Remark" label="Remark:">
          <Input placeholder='Remark'/>
        </Form.Item>
        <Form.Item name="City" label="" >
          <Input placeholder='Transaction Code'/>
       
        </Form.Item>
        <Form.Item >
        <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
        </div>
    </>
  )
}

export default Accountform