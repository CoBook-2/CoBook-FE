import React, { useState, useRef } from "react";
import styles from "./receiptScanContents.module.css";
import { OcrResult, OcrResultItem, Category } from "@/types";
import { categories } from "@/mock/users";
import Image from "next/image";
import { useSpaceContext } from "@/context/SpaceContext"; // 추가

const ReceiptScanContents: React.FC = () => {
  const { spaceId } = useSpaceContext(); // spaceId 가져오기
  const [ocrData, setOcrData] = useState<OcrResult | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // 추가
  const [items, setItems] = useState<OcrResultItem[]>([
    { name: "", quantity: 1, amount: 0, category: "" },
  ]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 파일 업로드 핸들러
  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("이미지 파일만 업로드 가능합니다.");
      return;
    }
    setFileName(file.name);
    setUploadedFile(file); // 추가
  };

  // 스캔 버튼 핸들러
  const handleScan = async () => {
    if (!fileName || !uploadedFile) {
      alert("스캔할 파일을 입력해주세요.");
      return;
    }

    if (!spaceId) {
      alert("유효한 spaceId가 없습니다.");
      return;
    }

    // FormData 생성
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("spaceId", spaceId);

    try {
      // 백엔드 API 호출
      const response = await fetch("/api/uploadImage", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert("이미지 파일이 성공적으로 전송되었습니다.");

        // 백엔드에서 받은 OCR 결과를 상태로 설정
        setOcrData(data.ocrResult);
        setItems(data.ocrResult.items);
      } else {
        alert(data.message || "이미지 업로드에 실패했습니다.");
      }
    } catch (error) {
      console.error("이미지 업로드 오류:", error);
      alert("이미지 업로드 중 오류가 발생했습니다.");
    }
  };

  // 항목 추가
  const handleAddItem = () => {
    setItems([...items, { name: "", quantity: 1, amount: 0, category: "" }]);
  };

  // 항목 삭제
  const handleRemoveItem = (index: number) => {
    if (items.length > 1) {
      setItems(items.filter((_, i) => i !== index));
    }
  };

  // 항목 수정
  const handleChangeItem = <K extends keyof OcrResultItem>(
    index: number,
    field: K,
    value: OcrResultItem[K]
  ) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  // 드래그 앤 드롭 핸들러
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      handleFileUpload(file);
    } else {
      alert("이미지 파일만 업로드 가능합니다.");
    }
  };

  // 데이터 저장 핸들러
  const handleSave = async () => {
    if (!ocrData) {
      alert("저장할 데이터가 없습니다.");
      return;
    }

    // 모든 항목의 카테고리가 선택되었는지 확인
    const allCategoriesSelected = items.every((item) => item.category !== "");

    if (!allCategoriesSelected) {
      alert("모든 항목의 카테고리를 선택해주세요.");
      return;
    }

    // 저장할 OCR 결과 구성
    const ocrResultToSave: OcrResult = {
      ...ocrData,
      items: items,
    };

    try {
      // 컨텍스트에서 가져온 spaceId 사용
      if (!spaceId) {
        alert("유효한 spaceId가 없습니다.");
        return;
      }

      // 백엔드 API 호출
      const response = await fetch("/api/saveOcrResult", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          spaceId: spaceId, // 컨텍스트에서 가져온 spaceId 사용
          ocrResult: ocrResultToSave,
        }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        alert(data.message);
        // 초기화
        setOcrData(null);
        setFileName(null);
        setItems([{ name: "", quantity: 1, amount: 0, category: "" }]);
      } else {
        alert(data.message || "예산 기록 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("저장 오류:", error);
      alert("예산 기록 저장 중 오류가 발생했습니다.");
    }
  };

  // 저장 버튼 비활성화 조건
  const isSaveDisabled = !ocrData || items.some((item) => item.category === "");

  return (
    <div className={styles.container}>
      {/* 왼쪽 섹션: 파일 업로더 */}
      <div
        className={`${styles.uploaderSection} ${
          dragging ? styles.dragging : ""
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className={styles.uploadBox}>
          <button
            className={styles.uploadButton}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image
              src="/file upload icon.png"
              alt="Upload Icon"
              width={24}
              height={24}
            />
            스캔할 파일 찾기
          </button>
          {fileName && (
            <p className={styles.fileName}>스캔할 파일: {fileName}</p>
          )}
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={(e) =>
              e.target.files && handleFileUpload(e.target.files[0])
            }
          />
        </div>
        <button
          className={styles.scanButton}
          onClick={handleScan}
          disabled={!fileName}
        >
          스캔하기
        </button>
      </div>

      {/* 오른쪽 섹션: 영수증 정보 확인 */}
      <div className={styles.resultSection}>
        <h3>영수증 정보 확인</h3>
        <div className={styles.details}>
          <div className={styles.fieldRow}>
            <label>구매처</label>
            <input
              type="text"
              value={ocrData?.purchase || ""}
              onChange={(e) =>
                setOcrData({ ...ocrData!, purchase: e.target.value })
              }
            />
          </div>
          <div className={styles.fieldRow}>
            <label>주소</label>
            <input
              type="text"
              value={ocrData?.address || ""}
              onChange={(e) =>
                setOcrData({ ...ocrData!, address: e.target.value })
              }
            />
          </div>
          <div className={styles.fieldRow}>
            <label>거래 일시</label>
            <input
              type="text"
              value={ocrData?.date || ""}
              onChange={(e) =>
                setOcrData({ ...ocrData!, date: e.target.value })
              }
            />
          </div>
          <div className={styles.fieldRow}>
            <label>작성자</label>
            <input
              type="text"
              value={ocrData?.author || ""}
              onChange={(e) =>
                setOcrData({ ...ocrData!, author: e.target.value })
              }
            />
          </div>

          <div className={styles.itemsHeader}>
            <span>상품명</span>
            <span>수량</span>
            <span>금액</span>
            <span>카테고리</span>
            <button className={styles.addButton} onClick={handleAddItem}>
              +
            </button>
          </div>
          <div className={styles.itemsList}>
            {items.map((item, index) => (
              <div key={index} className={styles.itemRow}>
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) =>
                    handleChangeItem(index, "name", e.target.value)
                  }
                  className={styles.itemNameInput} // 클래스명 추가
                />
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) =>
                    handleChangeItem(index, "quantity", Number(e.target.value))
                  }
                  className={styles.itemQuantityInput} // 클래스명 추가
                />
                <input
                  type="number"
                  value={item.amount}
                  onChange={(e) =>
                    handleChangeItem(index, "amount", Number(e.target.value))
                  }
                  className={styles.itemAmountInput} // 클래스명 추가
                />
                <select
                  value={item.category}
                  onChange={(e) =>
                    handleChangeItem(
                      index,
                      "category",
                      e.target.value as Category | ""
                    )
                  }
                  className={styles.itemCategorySelect} // 클래스명 추가
                >
                  <option value="">카테고리 선택</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
                <button
                  className={styles.removeButton}
                  onClick={() => handleRemoveItem(index)}
                  disabled={items.length <= 1}
                >
                  -
                </button>
              </div>
            ))}
          </div>

          <div className={styles.fieldRow}>
            <label>총금액</label>
            <input
              type="number"
              value={ocrData?.totalAmount || ""}
              onChange={(e) =>
                setOcrData({
                  ...ocrData!,
                  totalAmount: Number(e.target.value),
                })
              }
            />
          </div>

          <div className={styles.saveButtonContainer}>
            <button
              className={styles.saveButton}
              onClick={handleSave}
              disabled={isSaveDisabled}
            >
              예산 기록 저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptScanContents;
