import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import api from "../api/axiosInstance";

function ModifyPage() {
  const navigate = useNavigate();
  const { produceId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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
        reset({
          title: response.data.title,
          origin: response.data.origin,
          harvestDate: response.data.harvestDate,
          weight: response.data.weight,
          description: response.data.description,
          type: response.data.category, // ✅ 수정
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
      formData.append("title", data.title);
      formData.append("origin", data.origin);
      formData.append("harvestDate", data.harvestDate);
      formData.append("weight", String(data.weight));
      formData.append("description", data.description);
      formData.append("category", data.category); // ✅ 수정

      if (data.images && data.images.length > 0) {
        formData.append("images", data.images[0]);
      }

      await api.put(`/produce/${produceId}`, formData);

      alert("수정이 완료되었습니다!");
      navigate(-1);
    } catch (err) {
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <div>불러오는 중...</div>;
  if (!product) return <div>상품을 찾을 수 없습니다.</div>;

  return (
    <div>
      <div>
        <p>------------------------------------</p>
        <h4>농작물 정보 수정</h4>
        <p>선택된 농작물의 정보를 수정하세요</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>농작물 이름</label>
            <input
              {...register("title", { required: "농작물 이름을 입력해주세요" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>

          <div>
            <label>생산지</label>
            <input
              {...register("origin", { required: "생산지를 입력해주세요" })}
            />
            {errors.origin && <p>{errors.origin.message}</p>}
          </div>

          <div>
            <label>생산 연월</label>
            <input
              type="month"
              {...register("harvestDate", {
                required: "생산 연월을 선택해주세요",
              })}
            />
            {errors.harvestDate && <p>{errors.harvestDate.message}</p>}
          </div>

          <div>
            <label>중량 (kg)</label>
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
            <label>설명</label>
            <textarea {...register("description")} />
          </div>

          <div>
            <label>농작물 종류</label>
            <select
              {...register("category", { required: "농작물 종류를 선택해주세요" })} // ✅ 수정
            >
              <option value="FRUIT">FRUIT</option>
              <option value="VEGETABLE">VEGETABLE</option>
              <option value="GRAIN">GRAIN</option>
              <option value="NONE">NONE</option>
            </select>
            {errors.category && <p>{errors.category.message}</p>} // ✅ 수정
          </div>

          <div>
            <label>사진</label>
            <input type="file" accept="image/*" {...register("images")} />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            수정 완료
          </button>

          <button
            type="button"
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            onClick={() => navigate(-1)}
          >
            수정 취소
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModifyPage;