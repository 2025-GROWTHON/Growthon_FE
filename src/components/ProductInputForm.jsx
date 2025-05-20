import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import api from "../api/axiosInstance";

export default function CropForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
  
      // 1. 이미지 파일 (단일 파일만 처리)
      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
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
    } catch (err) {
      console.error("요청 실패:", err);
    }
  };

  return (
    <div>
      <p>-----------------------------</p>
      <h2>상품 등록 폼</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 농작물 이름 */}
        <div>
          <label>농작물 이름</label>
          <input
            {...register("title", { required: "농작물 이름을 입력해주세요" })}
          />
          {errors.title && <p>{errors.title.message}</p>}
        </div>

        {/* 가격 */}
        <div>
          <label>가격 (원)</label>
          <input
            type="number"
            {...register("price", { required: "가격을 입력해주세요", min: 0 })}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price.message}</p>
          )}
        </div>

        {/* 생산지 */}
        <div>
          <label className="block mb-1 font-medium">생산지</label>
          <input
            {...register("origin", { required: "생산지를 입력해주세요" })}
            className="w-full border p-2 rounded"
          />
          {errors.origin && (
            <p className="text-red-500 text-sm">{errors.origin.message}</p>
          )}
        </div>

        {/* 생산 연월 */}
        <div>
          <label className="block mb-1 font-medium">생산 연월</label>
          <input
            type="month"
            {...register("harvestDate", {
              required: "생산 연월을 선택해주세요",
            })}
            className="w-full border p-2 rounded"
          />
          {errors.harvestDate && (
            <p className="text-red-500 text-sm">{errors.harvestDate.message}</p>
          )}
        </div>

        {/* 이미지 */}
        <div>
          <label className="block mb-1 font-medium">농작물 이미지</label>
          <input
            type="file"
            accept="image/*"
            {...register("images")}
            className="w-full"
          />
        </div>

        {/* 중량 */}
        <div>
          <label className="block mb-1 font-medium">중량 (kg)</label>
          <input
            type="number"
            step="0.1"
            {...register("weight", { required: "중량을 입력해주세요", min: 0 })}
            className="w-full border p-2 rounded"
          />
          {errors.weight && (
            <p className="text-red-500 text-sm">{errors.weight.message}</p>
          )}
        </div>

        {/* 설명 */}
        <div>
          <label className="block mb-1 font-medium">설명</label>
          <textarea
            {...register("description")}
            className="w-full border p-2 rounded"
          />
        </div>

        {/* 농작물 종류 */}
        <div>
          <label className="block mb-1 font-medium">농작물 종류</label>
          <select
            {...register("type", { required: "농작물 종류를 선택해주세요" })}
            className="w-full border p-2 rounded"
          >
            <option value="">선택하세요</option>
            <option value="NONE">NONE</option>
            <option value="FRUIT">FRUIT</option>
            <option value="VEGETABLE">VEGETABLE</option>
            <option value="GRAIN">GRAIN</option>
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm">{errors.type.message}</p>
          )}
        </div>

        {/* 등록 버튼 */}
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          농작물 등록
        </button>
      </form>
    </div>
  );
}
