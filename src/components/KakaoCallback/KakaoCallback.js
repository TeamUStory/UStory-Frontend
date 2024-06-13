import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import KaKao from "@/apis/api/Kakao";

const KakaoCallback = () => {
  const navigate = useNavigate();
  const {fetchData, data} = useAxios();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      fetchData(KaKao.getKakaoLogin(code));
    }
  }, [fetchData]);

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
    }
  }, [data, navigate]);

};

export default KakaoCallback;