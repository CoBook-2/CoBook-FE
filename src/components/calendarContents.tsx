import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSpaceContext } from "@/context/SpaceContext";
import { OcrResult } from "@/types";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./calendarContents.module.css"; // CSS 모듈 임포트

const CalendarContents: React.FC = () => {
  const { user } = useAuth();
  const { spaceId } = useSpaceContext();
  const [ocrResults, setOcrResults] = useState<OcrResult[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTotalAmount, setSelectedTotalAmount] = useState<number>(0);

  useEffect(() => {
    if (spaceId) {
      fetch(`/api/getOcrResults?spaceId=${spaceId}`, {
        method: "GET",
        cache: "no-store", // 캐시 사용하지 않도록 설정
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setOcrResults(data.ocrResults);
          } else {
            console.error(data.message);
          }
        })
        .catch((error) => {
          console.error("Error fetching ocrResults:", error);
        });
    }
  }, [spaceId]);

  if (!user) {
    return <p>로그인이 필요합니다.</p>;
  }

  if (!spaceId) {
    return <p>스페이스 정보를 불러오는 중입니다...</p>;
  }

  const handleDateClick = (date: Date) => {
    const results = ocrResults.filter((ocrResult) => {
      const resultDate = new Date(ocrResult.date);
      return resultDate.toDateString() === date.toDateString();
    });

    if (results.length > 0) {
      const totalAmount = results.reduce(
        (sum, curr) => sum + curr.totalAmount,
        0
      );
      setSelectedDate(date);
      setSelectedTotalAmount(totalAmount);
    } else {
      setSelectedDate(null);
      setSelectedTotalAmount(0);
    }
  };

  const tileClassName = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const today = new Date();
      if (
        date.getFullYear() === today.getFullYear() &&
        date.getMonth() === today.getMonth() &&
        date.getDate() === today.getDate()
      ) {
        return styles["current-date"]; // 현재 날짜에 CSS 클래스 적용
      }

      const result = ocrResults.find((ocrResult) => {
        const resultDate = new Date(ocrResult.date);
        return resultDate.toDateString() === date.toDateString();
      });
      if (result) {
        return styles.highlight; // OCR 결과가 있는 날짜에 CSS 클래스 적용
      }
    }
    return null;
  };

  const tileContent = ({ date, view }: { date: Date; view: string }) => {
    if (view === "month") {
      const results = ocrResults.filter((ocrResult) => {
        const resultDate = new Date(ocrResult.date);
        return resultDate.toDateString() === date.toDateString();
      });

      if (results.length > 0) {
        const totalAmount = results.reduce(
          (sum, curr) => sum + curr.totalAmount,
          0
        );
        return (
          <div>
            <div className={styles.highlight}></div>
            <div className={styles.totalAmount}>총 금액: {totalAmount}원</div>
          </div>
        );
      }
    }
    return null;
  };

  return (
    <div className={styles.calendarContainer}>
      <h1>스페이스 캘린더</h1>
      <Calendar
        tileClassName={tileClassName}
        tileContent={tileContent}
        onClickDay={handleDateClick} // 날짜 클릭 핸들러 추가
      />
      {selectedDate && (
        <div className={styles.selectedDateInfo}>
          <h2>{selectedDate.toLocaleDateString()}의 총 금액</h2>
          <p>{selectedTotalAmount}원</p>
        </div>
      )}
    </div>
  );
};

export default CalendarContents;
