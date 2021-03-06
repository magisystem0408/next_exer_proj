import _ from "lodash"
import {GetStaticProps, NextPage} from "next";
import {supabase} from "../utils/supabaseInit";
import {Notice, Task} from "../types/types";
import {Layout} from "../components/Layout";
import {useRouter} from "next/router";
import Link from "next/link";


// supabaseに取得してデータを取得してくるコード
export const getStaticProps: GetStaticProps = async () => {
    console.log("getStatiProps/ssg が呼び出されました");
    //tableを取得する
    const {data: tasks} = await supabase
        .from('todos')
        .select('*')
        .order('created_at', {ascending: true})

    //一番新しい潤
    const {data: notices} = await supabase
        .from('notices')
        .select('*')
        .order('created_at', {ascending: true})

    return {props: {tasks, notices}}
}

type StaticProps = {
    tasks: Task[]
    notices: Notice[]
}

//nextのページの型のコンポーネント
const Ssg: NextPage<StaticProps> = ({tasks, notices}) => {
    const router =useRouter()

    return <Layout title="SSG">
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
            <a className="mb-3 text-xs">Link to ssr</a>
        </Link>

        <button className="mb-3 text-xs" onClick={()=>router.push("/ssr")}>
            Route to ssr
        </button>


    </Layout>
}

export default Ssg