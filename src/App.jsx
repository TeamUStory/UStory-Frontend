import { lazy, Suspense } from 'react';
import { Routes, Route} from 'react-router-dom';
import "@/assets/styles/global.scss";
import Loading from '@/components/Loading/Loading';

const Home = lazy(() => import('./pages/Home/Home'));
const DiaryList = lazy(() => import('./pages/Diary/DIaryList'));
const RegisterDiary = lazy(() => import('./pages/Diary/RegisterDiary'));
const AddMember = lazy(() => import('./pages/Diary/AddMember'));
const Diary = lazy(() => import('./pages/Diary/Diary'));
const EditDiary = lazy(() => import('./pages/Diary/EditDiary'));
const DiaryPageList = lazy(() => import('./pages/Diary/DiaryPageList'));
const RegisterPaper = lazy(() => import('./pages/Paper/RegisterPaper'));
const Login = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));
const FindPassword = lazy(() => import('./pages/FindPassword/FindPassword'));
const ResetPassword = lazy(() => import('./pages/FindPassword/ResetPassword'));
const Mypage = lazy(() => import('./pages/Mypage/Mypage'));
const EditMypage = lazy(() => import('./pages/Mypage/EditMypage'));
const PageList = lazy(() => import('./pages/Mypage/PageList'));
const SavePageList = lazy(() => import('./pages/Mypage/SavePageList'));
const Noti = lazy(() => import('./pages/Noti/Noti'));
const Friends = lazy(() => import('./pages/Friends/Friends'));
const AddFriend = lazy(() => import('./pages/Friends/AddFriend'));
const SelectDiary = lazy(() => import('./pages/Paper/SelectDiary'));
const PaperPage = lazy(() => import('./pages/Paper/PaperPage'));
const EditPaper = lazy(() => import('./pages/Paper/EditPaper'));
const PlaceSearch = lazy(() => import('./pages/Paper/PlaceSearch'));

function App() {

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/diary' element={<DiaryList />} />
        <Route path='/register/diary' element={<RegisterDiary />} />
        <Route path='/friend/search' element={<AddMember/> } />
        <Route path='/diary/:id' element={<Diary />} />
        <Route path='/editdiary' element={<EditDiary />} />
        <Route path='/papers/diary/:id' element={<DiaryPageList/>} />
        <Route path='/register/paper' element={<RegisterPaper />} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/findpassword' element={<FindPassword />} />
        <Route path='/resetpassword' element={<ResetPassword />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/mypage/edit' element={<EditMypage />} />
        <Route path='/mypage/pagelist' element={<PageList />} />
        <Route path='/mypage/savepagelist' element={<SavePageList />} />
        <Route path='/noti' element={<Noti />} />
        <Route path='/friends' element={<Friends />} />
        <Route path='/friends/add' element={<AddFriend />} /> 
        <Route path='/diary/select' element={<SelectDiary />} /> 
        <Route path='/papers/:paperId' element={<PaperPage />} /> 
        <Route path='/editpaper' element={<EditPaper />} />
        <Route path='/search/place' element={<PlaceSearch />} />
      </Routes>
    </Suspense>
  )
}

export default App