import CommonButton from '../../../shared/components/CommonButton';
import { IoIosAdd } from 'react-icons/io';
import { Colors } from '../../../constants/Colors';
import CommonTextInput from '../../../shared/components/CommonTextInput';
import React from 'react';
import CommonMessage from '../../../shared/components/CommonMessage';

function HomePage() {
  const [text, setText] = React.useState("");
  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main landing page of the application.</p>
      <CommonButton
        title='Click'
        onClick={() => alert("Clicked!")}
        Icon={IoIosAdd}
        bordered
        backgroundColor= {Colors.background}
      />
      <CommonTextInput 
        placeholder="Enter text here..."
        value={text}
        onChangeText={(e) => setText(e.target.value)}
        Icon={IoIosAdd}
      />
            {/* Thông báo lỗi */}
      <CommonMessage 
        type="error" 
        message="Có lỗi xảy ra, vui lòng thử lại." 
      />

      {/* Thông báo thành công */}
      <CommonMessage 
        type="success" 
        message="Thao tác thành công!" 
      />

      {/* Thông báo cảnh báo */}
      <CommonMessage 
        type="warning" 
        message="Hãy kiểm tra lại dữ liệu nhập." 
      />

      {/* Thông báo thông tin */}
      <CommonMessage 
        type="info" 
        message="Đây là thông tin thêm cho bạn." 
      />

      {/* Ẩn thông báo */}
      <CommonMessage 
        type="error" 
        message="Thông báo này sẽ không hiển thị." 
        visible={false} 
      />
    </div>
  );
}

export default HomePage;