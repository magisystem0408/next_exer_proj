import React from "react"
import {GetStaticProps, NextPage} from "next";
import {supabase} from "../utils/supabaseInit";
import {Notice, Task} from "../types/types";
import _ from "lodash";
import {Layout} from "../components/Layout";
import Link from "next/link";
import {useRouter} from "next/router";

// データ付きのhtmlをランタイムに再生成する


// ISRの発動条件
//　ISRのページにダイレクトアクセスしてきた時
// isrのリンクで飛んできた時
export const getStaticProps: GetStaticProps = async () => {
    console.log("getStaticProps/ISR が呼び出されました")
    const {data: tasks} = await supabase
        .from('todos')
        .select('*')
        .order('created_at', {ascending: true})

    const {data: notices} = await supabase
        .from('notices')
        .select('*')
        .order('created_at', {ascending: true})

//　isrの場合はrevalidateを入れる
//  5秒間で一回だけ
    return {props: {tasks, notices},revalidate:5}
}

type StaticProps = {
    tasks: Task[];
    notices:Notice[]
}


const Isr:NextPage<StaticProps> = ({tasks,notices}) => {
    const router =useRouter()
    return <Layout title="ISR">
        <p className="mb-3 text-blue-500">SSG</p>
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


        <Link href="/ssr" prefetch={false}>
            <a className="my-3 text-xs">Link to ssr</a>
        </Link>

        <button className="mb-3 text-xs" onClick={()=>router.push('/ssr')}>
            Router to ssr
        </button>
    </Layout>
}

export default Isr