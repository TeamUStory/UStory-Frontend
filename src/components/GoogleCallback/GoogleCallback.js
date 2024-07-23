import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "@/hooks/useAxios";
import Google from "@/apis/api/Google";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const {fetchData, data} = useAxios();

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (code) {
      fetchData(Google.getGoogleLogin(code));
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

export default GoogleCallback;