
export default {
  /**
   * @method POST
   * @summary 토큰 만료 시 새로운 AccessToken 발급
   */
  refresh() {
    return {
      url: '/jwt/re-issue',
      method: 'post',
    };
  }
}