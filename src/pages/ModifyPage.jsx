import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState, useRef } from "react";
import api from "../api/axiosInstance";

function ModifyPage() {
  const navigate = useNavigate();
  const { produceId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const formTopRef = useRef(null);
  const [fileName, setFileName] = useState("첨부파일");

  const handleFileChange = (e) => {
    if (formTopRef.current) {
      formTopRef.current.scrollIntoView({ behavior: "auto" });
    }
    if (e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName("첨부파일");
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 상품 데이터 불러오기
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/produces/${produceId}`);
        setProduct(response.data);
        console.log(response.data);
        reset({
          title: response.data.title,
          origin: response.data.origin,
          harvestDate: response.data.harvestDate,
          weight: response.data.weight,
          description: response.data.description,
          category: response.data.category, // ✅ 수정
        });
      } catch (error) {
        alert("상품을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [produceId, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }

      const requestBody = {
        price: data.price,
        title: data.title,
        description: data.description,
        origin: data.origin,
        harvestDate: data.harvestDate,
        category: data.category,
        images: data.images[0].name,
        weight: String(data.weight),
      }; // ✅ 수정

      console.log(requestBody);

      formData.append(
        "request",
        new Blob([JSON.stringify(requestBody)], {
          type: "application/json",
        })
      );

      await api.put(`/produce/${produceId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("수정이 완료되었습니다!");
      navigate(-1);
    } catch (err) {
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>불러오는 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div className="login-page">
      <div className="inputForm-pg">
        <div className="inputForm-tisub ">
          <h2 className="inputForm-title">농작물 정보 수정</h2>
          <p className="inputForm-sub">선택된 농작물의 정보를 수정하세요</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="inputForm-Frame">
            <div className="inputForm-left">
              <div>
                <label>
                  <p className="inputForm-field-title">농작물 이름</p>
                </label>
                <input
                  {...register("title", {
                    required: "농작물 이름을 입력해주세요",
                  })}
                />
                {errors.title && <p>{errors.title.message}</p>}
              </div>

              <div>
                <label>
                  <p className="inputForm-field-title">생산지</p>
                </label>
                <input
                  {...register("origin", { required: "생산지를 입력해주세요" })}
                />
                {errors.origin && (
                  <p className="err-text">{errors.origin.message}</p>
                )}
              </div>

              <div>
                <label>
                  <p className="inputForm-field-title">이미지</p>
                </label>
                <div className="filebox">
                  <input
                    className={`upload-name ${
                      errors.images ? "input-error" : ""
                    }`}
                    value={fileName}
                    placeholder="이미지를 업로드해 주세요."
                    readOnly
                  />
                  <label htmlFor="file">
                    <p>파일 선택</p>
                  </label>
                  <input
                    type="file"
                    id="file"
                    accept="image/*"
                    {...register("images", {
                      required: "이미지를 첨부해주세요",
                      onChange: handleFileChange,
                    })}
                  />
                </div>
                <label>
                  <p className="inputForm-field-title">농작물 종류</p>
                </label>
                <select
                  {...register("category", {
                    required: "농작물 종류를 선택해주세요",
                  })}
                  className="w-full border p-2 rounded"
                >
                  <option value="FRUIT">과일</option>
                  <option value="VEGETABLE">채소</option>
                  <option value="GRAIN">곡물</option>
                </select>
                {errors.category && <p>{errors.category.message}</p>}
              </div>
            </div>
            <div className="inputForm-stick"></div>
            <div className="inputForm-right">
              {/* 가격 */}
              <div>
                <label>
                  <p className="inputForm-field-title">가격</p>
                </label>
                <input
                  placeholder="예) 10,000원"
                  type="number"
                  {...register("price", {
                    required: "가격을 입력해주세요",
                    min: 0,
                  })}
                />
                {errors.price && (
                  <p className="err-text">{errors.price.message}</p>
                )}
              </div>
              <div>
                <label>
                  <p className="inputForm-field-title">생산 연월</p>
                </label>
                <input
                  type="date"
                  {...register("harvestDate", {
                    required: "생산 연월을 선택해주세요",
                  })}
                />
                {errors.harvestDate && <p>{errors.harvestDate.message}</p>}
              </div>

              <div>
                <label>
                  <p className="inputForm-field-title">중량</p>
                </label>
                <input
                  type="number"
                  step="0.1"
                  {...register("weight", {
                    required: "중량을 입력해주세요",
                    min: 0,
                  })}
                />

                {errors.weight && <p>{errors.weight.message}</p>}
              </div>

              <div>
                <label>
                  <p className="inputForm-field-title">설명</p>
                </label>
                <textarea {...register("description")} />
              </div>
            </div>
          </div>
          <div className="grid place-items-center">
            <div className="loginOrsign-btns ">
              <button type="submit" className="modify-delete-btn">
                <p>수정완료</p>
              </button>

              <button
                type="button"
                className="modify-btn"
                onClick={() => navigate(-1)}
              >
                <p>수정취소</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModifyPage;
