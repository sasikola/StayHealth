import axios from 'axios';
import  { useEffect } from 'react'
import Layout from '../components/Layout';

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
    <Layout/>
    </>
  )
}

export default Home