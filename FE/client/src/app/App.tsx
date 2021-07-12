import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        'http://localhost:5000/covidDatas',
      );
      console.log(result)
  
      // setData(result.data);
    };
  
    fetchData();
  }, []);
  
  return (
    <div className="App">
      <div className="h-screen bg-gray-900 flex flex-col justify-center items-center">
        <img src="https://cdn1-production-images-kly.akamaized.net/LHelJHER0h5PfaguFhXAUl1zbRs=/640x640/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/1925846/original/091185800_1519304964-fzdfvgdzxf.jpg" alt="" 
        className="w-60 h-60"
        />
        <p className="font-bold text-xl text-white">Simpanse Developer</p>
      </div>
    </div>
  );
}

export default App;
