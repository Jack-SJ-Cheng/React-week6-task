import axios from "axios";
import { useEffect, useState } from "react"
import { useNavigate } from "react-router";


const apiUrl = import.meta.env.VITE_API_BASE_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function Cart() {

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${apiUrl}/v2/api/${api_path}/cart`);
        console.log(res);
        setItems(res.data.data.carts);
        setTotal(res.data.data.total);
      } catch(error) {console.warn(error.response);}
    })()
  },[])

  return (
    <>
      <div className="container mt-5">
        <div className="d-flex justify-content-center mb-4">
          <h3 className="h3">購物車</h3>
        </div>
        <table className="table align-middle">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">商品名稱</th>
              <th scope="col">單價</th>
              <th scope="col">數量</th>
              <th scope="col">小計</th>
              <th scope="col">操作</th>
            </tr>
          </thead>
          <tbody>
            {
              items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.product.title}</td>
                    <td>{item.product.price}</td>
                    <td>
                      {item.qty}
                    </td>
                    <td>{item.final_total}</td>
                    <td>
                      <button className="btn btn-sm text-light btn-danger">刪除</button>
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5} className="text-end">
                總計：{total}
              </td>
              <td>
                <button tabIndex={-1} className={`btn btn-sm btn-primary ${items.length ? "" : "disabled"}`} onClick={() => {
                  if(!items.length) return
                  navigate("/checkout");
                }}>前往結帳</button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}