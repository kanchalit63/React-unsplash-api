import { useState } from 'react';
import axios from 'axios'; // เรียกใช้ Axios
import './App.css';

function App() {
  const [value, setValue] = useState("");
  const [result, setResult] = useState([]);

  const searchImg = () => {
    axios.get(`https://api.unsplash.com/search/photos`, {
      params: {
        client_id: 'Hkm2ah_tE1HnHiu0HUOOHXjWXvfg4BpW1Eyg6BA0XkE',
        query: value,
        orientation: 'squarish',
      },
    })
      .then(response => {
        // เมื่อรับข้อมูลรูปภาพจาก API สามารถกำหนดค่า state result เพื่อเก็บข้อมูลรูปภาพ
        setResult(response.data.results);
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาดในการร้องขอ:', error);
      });
  }

  return (
    <div className='app'>
      <div className="mydiv">
        <span style={{fontSize : "25px"}}>Search : </span>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={() => searchImg()}>ค้นหา</button>
      </div>
      <div className="gallery">
        {result.map((item) => {
          return <img className='item' key={item.id} src={item.urls.regular} />;
        })}
      </div>
    </div>
  );
}

export default App;
