import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import Naver from "@/apis/api/Naver";

const NaverCallback = () => {
  const navigate = useNavigate();
  const {fetchData, data} = useAxios();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");
    const state = url.searchParams.get("state");

    if (code && state) {
      fetchData(Naver.getNaverLogin(code, state));
    }
  }, [fetchData]);

  useEffect(() => {
    if (data?.accessToken) {
      localStorage.setItem("accessToken", data.accessToken);
      navigate("/");
      window.location.reload()
    }
  }, [data, navigate]);

};

export default NaverCallback;