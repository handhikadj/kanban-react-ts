import { getTodos } from '@/api/services/todos';
import Spinner from '@/components/Spinner';
import { useQuery } from '@tanstack/react-query';

export default function Board() {
    const { isLoading, data } = useQuery({
        queryKey: ['todos'],
        queryFn: getTodos,
        onError: () => {
            alert('Error fetching todos')
        }
    })

    if (isLoading) return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Spinner className="w-40" />
        </div>
    )

    if (!data?.length) return (
        <div className="w-screen h-screen flex justify-center items-center">
            <h1 className="font-bold text-2xl text-slate-500">
                Data is empty. Please add one by clicking the Add New Group button above.
            </h1>
        </div>
    )

    return (
        <div className="flex-1 mt-[6.15rem] pb-6 px-6 flex gap-4 overflow-auto whitespace-nowrap">
            cards map
        </div>
    )
}