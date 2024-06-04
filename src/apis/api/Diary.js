import { api } from "../index"

export default {
  /**
   * @method DELETE
   * @summeray 다이어리 삭제
   * @description 다이어리 삭제
   */
  deleteDiary(diaryId) {
    return api({
      url: `/diary/${diaryId}`,
      method: "delete"
    })
  },

  /**
   * @method GET
   * @summeray 모든 다이어리 조회
   * @description 모든 다이어리 조회
   */
}