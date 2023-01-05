import GroupLabel from '@/components/GroupLabel';
import CardItem from './CardItem';
import PlusCircle from '@/assets/icons/plus-circle.svg'
import Modal from '@/components/Modal';
import { useEffect, useState } from 'react';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import { ITodo } from '@/api/services/todos';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createTodoItem, getTodoItems, ITodoItem, ITodoItemRequest } from '@/api/services/todo-items';
import Spinner from '@/components/Spinner';
import useForm from '@/hooks/useForm';
import FormErrors from '@/components/FormErrors';
import { disabledButtonClassNames, generateRandomBaseMenuColor } from '@/utils/ui';
import { AxiosErrorMessage } from '@/types/axios';

type CardProps = ITodo

function CardItems({ data }: { data: ITodoItem[] }) {
    if (!data?.length) return (
        <h1 className="font-bold text-xs italic text-slate-500 whitespace-normal">
            Items are empty. Please add one by clicking the New Task button below.
        </h1>
    )

    return (
        <>
            {data.map((todoItem, index) => (
                <CardItem 
                    key={todoItem.id}
                    className={index !== 0 ? 'mt-3' : ''}
                    text={todoItem?.name ?? ''} 
                    progressValue={todoItem.progress_percentage}
                    todoItem={todoItem}
                />
            ))}
        </>
    )
}

export default function Card({ id, title, description }: CardProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const queryClient = useQueryClient()

    const { formValues, handleChange, reset: resetForm } = useForm<ITodoItemRequest>({
        name: '',
        progress_percentage: 0,
    })

    const { isLoading, data } = useQuery({
        queryKey: ['todos', id],
        queryFn: () => getTodoItems(id as number),
        select: (data) => data.sort((a, b) => new Date(b.created_at!).getTime() - new Date(a.created_at!).getTime()),
    })

    const { isLoading: isLoadingMutation,  mutate, error, reset: resetMutation } = useMutation({
        mutationFn: () => createTodoItem(id as number, formValues),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos', id] })
            setModalOpen(false)
        },
        onError: () => {
            alert('Error creating todo item')
        }
    })

    const axiosError = error as AxiosErrorMessage

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        mutate()    
    }

    useEffect(() => {
        if (!modalOpen) {
            resetForm()
            resetMutation()
        }
    }, [modalOpen])

    const randMenuColor = generateRandomBaseMenuColor()

    return (
        <>
            <div className={`p-3 menu-${randMenuColor} transition-all duration-500 rounded min-w-[20.5rem] w-[20.5rem] h-fit`}>
                <GroupLabel label={title} variant={randMenuColor} />

                <p className="mt-2 font-bold text-xs">{description}</p>

                {isLoading ? (
                    <div className="flex justify-center items-center mt-2">
                        <Spinner className="w-16" />
                    </div>
                ) : 
                    (
                        <>
                            <div className="mt-2">
                                <CardItems data={data ?? []} />
                            </div>

                            <button className="mt-2 flex items-center" onClick={() => setModalOpen(true)}>
                                <img src={PlusCircle} className="mr-1.5" />

                                <span className="text-xs">New Task</span>
                            </button>
                        </>
                    )
                }
            </div>

            <Modal title={'Create Task'} modalOpen={modalOpen} handleClose={setModalOpen}>
                <form onSubmit={onSubmit}>
                    <TextField 
                        id="task-name"
                        name="name"
                        label="Task Name"
                        value={formValues.name}
                        handleChange={handleChange}
                        className="mb-4"
                        placeholder="Type your task"
                        inputProps={{
                            className: 'w-full'
                        }} 
                    />

                    <TextField
                        id="progress" 
                        name="progress_percentage"
                        label="Progress"
                        value={formValues.progress_percentage || ''}
                        handleChange={handleChange}
                        className="mb-7"
                        placeholder="70%"
                        inputProps={{
                            className: 'w-36'
                        }}
                    />

                    {
                        axiosError?.response?.data 
                            ? <FormErrors errors={[axiosError.response?.data?.message]} className="mb-7" /> 
                            : null
                    }

                    <div className="flex justify-end">
                        <Button variant="light" type="reset" className="mr-2.5" onClick={() => setModalOpen(false)}>
                            Cancel
                        </Button>

                        <Button 
                            type="submit" 
                            className={disabledButtonClassNames(isLoadingMutation)}
                            disabled={isLoadingMutation}
                        >
                            Save Task
                        </Button>
                    </div>
                </form>
            </Modal>
        </>
    )
}