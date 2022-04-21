import React from 'react'
import {GetServerSideProps, NextPage} from "next";
import {supabase} from "../utils/supabaseInit";
import {Notice, Task} from "../types/types";
import {useRouter} from "next/router";
import {Layout} from "../components/Layout";
import _ from "lodash";
import Link from 'next/link';


//ユーザーからリクエストがあるたびにgetServerSidePropsが呼び出される
//serverから最新の物を取得できる

export const getServerSideProps:GetServerSideProps =async ()=>{
    console.log("getServerSideProps/ssrが呼び出されました")
    const {data:tasks}=await supabase
        .from('todos')
        .select('*')
        .order('created_at',{ascending:true})

    const {data: notices }=await supabase
        .from('notices')
        .select('*')
        .order('created_at',{ascending:true})
    return {props:{tasks,notices}}
}

type StaticProps = {
    tasks:Task[],
    notices:Notice[]
}

const Ssr:NextPage<StaticProps> =({tasks,notices})=>{
    const router =useRouter()

    return(
        <Layout title="SSR">
            <p className="mb-3 text-pink-500">SSR</p>
            <ul className="mb-3">
                {
                    _.map(tasks, (task) => (
                        <li key={task.id}>
                            <p className="text-lg font-extrabold">
                                {task.title}
                            </p>
                        </li>
                    ))
                }
            </ul>
            <div>~~~~~~~~~~~~~~~~~</div>

            <ul className="mb-3">
                {
                    _.map(notices, (notice) => (
                        <li key={notice.id}>
                            <p className="text-lg font-extrabold">
                                {notice.content}
                            </p>
                        </li>
                    ))
                }
            </ul>
            <Link href="/ssg" prefetch={false}>
                <a className="mb-3 text-xs">
                    Link to ssg
                </a>
            </Link>

            <Link href="/isr" prefetch={false}>
                <a className="mb-3 text-xs">
                    Link to isr
                </a>
            </Link>

            <button className="mb-3 text-xs" onClick={()=> router.push('/ssg')}>
                Route to ssg
            </button>

            <button className="mb-3 text-xs" onClick={()=> router.push('/isr')}>
                Route to ssg
            </button>
        </Layout>
    )
}

export default Ssr