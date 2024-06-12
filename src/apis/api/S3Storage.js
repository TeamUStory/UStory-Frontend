export default {
  /**
   * @method GET
   * @summeray image URL를 presigned URL로 변환
   */
  getImageUrl(fileName) {
      return {
          url:`/s3/pre-signed-url/image/${fileName}`,
          method: "get"
      }
  }
}
