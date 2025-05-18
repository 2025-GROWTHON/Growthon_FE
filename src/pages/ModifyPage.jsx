import { useNavigate, useParams } from "react-router-dom";
import mockProducts from "../api/mockData";
import { useForm } from "react-hook-form";
import axios from "axios";

function ModifyPage() {
  const navigate = useNavigate();
  const { produceId } = useParams();
  const product = mockProducts.find(
    (item) => String(item.produceId) === String(produceId)
  );

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: product.title,
      origin: product.origin,
      harvestDate: product.harvestDate,
      weight: product.weight,
      description: product.description,
      type: product.category,
    },
  });

  const onSubmit = async (data) => {
    try {
      // 파일명만 추출 (없으면 기존 이미지 사용)
      let imageName = product.images;
      if (data.images && data.images.length > 0) {
        imageName = data.images[0].name;
      }

      const requestBody = {
        title: data.title,
        description: data.description,
        images: imageName,
        origin: data.origin,
        harvestDate: data.harvestDate,
        weight: String(data.weight),
        category: data.type,
      };

      await axios.put(
        `https://74d2827b-5c6c-4f78-a111-8ee3339c2d7b.mock.pstmn.io/api/produces/${produceId}`,
        requestBody
      );
      alert("수정이 완료되었습니다!");
    } catch (err) {
      alert("수정 실패: " + (err.response?.data?.message || err.message));
    }
  };

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
              {...register("type", { required: "농작물 종류를 선택해주세요" })}
            >
              <option value="">선택하세요</option>
              <option value="과일">과일</option>
              <option value="채소">채소</option>
              <option value="곡물">곡물</option>
              <option value="기타">기타</option>
            </select>
            {errors.type && <p>{errors.type.message}</p>}
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
