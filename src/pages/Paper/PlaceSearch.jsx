import { useState } from 'react';
import styles from './PlaceSearch.module.scss';
import SearchMapApi from '@/apis/MapApis/SearchMapApi';
import InputField from '@/components/InputField/InputField';
import Button from '@/components/Button/Button';
import SubHeader from '@/components/SubHeader/SubHeader';
import SearchIcon from '../../assets/icons/SearchIcon';

const PlaceSearch = () => {
    const [inputText, setInputText] = useState('')
    const [place, setPlace] = useState('')

    const onChange = (e) => {
        setInputText(e.target.value)
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            // 엔터키를 눌렀을 때 실행할 동작
            setPlace(inputText);
          }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setPlace(inputText)
    }
    console.log(place);
    return (
        <div className={styles.allContainer}>
            <SubHeader pageTitle="장소 검색하기" />
            <div className={styles.ContentsContainer}>
                <div className={styles.container}>
                    <SearchMapApi height="219px" searchPlace={place} />
                    <div className={styles.searchContainer}>
                        <InputField placeholder="검색" onChange={onChange} value={inputText} onKeyPress={handleKeyPress} />
                        <Button type="submit" label={<SearchIcon/>} variant={"inactive"} onClick={handleSubmit}/>
                    </div>
                </div>
                <Button type="Button" label="장소 선택" variant={"active"} onClick={() => <div></div>}/>
            </div>
        </div>
    )
}

export default PlaceSearch;