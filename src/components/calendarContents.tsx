// src/components/calendarContents.tsx
import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useSpaceContext } from "@/context/SpaceContext";
import { OcrResult } from "@/types";
import FullCalendar from "@fullcalendar/react";
import { EventInput } from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, {
  DateClickArg,
  EventDragStopArg,
  EventResizeDoneArg,
} from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import styles from "./calendarContents.module.css";

const CalendarContents: React.FC = () => {
  const { user } = useAuth();
  const { spaceId } = useSpaceContext();
  const [ocrResults, setOcrResults] = useState<OcrResult[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTotalAmount, setSelectedTotalAmount] = useState<number>(0);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // 카테고리 필터링 상태 추가

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

  // 카테고리에 따른 색상 매핑
  const categoryColors: { [key: string]: string } = {
    음식: "#f94144",
    교통: "#f3722c",
    주거: "#f8961e",
    쇼핑: "#f9844a",
    기타: "#f9c74f",
    // 필요한 카테고리에 따라 추가
  };

  // 카테고리 색상으로부터 카테고리 이름을 반환하는 함수
  const getCategoryFromColor = (color: string): string | undefined => {
    return Object.keys(categoryColors).find(
      (category) => categoryColors[category] === color
    );
  };

  // FullCalendar용 이벤트 생성
  const events: EventInput[] = ocrResults.map((ocrResult, index) => ({
    id: `${index}`, // 고유 ID 추가
    title: `총 금액: ${ocrResult.totalAmount}원`,
    date: ocrResult.date,
    allDay: true,
    classNames: [styles.highlight], // CSS 클래스 적용
    backgroundColor: categoryColors[ocrResult.category] || "#90be6d", // 카테고리에 따른 배경색
    borderColor: categoryColors[ocrResult.category] || "#90be6d", // 카테고리에 따른 테두리색
    extendedProps: {
      description: `구매처: ${ocrResult.purchase || "N/A"}\n주소: ${
        ocrResult.address || "N/A"
      }\n작성자: ${ocrResult.author || "N/A"}`,
    },
  }));

  // 현재 날짜 하이라이트를 위한 이벤트 추가
  const today = new Date();
  events.push({
    id: "today", // 고유 ID 추가
    title: "오늘",
    date: today.toISOString().split("T")[0],
    allDay: true,
    display: "background",
    classNames: [styles["current-date"]],
  });

  // 카테고리 필터링 로직
  const filteredEvents = events.filter((event) => {
    if (selectedCategories.length === 0) return true;
    // event.backgroundColor을 통해 카테고리를 확인
    return selectedCategories.includes(
      getCategoryFromColor(event.backgroundColor as string) || ""
    );
  });

  const handleDateClick = (arg: DateClickArg) => {
    const clickedDate = arg.date;
    const results = ocrResults.filter((ocrResult) => {
      const resultDate = new Date(ocrResult.date);
      return resultDate.toDateString() === clickedDate.toDateString();
    });

    if (results.length > 0) {
      const totalAmount = results.reduce(
        (sum, curr) => sum + curr.totalAmount,
        0
      );
      setSelectedDate(clickedDate);
      setSelectedTotalAmount(totalAmount);
    } else {
      setSelectedDate(null);
      setSelectedTotalAmount(0);
    }
  };

  const handleEventDrop = (arg: EventDragStopArg) => {
    const { event } = arg;
    // 이벤트의 날짜를 업데이트하거나, 서버에 변경 사항을 전송할 수 있습니다.
    console.log(`이벤트 ${event.id}가 ${event.start}로 이동되었습니다.`);
    // 예: 서버에 PATCH 요청을 보내어 이벤트 날짜를 업데이트
  };

  const handleEventResize = (arg: EventResizeDoneArg) => {
    const { event } = arg;
    console.log(`이벤트 ${event.id}의 기간이 변경되었습니다.`);
    // 예: 서버에 PATCH 요청을 보내어 이벤트 기간을 업데이트
  };

  return (
    <div className={styles.calendarContainer}>
      <h1>캘린더</h1>
      {/* 카테고리 필터링 UI 추가 */}
      <div className={styles.filterContainer}>
        {Object.keys(categoryColors).map((category) => (
          <label key={category} className={styles.filterLabel}>
            <input
              type="checkbox"
              value={category}
              checked={selectedCategories.includes(category)}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedCategories([...selectedCategories, category]);
                } else {
                  setSelectedCategories(
                    selectedCategories.filter((c) => c !== category)
                  );
                }
              }}
              className={styles.filterCheckbox}
            />
            {category}
          </label>
        ))}
      </div>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin]}
        initialView="dayGridMonth"
        events={filteredEvents} // 필터링된 이벤트 전달
        dateClick={handleDateClick}
        eventContent={(eventInfo) => (
          <div id={`event-${eventInfo.event.id}`}>
            <span>{eventInfo.event.title}</span>
            {/* ReactTooltip 제거 */}
          </div>
        )}
        dayCellClassNames={(arg) => {
          const date = arg.date;
          const isToday =
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
          const hasOcr = ocrResults.some(
            (ocrResult) =>
              new Date(ocrResult.date).toDateString() === date.toDateString()
          );
          const classNames: string[] = [];
          if (isToday) classNames.push(styles["current-date"]);
          if (hasOcr) classNames.push(styles.highlight);
          return classNames.length > 0 ? classNames : [];
        }}
        height="auto" /* 캘린더 높이를 자동으로 조정 */
        contentHeight={600} /* 캘린더의 컨텐츠 높이 설정 */
        aspectRatio={1.5} /* 캘린더의 가로 세로 비율 설정 */
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        }}
        editable={true} /* 드래그 및 드롭 활성화 */
        selectable={true} /* 이벤트 선택 활성화 */
        eventDrop={handleEventDrop} /* 이벤트 드롭 핸들러 */
        eventResize={handleEventResize} /* 이벤트 리사이즈 핸들러 */
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
