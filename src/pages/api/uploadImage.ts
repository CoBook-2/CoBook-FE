import type { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import type { Fields, Files, File as FormidableFile } from "formidable";
import { users, mockOcrResult } from "@/mock/users";

export const config = {
  api: {
    bodyParser: false, // formidable을 사용하기 위해 bodyParser를 비활성화합니다.
  },
};

// Formidable을 Promise로 래핑하여 async/await 사용
const parseForm = (
  req: NextApiRequest
): Promise<{ fields: Fields; files: Files }> => {
  const form = formidable({ multiples: false });

  return new Promise((resolve, reject) => {
    form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        reject(err);
      } else {
        resolve({ fields, files });
      }
    });
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);

      // spaceId 처리
      const spaceId = fields.spaceId;

      let spaceIdStr: string | undefined;

      if (Array.isArray(spaceId)) {
        spaceIdStr = spaceId[0];
      } else {
        spaceIdStr = spaceId;
      }

      if (typeof spaceIdStr !== "string" || !spaceIdStr) {
        return res.status(400).json({
          success: false,
          message: "유효하지 않은 또는 제공되지 않은 spaceId입니다.",
        });
      }

      // 첫 번째 사용자로 가정
      const user = users[0];
      const space = user.participatingSpaces.find(
        (s) => s.spaceId === spaceIdStr
      );

      if (!space) {
        return res.status(400).json({
          success: false,
          message: "유효하지 않은 spaceId입니다.",
        });
      }

      // 파일 처리
      let uploadedFile: FormidableFile;

      if (Array.isArray(files.file)) {
        uploadedFile = files.file[0] as FormidableFile;
      } else if (files.file) {
        uploadedFile = files.file as FormidableFile;
      } else {
        return res.status(400).json({
          success: false,
          message: "파일이 업로드되지 않았습니다.",
        });
      }

      // 파일 이름 가져오기
      const fileName = uploadedFile.originalFilename || "";

      // 이미지 파일이 잘 도착했는지 확인하기 위해 receivedImages에 추가
      space.receivedImages = space.receivedImages || [];
      space.receivedImages.push({ fileName });

      // mockOcrResult를 해당 space의 ocrResults에 추가
      space.ocrResults = space.ocrResults || [];
      space.ocrResults.push(mockOcrResult);

      console.log(
        `Image received and mockOcrResult added for spaceId ${spaceIdStr}`
      );

      return res.status(200).json({
        success: true,
        message:
          "이미지 파일이 성공적으로 저장되었고 OCR 결과가 추가되었습니다.",
        ocrResult: mockOcrResult,
      });
    } catch (error) {
      console.error("Error parsing form data:", error);
      return res.status(500).json({
        success: false,
        message: "파일 업로드 중 오류가 발생했습니다.",
      });
    }
  } else {
    return res
      .status(405)
      .json({ success: false, message: "Method Not Allowed" });
  }
}
