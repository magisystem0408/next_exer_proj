import _ from "lodash"
import {useEffect, useState} from 'react'
import { NextPage } from 'next'
import {Notice, Task} from "../types/types";
import {supabase} from "../utils/supabaseInit";
import {Layout} from "../components/Layout";

//clinetサイドで情報を取得する
const Csr:NextPage =()=>{
    const [tasks,setTasks] =　useState<Task[]>([])
    const [notices,setNotices] = useState<Notice[]>([])

    useEffect(() => {
        const getTasks =async ()=>{
            const {data:tasks} = await supabase
            .from('todos')
            .select('*')
            .order('created_at',{ascending:true})
        setTasks(tasks as Task[])
        }

        const getNotices = async ()=>{
            const {data:notices} = await supabase
                .from('notices')
                .select('*')
                .order('created_at',{ascending:true})
            setNotices(notices as Notice[])
        }
        getTasks()
        getNotices()

    }, []);

    return(
        <Layout title="CSR">
            <p className="mb-3 text-blue-500">SSG + CSF</p>
            <ul className="mb-3">
                {
                    _.map(tasks,(task)=>(
                        <li key={task.id}>
                            <p className="text-lg font-extrabold">
                                {task.title}
                            </p>
                        </li>
                    ))
                }
            </ul>
            <ul className="mb-3">
                {
                    _.map(notices,(notice)=>(
                        <li key={notice.id}>
                            <p className="text-lg"></p>
                        </li>
                    ))
                }
            </ul>

        </Layout>
    )
}


export default Csr;