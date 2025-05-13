'use client'

import { initialPost, PostProps } from '@/sections/Posts';
import React, { useState, useEffect,use } from 'react'
import './style.css'
import Image from 'next/image';
import Preloader from '@/components/Preloader';
import SidePostItem from '@/components/SidePostItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostItem({ params }: { params: Promise<{ id: string }>}) {

    // const id: string = params.id;

    const {id}= use(params)
    const router=useRouter();
    const [item, setItem] = useState(initialPost);
    const [items, setItems] =useState([]);

    const tabsData=[
        {id:1, name:'Popular', active:true},
        {id:2, name:'Trending', active:false}
    ]

    const [tabs, setTabs]= useState(tabsData)

    const handleTabActive =(id:number):void =>{
        setTabs(tabsData.map(tab=>{
            tab.active=false;
            if(tab.id === id) tab.active=true
            return tab
        }))
    }

    const getSinglePostData = () => {
        fetch(`/api/postitems/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(e => console.log(e.message))
    }

    const getItemsData = () => {
    fetch(`/api/postitems`)
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => console.log(e.message));
  }

    useEffect(() => {
        getSinglePostData();
        getItemsData();
    }, []);

    const handleDeletePost= async (id:string)=>{
        try {
            const response= await fetch(`/api/postitems/${id}`, {
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const result=response.status;
            if(result===200){
                console.log("Success", result)
                router.push(`/postitems`)
            }
        } catch (error) {
            console.log("Error", error)
        }
    }

    return (
        <main id="main">
            <section className="single-post-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-9 post-content">
                           {item && item.category!== "" ? (
                             <div className="single-post">
                                <div className="post-meta">
                                    <span className="date">{item.category}</span>
                                    <span className="mx-1">
                                        <i className="bi bi-dot"></i>
                                    </span>
                                    <span>{new Date(item.date).toLocaleDateString("en-US")}</span>
                                </div>
                                <h1 className="mb-5">{item.title}</h1>
                                <p>
                                    <span className="firstcharacter">
                                        {item.brief && item.brief.charAt(0)}
                                    </span>
                                    {item.brief && item.brief.substring(1)}
                                </p>
                                <p>
                                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae, inventore pariatur numquam cumque possimus exercitationem? Nihil tempore odit ab minus eveniet praesentium, similique blanditiis molestiae ut saepe perspiciatis officia nemo, eos quae cumque. Accusamus fugiat architecto rerum animi atque eveniet, quo, praesentium dignissimos
                                </p>
                                <figure className='my-4'>
                                    {/* <Image src={`/${item.img}`} alt="" className="img-fluid" width={100} height={100} layout="responsive"/> */}
                                    <img src={`/${item.img}`} alt="" className='img-fluid' />
                                    <figcaption>
                                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero temporibus repudiandae
                                    </figcaption>
                                </figure>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <p>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                                </p>
                                <div className="d-flex justify-content-center gap-4">
                                    <a className="btn btn-primary" onClick={()=>handleDeletePost(id)}>
                                        <i className="bi bi-trash"></i>
                                    </a>
                                    <Link href={`/createpostitem/${id}`} className='btn btn-primary'>
                                    <i className="bi bi-pen"></i></Link>
                                </div>
                            </div>
                           ) :  <Preloader /> }
                        </div>
                        <div className="col-md-3 ">
                            <div className="aside-block">
                               <ul className='nav nav-pills custom-tab-nav mb-4'>
                                 {
                                    tabs.map(tab=>(
                                        <li key={tab.id} className='nav-item'>
                                            <button onClick={()=> handleTabActive(tab.id)} className={`nav-link ${tab.active ? 'active' : undefined}`}>{tab.name}</button>
                                        </li>
                                    ))
                                }
                               </ul>
                               <div className="tab-content">
                                <div className={`tab-pane fade ${tabs[0].active ? 'show active' : ''}`}>
                                    {
                                        items.slice(0,6)
                                        .map((item:PostProps)=> (
                                            <SidePostItem key={item._id} item={item} />
                                        ))
                                    }
                                </div>
                                <div className={`tab-pane fade ${tabs[1].active ? 'show active' : ''}`}>
                                    {
                                        items.slice(6,12)
                                        .map((item:PostProps)=> (
                                            <SidePostItem key={item._id} item={item} />
                                        ))
                                    }
                                </div>
                               </div>
                            </div>
                            <div className="aside-block">
                                <h3 className="aside title">Video</h3>
                                <div className="video-post">
                                    <a target='_blank' href="https://www.youtube.com/watch?v=uHNS_ZhI62c" className="link-video">
                                        <span className="bi-play-fill"></span>
                                        <img src="/assets/img/post-landscape-3.jpg" alt="" className="img-fluid" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>

    )
}
