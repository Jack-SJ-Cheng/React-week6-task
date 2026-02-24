import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

const apiUrl = import.meta.env.VITE_API_BASE_URL;
const api_path = import.meta.env.VITE_API_PATH;

export default function Checkout() {

  const {register, handleSubmit, formState, reset} = useForm();
  const {errors} = formState;

  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  const getCart = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v2/api/${api_path}/cart`);
      console.log(res);
      setItems(res.data.data.carts);
      setTotal(res.data.data.total);
    } catch(error) {console.warn(error.response);}
  }

  useEffect(() => {
    getCart();
  },[])

  const toCheck = async (data) => {
    const send = {
      "data": {
        "user": {
          "name": data.name,
          "email": data.email,
          "tel": data.tel,
          "address": data.address
        },
        "message": data.message
      }
    }
    try {
      const res = await axios.post(`${apiUrl}/v2/api/${api_path}/order`, send)
      if(res.data.success) {
        reset();
        getCart();
        navigate("/complete");
      }
    } catch(error) {console.warn(error.response);}
  }


  return (
    <div className="container py-5" style={{ maxWidth: "1100px" }}>
      <div className="mb-4">
        <h2 className="mb-1">結帳</h2>
        <p className="text-secondary mb-0">填寫收件資訊並確認訂單內容。</p>
      </div>

      <div className="row g-4">

        <div className="col-7">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h4 className="mb-1">收件資訊</h4>
              <p className="text-secondary small mb-4"><span className="text-danger">*</span> 為必填欄位</p>

              <form id="checkoutForm" className="d-grid gap-3" onSubmit={handleSubmit(toCheck)}>
                <div>
                  <label htmlFor="name" className="form-label">
                    姓名 <span className="text-danger">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="form-control"
                    placeholder="例如：王小明"
                    {...register("name",{
                      required: "姓名是必填項目"
                    })}
                  />
                  {errors.name && <p className="form-text text-danger small"> {errors.name.message} </p>}
                </div>
                    
                <div>
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-danger">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="form-control"
                    placeholder="name@example.com"
                    {...register("email", {
                      required: "Email是必填項目",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Email 格式不正確"
                      }
                    })}
                  />
                  <div className="form-text">我們會將訂單確認資訊寄到此信箱。</div>
                  {errors.email && <p className="form-text text-danger small"> {errors.email.message} </p>}
                </div>

                <div>
                  <label htmlFor="phone" className="form-label">
                    電話 <span className="text-danger">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className="form-control"
                    placeholder="例如：0912345678"
                    {...register("tel", {
                      required: "電話是必填項目",
                      pattern: {
                        value: /^09\d{8}$/,
                        message: "電話格式必須為09開頭的10位數字"
                      }
                    })}
                  />
                  {errors.tel && <p className="form-text text-danger small"> {errors.tel.message} </p>}
                </div>

                <div>
                  <label htmlFor="address" className="form-label">
                    地址 <span className="text-danger">*</span>
                  </label>
                  <input
                    id="address"
                    type="text"
                    className="form-control"
                    placeholder="縣市 / 區 / 路名 / 號 / 樓"
                    {...register("address", {
                      required: "地址是必填項目"
                    })}
                  />
                  <div className="form-text">請填寫完整地址。</div>
                  {errors.address && <p className="form-text text-danger small"> {errors.address.message} </p>}
                </div>

                <div>
                  <label htmlFor="note" className="form-label">備註</label>
                  <textarea
                    id="note"
                    className="form-control"
                    rows="3"
                    placeholder="例如：管理室代收 / 門口放置 / 請先電話聯繫"
                    {...register("message")}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>


        <div className="col-5">
          <div className="card shadow-sm position-sticky" style={{ top: "88px" }}>
            <div className="card-body p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <h5 className="mb-0">訂單摘要</h5>
                <span className="badge text-bg-light">{items.length} 項</span>
              </div>

              {items.length === 0 ? (
                <p className="text-secondary mb-0">目前購物車是空的。</p>
              ) : (
                <ul className="list-group list-group-flush mb-3">
                  {items.map((item) => (
                    <li key={item.id} className="list-group-item px-0">
                      <div className="d-flex justify-content-between">
                        <div className="me-3">
                          <div className="fw-semibold">{item.product.title}</div>
                          <div className="text-secondary small">數量：{item.qty}</div>
                        </div>
                        <div className="text-end">
                          <div className="fw-semibold">$ {item.final_total}</div>
                          <div className="text-secondary small">$ {item.product.price} / 件</div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

                <hr className="my-2" />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>總計</span>
                  <span>$ {total}</span>
                </div>

              <div className="d-grid gap-2 mt-3">
                <button
                  className="btn btn-primary btn-lg"
                  type="submit"
                  form="checkoutForm"
                  disabled={items.length === 0}
                >
                  送出訂單
                </button>
                <Link className="btn btn-outline-secondary" type="button" to="/cart">
                  返回購物車
                </Link>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}