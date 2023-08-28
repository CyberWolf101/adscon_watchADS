import React, { useEffect, useState } from 'react';
import Intro from '../components/intro';
import Nav from '../components/nav';
import Footer from "../components/footer";
import Details from '../components/details';
import Blogs from '../components/blogs';
import bg from '../assets/Hero_edited.jpg'
import Loading from './Loading';
import { Message } from '@mui/icons-material';


function Home() {
    const [picLoaded, setPicLoaded] = useState(false)

    useEffect(() => {
        const img = new Image();
        img.src = bg;
        img.onload = () => setPicLoaded(true)
    }, [])
    if (!picLoaded) return <Loading />
    return (
        <div >
            <Nav />
           
            <Intro />
            <Blogs />
            <br />
            <br />
            <br />
            <br />
            <Footer />
        </div>
    );
}

export default Home;