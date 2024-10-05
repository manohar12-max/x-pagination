import { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
export default function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    async function fetchData() {
      try {
        let res = await axios.get(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        if (res.status == 200) {
          setData(res.data);
        }
      } catch (e) {
         alert("failed to fetch data");
        console.error("Error fetching data:", e);
      }
    }

    fetchData();
  }, []);
  const handlePage = (page) => {
    if (page != 0 && page * 10 <= Math.ceil(data.length / 10) * 10) {
      setPage(page);
    }
  };
  return (
    <div className="App">
      <h1>Employee Data Table</h1>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th>email</th>
            <th>role</th>
          </tr>
        </thead>
        <tbody>
          {data.slice((page - 1) * 10, page * 10).map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button
          onClick={() => {
            handlePage(page - 1);
          }}
        >
          Previous
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            handlePage(page + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
}
