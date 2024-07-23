import { useState, useEffect } from "react";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "@/assets/styles/global.scss";
import Loading from "@/components/Loading/Loading";
import { useAuth } from "@/hooks/useAuth";
import useScrollToTop from "@/hooks/useScrollToTop";
import KakaoCallback from "@/components/KakaoCallback/KakaoCallback";
import NaverCallback from "@/components/NaverCallback/NaverCallback";
import GoogleCallback from "@/components/GoogleCallback/GoogleCallback";
import Error from "@/components/Error/Error";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

const Home = lazy(() => import("./pages/Home/Home"));
const DiaryList = lazy(() => import("./pages/Diary/DIaryList"));
const RegisterDiary = lazy(() => import("./pages/Diary/RegisterDiary"));
const AddMember = lazy(() => import("./pages/Diary/AddMember"));
const DiaryDetail = lazy(() => import("./pages/Diary/DiaryDetail"));
const EditDiary = lazy(() => import("./pages/Diary/EditDiary"));
const DiaryPageList = lazy(() => import("./pages/Diary/DiaryPageList"));
const RegisterPaper = lazy(() => import("./pages/Paper/RegisterPaper"));
const Login = lazy(() => import("./pages/Login/Login"));
const SignUp = lazy(() => import("./pages/SignUp/SignUp"));
const FindPassword = lazy(() => import("./pages/FindPassword/FindPassword"));
const ResetPassword = lazy(() => import("./pages/FindPassword/ResetPassword"));
const Mypage = lazy(() => import("./pages/Mypage/Mypage"));
const EditMypage = lazy(() => import("./pages/Mypage/EditMypage"));
const PageList = lazy(() => import("./pages/Mypage/PageList"));
const SavePageList = lazy(() => import("./pages/Mypage/SavePageList"));
const LikePageList = lazy(() => import("./pages/Mypage/LikePageList"));
const Noti = lazy(() => import("./pages/Noti/Noti"));
const Friends = lazy(() => import("./pages/Friends/Friends"));
const AddFriend = lazy(() => import("./pages/Friends/AddFriend"));
const SelectDiary = lazy(() => import("./pages/Paper/SelectDiary"));
const PaperPage = lazy(() => import("./pages/Paper/PaperPage"));
const EditPaper = lazy(() => import("./pages/Paper/EditPaper"));
const PlaceSearch = lazy(() => import("./pages/Paper/PlaceSearch"));

function App() {
    const { isLoggedIn } = useAuth();
    useScrollToTop();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <Suspense fallback={<Loading isLodding={true} />}>
            <Routes>
                <Route
                    path="/login/oauth2/code/kakao"
                    element={<KakaoCallback />}
                />
                <Route
                    path="/login/oauth2/code/naver"
                    element={<NaverCallback />}
                />
                <Route
                    path="/login/oauth2/code/google"
                    element={<GoogleCallback />}
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/findpassword" element={<FindPassword />} />
                <Route path="/resetpassword" element={<ResetPassword />} />
                {isLoggedIn ? (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/diary" element={<DiaryList />} />
                        <Route path="/register/diary" element={<RegisterDiary />} />
                        <Route path="/friend/search" element={<AddMember />} />
                        <Route path="/diary/:id" element={<DiaryDetail />} />
                        <Route path="/edit/diary/:id" element={<EditDiary />} />
                        <Route path="/papers/diary/:id" element={<DiaryPageList />} />
                        <Route path="/register/paper" element={<RegisterPaper />} />
                        <Route path="/mypage" element={<Mypage />} />
                        <Route path="/mypage/edit" element={<EditMypage />} />
                        <Route path="/mypage/pagelist" element={<PageList />} />
                        <Route path="/mypage/savepagelist" element={<SavePageList />} />
                        <Route path="/mypage/likepagelist" element={<LikePageList />} />
                        <Route path="/noti" element={<Noti />} />
                        <Route path="/friends" element={<Friends />} />
                        <Route path="/friends/add" element={<AddFriend />} />
                        <Route path="/diary/select" element={<SelectDiary />} />
                        <Route path="/papers/:paperId" element={<PaperPage />} />
                        <Route path="/edit/paper/:paperId" element={<EditPaper />} />
                        <Route path="/search/place" element={<PlaceSearch />} />
                    </>
                ) : (
                    <Route path="*" element={<Login />} />
                )}
                <Route path="*" element={<Error />} />
            </Routes>
        </Suspense>
    );
}

export default App;
