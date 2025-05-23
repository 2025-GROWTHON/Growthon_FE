import axios from "axios";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import api from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function CropForm() {
  const navigate = useNavigate();
  const formTopRef = useRef(null);
  const [fileName, setFileName] = useState("첨부파일");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

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

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      console.log("data:", data);

      // 1. 이미지 파일 (단일 파일만 처리)
      if (data.images) {
        if (data.images instanceof FileList) {
          if (data.images.length > 0) {
            formData.append("images", data.images[0]);
          }
        } else if (data.images instanceof File) {
          formData.append("images", data.images);
        }
      }

      // 2. JSON 데이터로 request 객체 구성
      const requestPayload = {
        title: data.title,
        price: data.price,
        origin: data.origin,
        harvestDate: data.harvestDate,
        weight: data.weight,
        description: data.description,
        category: data.type,
      };

      // 3. request를 JSON Blob으로 추가
      formData.append(
        "request",
        new Blob([JSON.stringify(requestPayload)], {
          type: "application/json",
        })
      );

      const response = await api.post("/produce", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      let resData = response.data;
      resData = typeof resData === "string" ? JSON.parse(resData) : resData;
      console.log("서버 응답:", resData);
      alert(resData.message);
      reset();
      navigate("/");
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert("오류:" + err.response.data.message);
      } else {
        alert("알 수 없는 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="inputForm-pg" ref={formTopRef}>
      <div className="inputForm-tisub ">
        <h2 className="inputForm-title">농작물 등록 폼</h2>
        <p className="inputForm-sub ">새로운 농작물 상품 정보를 입력하세요.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="inputForm-Frame">
          <div className="inputForm-left">
            {/* 농작물 이름 */}
            <div>
              <label>
                <p className="inputForm-field-title">농작물 이름</p>
              </label>
              <input
                placeholder="예)쌀"
                {...register("title", {
                  required: "농작물 이름을 입력해주세요",
                })}
                className={`${errors.title ? "input-error" : ""}`}
              />
              {errors.title && (
                <p className="err-text">{errors.title.message}</p>
              )}
            </div>

            {/* 생산지 */}
            <div>
              <label>
                <p className="inputForm-field-title">생산지</p>
              </label>
              <input
                placeholder="예) 강원도"
                {...register("origin", { required: "생산지를 입력해주세요" })}
                className={`${errors.origin ? "input-error" : ""}`}
              />
              {errors.origin && (
                <p className="err-text">{errors.origin.message}</p>
              )}
            </div>

            {/* 이미지 */}
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
            </div>
            {/* 농작물 종류 */}
            <div>
              <label>
                <p className="inputForm-field-title">농작물 종류</p>
              </label>
              <select
                {...register("type", {
                  required: "농작물 종류를 선택해주세요",
                })}
                className="w-full border p-2 rounded"
              >
                <option value="">선택하세요</option>
                {/*<option value="NONE">없음</option>*/}
                <option value="FRUIT">과일</option>
                <option value="VEGETABLE">채소</option>
                <option value="GRAIN">곡물</option>
              </select>
              {errors.type && <p className="err-text">{errors.type.message}</p>}
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

            {/* 생산 연월 */}
            <div>
              <label>
                <p className="inputForm-field-title">생산 연월</p>
              </label>
              <input
                placeholder="예) 10,000원"
                type="date"
                {...register("harvestDate", {
                  required: "생산 연월을 선택해주세요",
                })}
                className="w-full border p-2 rounded"
              />
              {errors.harvestDate && (
                <p className="err-text">{errors.harvestDate.message}</p>
              )}
            </div>

            {/* 중량 */}
            <div>
              <label>
                <p className="inputForm-field-title">중량</p>
              </label>
              <input
                placeholder="예) 500g"
                type="number"
                step="0.1"
                {...register("weight", {
                  required: "중량을 입력해주세요",
                  min: 0,
                })}
                className="w-full border p-2 rounded"
              />
              {errors.weight && (
                <p className="err-text">{errors.weight.message}</p>
              )}
            </div>

            {/* 설명 */}
            <div>
              <label>
                <p className="inputForm-field-title">설명</p>
              </label>
              <textarea
                placeholder="간단한 설명을 입력하세요."
                {...register("description")}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>
        </div>
        {/* 등록 버튼 */}
        <div className="grid place-items-center">
          <button type="submit" className="inputForm-submit-btn">
            <p>등록</p>
          </button>
        </div>
      </form>
    </div>
  );
}
