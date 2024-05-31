import { Routes, Route} from 'react-router-dom';
import "@/assets/styles/global.scss";
import Home from './pages/Home/Home';
import DiaryList from '@/pages/Diary/DIaryList';
import RegisterDiary from './pages/Diary/RegisterDiary';
import AddMember from './pages/Diary/AddMember';
import Diary from './pages/Diary/Diary';
import EditDiary from './pages/Diary/EditDiary';
import DiaryPageList from './pages/Diary/DiaryPageList';
import RegisterPaper from './pages/Paper/RegisterPaper';
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import FindPassword from "./pages/FindPassword/FindPassword";
import ResetPassword from "./pages/FindPassword/ResetPassword";
import Mypage from "./pages/Mypage/Mypage";
import EditMypage from "./pages/Mypage/EditMypage";
import PageList from './pages/Mypage/PageList';
import SavePageList from './pages/Mypage/SavePageList';
import Noti from "./pages/Noti/Noti";
import Friends from "./pages/Friends/Friends";
import AddFriend from "./pages/Friends/AddFriend";

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/diarylist' element={<DiaryList />} />
        <Route path='/register/diary' element={<RegisterDiary />} />
        <Route path='/memberselect' element={<AddMember/> } />
        <Route path='/diary' element={<Diary />} />
        <Route path='/editdiary' element={<EditDiary />} />
        <Route path='/diary/pagelist' element={<DiaryPageList/>} />
        <Route path='/register/paper' element={<RegisterPaper />} />
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
      </Routes>
    </>
  )
}

export default App